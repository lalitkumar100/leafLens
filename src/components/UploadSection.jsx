import { useState, useCallback } from "react";
import { Upload, Image, AlertCircle } from "lucide-react";

// 🔹 Translations for Upload Section
const UPLOAD_TRANSLATIONS = {
  en: {
    dropHere: "Drop your image here",
    uploadTitle: "Upload Plant Image",
    dragDrop: "Drag and drop your plant image here, or click to browse",
    supports: "Supports JPG, PNG, WebP • Max 5MB",
    errorType: "Please upload a JPG, PNG, or WebP image.",
    errorSize: "Image size must be under 5MB.",
  },
  hi: {
    dropHere: "अपनी छवि यहाँ छोड़ें",
    uploadTitle: "पौधे की फोटो अपलोड करें",
    dragDrop: "अपनी पौधे की फोटो यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें",
    supports: "समर्थन: JPG, PNG, WebP • अधिकतम 5MB",
    errorType: "कृपया JPG, PNG, या WebP छवि अपलोड करें।",
    errorSize: "छवि का आकार 5MB से कम होना चाहिए।",
  },
  bn: {
    dropHere: "আপনার ছবি এখানে ড্রপ করুন",
    uploadTitle: "উদ্ভিদের ছবি আপলোড করুন",
    dragDrop: "আপনার উদ্ভিদের ছবি এখানে টেনে আনুন, বা ব্রাউজ করতে ক্লিক করুন",
    supports: "সমর্থন: JPG, PNG, WebP • সর্বোচ্চ 5MB",
    errorType: "অনুগ্রহ করে একটি JPG, PNG, বা WebP ছবি আপলোড করুন।",
    errorSize: "ছবির আকার 5MB এর নিচে হতে হবে।",
  },
  te: {
    dropHere: "మీ చిత్రాన్ని ఇక్కడ వదలండి",
    uploadTitle: "మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి",
    dragDrop: "మీ మొక్క చిత్రాన్ని ఇక్కడ లాగి వదలండి, లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి",
    supports: "మద్దతు: JPG, PNG, WebP • గరిష్టంగా 5MB",
    errorType: "దయచేసి JPG, PNG, లేదా WebP చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    errorSize: "చిత్రం పరిమాణం 5MB లోపు ఉండాలి.",
  },
  mr: {
    dropHere: "तुमची प्रतिमा येथे टाका",
    uploadTitle: "वनस्पतीचा फोटो अपलोड करा",
    dragDrop: "तुमचा वनस्पतीचा फोटो येथे ओढा आणि सोडा, किंवा ब्राउझ करण्यासाठी क्लिक करा",
    supports: "समर्थन: JPG, PNG, WebP • कमाल 5MB",
    errorType: "कृपया JPG, PNG, किंवा WebP प्रतिमा अपलोड करा.",
    errorSize: "प्रतिमेचा आकार 5MB पेक्षा कमी असावा.",
  },
  ta: {
    dropHere: "உங்கள் படத்தை இங்கே விடவும்",
    uploadTitle: "தாவர படத்தை பதிவேற்றவும்",
    dragDrop: "உங்கள் தாவர படத்தை இங்கே இழுத்து விடவும், அல்லது உலாவ கிளிக் செய்யவும்",
    supports: "ஆதரவு: JPG, PNG, WebP • அதிகபட்சம் 5MB",
    errorType: "தயவுசெய்து JPG, PNG, அல்லது WebP படத்தை பதிவேற்றவும்.",
    errorSize: "படத்தின் அளவு 5MB க்குள் இருக்க வேண்டும்.",
  },
  gu: {
    dropHere: "તમારી છબી અહીં મૂકો",
    uploadTitle: "છોડનો ફોટો અપલોડ કરો",
    dragDrop: "તમારા છોડનો ફોટો અહીં ખેંચો અને મૂકો, અથવા બ્રાઉઝ કરવા માટે ક્લિક કરો",
    supports: "સપોર્ટ: JPG, PNG, WebP • મહત્તમ 5MB",
    errorType: "કૃપા કરીને JPG, PNG, અથવા WebP છબી અપલોડ કરો.",
    errorSize: "છબીનું કદ 5MB થી ઓછું હોવું જોઈએ.",
  },
  kn: {
    dropHere: "ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ",
    uploadTitle: "ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    dragDrop: "ನಿಮ್ಮ ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ, ಅಥವಾ ಬ್ರೌಸ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    supports: "ಬೆಂಬಲ: JPG, PNG, WebP • ಗರಿಷ್ಠ 5MB",
    errorType: "ದಯವಿಟ್ಟು JPG, PNG, ಅಥವಾ WebP ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    errorSize: "ಚಿತ್ರದ ಗಾತ್ರ 5MB ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.",
  },
  ml: {
    dropHere: "നിങ്ങളുടെ ചിത്രം ഇവിടെ ഇടുക",
    uploadTitle: "ചെടിയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    dragDrop: "നിങ്ങളുടെ ചെടിയുടെ ചിത്രം ഇവിടെ വലിച്ചിടുക, അല്ലെങ്കിൽ ബ്രൗസ് ചെയ്യാൻ ക്ലിಕ್ ചെയ്യുക",
    supports: "പിന്തുണ: JPG, PNG, WebP • പരമാവധി 5MB",
    errorType: "ദയവായി JPG, PNG, അല്ലെങ്കിൽ WebP ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
    errorSize: "ചിത്രത്തിന്റെ വലിപ്പം 5MB യിൽ താഴെയായിരിക്കണം.",
  },
  pa: {
    dropHere: "ਆਪਣੀ ਤਸਵੀਰ ਇੱਥੇ ਸੁੱਟੋ",
    uploadTitle: "ਪੌਦੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    dragDrop: "ਆਪਣੇ ਪੌਦੇ ਦੀ ਤਸਵੀਰ ਇੱਥੇ ਖਿੱਚੋ ਅਤੇ ਸੁੱਟੋ, ਜਾਂ ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
    supports: "ਸਮਰਥਨ: JPG, PNG, WebP • ਵੱਧ ਤੋਂ ਵੱਧ 5MB",
    errorType: "ਕਿਰਪਾ ਕਰਕੇ JPG, PNG, ਜਾਂ WebP ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ।",
    errorSize: "ਤਸਵੀਰ ਦਾ ਆਕਾਰ 5MB ਤੋਂ ਘੱਟ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।",
  },
  or: {
    dropHere: "ଆପଣଙ୍କ ଚିତ୍ର ଏଠାରେ ପକାନ୍ତୁ",
    uploadTitle: "ଗଛର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
    dragDrop: "ଆପଣଙ୍କ ଗଛର ଫଟୋ ଏଠାରେ ଟାଣି ଆଣନ୍ତୁ, କିମ୍ବା ବ୍ରାଉଜ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ",
    supports: "ସମର୍ଥନ: JPG, PNG, WebP • ସର୍ବାଧିକ 5MB",
    errorType: "ଦୟାକରି JPG, PNG, କିମ୍ବା WebP ଚିତ୍ର ଅପଲୋଡ୍ କରନ୍ତୁ।",
    errorSize: "ଚିତ୍ରର ଆକାର 5MB ରୁ କମ୍ ହେବା ଉଚିତ୍।",
  },
};

