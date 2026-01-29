import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useScan } from "@/contexts/ScanContext";

import Navbar from "@/components/Navbar";
import UploadSection from "@/components/UploadSection";
import ImagePreview from "@/components/ImagePreview";
import ScanningIndicator from "@/components/ScanningIndicator";
import PlantReport from "@/components/PlantReport";
import ChatBox from "@/components/ChatBox";

const Scan = () => {
  const navigate = useNavigate();
  const {
    uploadedImage,
    imagePreview,
    scanResult,
    isScanning,
    handleImageUpload,
    startScan,
    clearScan,
    alert,
  } = useScan();

  // Auto start scan (but NOT if error exists)
  useEffect(() => {
    if (uploadedImage && !scanResult && !isScanning && !alert) {
      startScan();
    }
  }, [uploadedImage, scanResult, isScanning, alert, startScan]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="section-container">

          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Plant <span className="gradient-text">Scanner</span>
            </h1>
            <p className="text-muted-foreground">
              {!uploadedImage
                ? "Upload an image of your plant to get started"
                : isScanning
                ? "Analyzing your plant..."
                : "Your plant diagnosis is ready"}
            </p>
          </div>

          {/* 🚨 Alert */}
          {alert && (
            <div className="max-w-2xl mx-auto mb-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid Plant Image</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            </div>
          )}

          {!uploadedImage && (
            <UploadSection
              onImageSelected={handleImageUpload}
              isLoading={isScanning}
            />
          )}

          {uploadedImage && isScanning && (
            <div className="max-w-2xl mx-auto">
              <ImagePreview image={imagePreview} />
              <ScanningIndicator />
            </div>
          )}

          {uploadedImage && scanResult && !isScanning && (
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <PlantReport
                  reportData={scanResult}
                  image={imagePreview}
                  onNewScan={clearScan}
                />
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <ChatBox reportData={scanResult} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Scan;
