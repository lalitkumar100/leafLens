import { createContext, useContext, useState, useCallback } from 'react';
import { analyzePlant } from "@/lib/api";
const ScanContext = createContext(null);

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
};

export const ScanProvider = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleImageUpload = useCallback((file) => {
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const addChatMessage = useCallback((message) => {
    setChatHistory((prev) => [...prev, {
      id: Date.now().toString(),
      ...message,
      timestamp: new Date()
    }]);
  }, []);

const clearScan = useCallback(() => {
  setUploadedImage(null);
  setImagePreview(null);
  setScanResult(null);
  setIsScanning(false);
  setChatHistory([]);
  setAlert(null);
}, []);


const startScan = useCallback(async () => {
  if (!uploadedImage) return;

  setIsScanning(true);
  setAlert(null);

  const result = await analyzePlant(uploadedImage);

  // ❌ If API says error
  if (!result.success) {
    setAlert({
      type: "error",
      message: result.message,
    });

    // Clear everything except preview (optional)
    setScanResult(null);
    setChatHistory([]);
    setIsScanning(false);
    return;
  }

  // ✅ Success
  setScanResult(result.data);
  setIsScanning(false);
}, [uploadedImage]);


  const value = {
    uploadedImage,
    imagePreview,
    scanResult,
    isScanning,
    chatHistory,
    alert,          // 👈 NEW
    handleImageUpload,
    setScanResult,
    setIsScanning,
    addChatMessage,
    clearScan,
    startScan,
  };

  return (
    <ScanContext.Provider value={value}>
      {children}
    </ScanContext.Provider>
  );
};



export default ScanContext;