const UploadSection = ({ onImageSelected, isLoading, language = "en" }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);

  // Helper to get text based on language
  const t = (key) =>
    UPLOAD_TRANSLATIONS[language]?.[key] || UPLOAD_TRANSLATIONS["en"][key];

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return t("errorType");
    }
    if (file.size > maxSize) {
      return t("errorSize");
    }
    return null;
  };

  const handleFile = useCallback(
    (file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      onImageSelected(file);
    },
    [onImageSelected, language] // Added language as dependency so error messages update if lang changes mid-action
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label
        className={`upload-zone flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] cursor-pointer transition-all duration-200 border-2 border-dashed rounded-xl bg-card hover:bg-accent/50 ${
          isDragOver ? "border-primary bg-primary/5 drag-over" : "border-border"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
          disabled={isLoading}
        />

        <div className="text-center p-6">
          <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110">
            {isDragOver ? (
              <Image className="w-12 h-12 text-primary animate-pulse" />
            ) : (
              <Upload className="w-12 h-12 text-primary" />
            )}
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-2">
            {isDragOver ? t("dropHere") : t("uploadTitle")}
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
            {t("dragDrop")}
          </p>
          <p className="text-sm text-muted-foreground/70">{t("supports")}</p>
        </div>
      </label>

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadSection;