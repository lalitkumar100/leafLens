import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, Languages, RefreshCcw } from "lucide-react";
import { analyzePlant } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Navbar from "@/components/Navbar";
import UploadSection from "@/components/UploadSection";
import ImagePreview from "@/components/ImagePreview";
import ScanningIndicator from "@/components/ScanningIndicator";
import PlantReport from "@/components/PlantReport";
import ChatBox from "@/components/ChatBox";
 // 🔹 Import the new component
// 🔹 1. Define Indian Languages
const INDIAN_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
];

// 🔹 2. Translation Dictionary
const TRANSLATIONS = {
  en: {
    back: "Back to Home",
    title: "Plant",
    subtitle: "Scanner",
    uploadPrompt: "Upload an image of your plant to get started",
    analyzing: "Analyzing your plant...",
    ready: "Your plant diagnosis is ready",
    errorTitle: "Invalid Plant Image",
    reload: "Reload Page",
    chatGreeting: "Hi! Upload a plant image and I’ll help diagnose its health 🌿",
    resultIntro: "I’ve analyzed your plant 🌿 It is",
    resultOutro: "Ask me about treatment, care, or prevention.",
  },
  hi: {
    back: "मुख्य पृष्ठ पर जाएं",
    title: "पौधा",
    subtitle: "स्कैनर",
    uploadPrompt: "शुरू करने के लिए अपने पौधे की तस्वीर अपलोड करें",
    analyzing: "आपके पौधे का विश्लेषण किया जा रहा है...",
    ready: "आपका पौधा निदान तैयार है",
    errorTitle: "अमान्य पौधे की छवि",
    reload: "पृष्ठ पुनः लोड करें",
    chatGreeting: "नमस्ते! पौधे की तस्वीर अपलोड करें और मैं उसकी सेहत बताने में मदद करूँगा 🌿",
    resultIntro: "मैंने आपके पौधे का विश्लेषण किया है 🌿 यह है",
    resultOutro: "मुझसे उपचार, देखभाल या रोकथाम के बारे में पूछें।",
  },
  bn: {
    back: "হোমে ফিরে যান",
    title: "উদ্ভিদ",
    subtitle: "স্ক্যানার",
    uploadPrompt: "শুরু করতে আপনার উদ্ভিদের একটি ছবি আপলোড করুন",
    analyzing: "আপনার উদ্ভিদ বিশ্লেষণ করা হচ্ছে...",
    ready: "আপনার উদ্ভিদ রোগনির্ণয় প্রস্তুত",
    errorTitle: "অবৈধ উদ্ভিদের ছবি",
    reload: "পেইজ রিলোড করুন",
    chatGreeting: "নমস্কার! একটি উদ্ভিদের ছবি আপলোড করুন এবং আমি এর স্বাস্থ্য নির্ণয় করতে সাহায্য করব 🌿",
    resultIntro: "আমি আপনার উদ্ভিদ বিশ্লেষণ করেছি 🌿 এটি হলো",
    resultOutro: "চিকিৎসা, যত্ন বা প্রতিরোধ সম্পর্কে আমাকে জিজ্ঞাসা করুন।",
  },
  te: {
    back: "హోమ్‌కు తిరిగి వెళ్లండి",
    title: "మొక్క",
    subtitle: "స్కానర్",
    uploadPrompt: "ప్రారంభించడానికి మీ మొక్క యొక్క ఫోటోను అప్‌లోడ్ చేయండి",
    analyzing: "మీ మొక్కను విశ్లేషిస్తున్నాము...",
    ready: "మీ మొక్క విశ్లేషణ సిద్ధంగా ఉంది",
    errorTitle: "చెల్లని మొక్క చిత్రం",
    reload: "పేజీని రీలోడ్ చేయండి",
    chatGreeting: "హలో! మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి, నేను దాని ఆరోగ్యాన్ని గుర్తించడంలో సహాయపడతాను 🌿",
    resultIntro: "నేను మీ మొక్కను విశ్లేషించాను 🌿 ఇది",
    resultOutro: "చికిత్స, సంరక్షణ లేదా నివారణ గురించి నన్ను అడగండి.",
  },
  mr: {
    back: "मुख्य पृष्ठावर परत जा",
    title: "वनस्पती",
    subtitle: "स्कॅनर",
    uploadPrompt: "सुरु करण्यासाठी आपल्या वनस्पतीचा फोटो अपलोड करा",
    analyzing: "आपल्या वनस्पतीचे विश्लेषण केले जात आहे...",
    ready: "आपले वनस्पती निदान तयार आहे",
    errorTitle: "अवैध वनस्पती प्रतिमा",
    reload: "पेज रीलोड करा",
    chatGreeting: "नमस्कार! वनस्पतीच्या प्रतिमेला अपलोड करा आणि मी त्याचे आरोग्य निदान करण्यास मदत करेन 🌿",
    resultIntro: "मी आपल्या वनस्पतीचे विश्लेषण केले आहे 🌿 हे आहे",
    resultOutro: "उपचार, काळजी किंवा प्रतिबंधाबद्दल मला विचारा.",
  },
  ta: {
    back: "முகப்புப் பக்கத்திற்குச் செல்க",
    title: "தாவர",
    subtitle: "ஸ்கேனர்",
    uploadPrompt: "தொடங்க உங்கள் தாவரத்தின் படத்தை பதிவேற்றவும்",
    analyzing: "உங்கள் தாவரம் ஆய்வு செய்யப்படுகிறது...",
    ready: "உங்கள் தாவரத்தின் அறிக்கை தயாராக உள்ளது",
    errorTitle: "தவறான தாவர படம்",
    reload: "பக்கத்தை மீண்டும் ஏற்றவும்",
    chatGreeting: "வணக்கம்! தாவர படத்தை பதிவேற்றவும், அதன் ஆரோக்கியத்தை கண்டறிய நான் உதவுவேன் 🌿",
    resultIntro: "நான் உங்கள் தாவரத்தை ஆய்வு செய்தேன் 🌿 இது",
    resultOutro: "சிகிச்சை, பராமரிப்பு அல்லது தடுப்பு பற்றி என்னிடம் கேளுங்கள்.",
  },
  gu: {
    back: "હોમ પેજ પર પાછા જાઓ",
    title: "છોડ",
    subtitle: "સ્કેનર",
    uploadPrompt: "શરૂ કરવા માટે તમારા છોડનો ફોટો અપલોડ કરો",
    analyzing: "તમારા છોડનું વિશ્લેષણ થઈ રહ્યું છે...",
    ready: "તમારા છોડનું નિદાન તૈયાર છે",
    errorTitle: "અમાન્ય છોડની છબી",
    reload: "પેજ રિલોડ કરો",
    chatGreeting: "નમસ્તે! છોડનો ફોટો અપલોડ કરો અને હું તેના સ્વાસ્થ્યનું નિદાન કરવામાં મદદ કરીશ 🌿",
    resultIntro: "મેં તમારા છોડનું વિશ્લેષણ કર્યું છે 🌿 આ છે",
    resultOutro: "સારવાર, સંભાળ અથવા નિવારણ વિશે મને પૂછો.",
  },
  kn: {
    back: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    title: "ಸಸ್ಯ",
    subtitle: "ಸ್ಕ್ಯಾನರ್",
    uploadPrompt: "ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    analyzing: "ನಿಮ್ಮ ಸಸ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    ready: "ನಿಮ್ಮ ಸಸ್ಯದ ರೋಗನಿರ್ಣಯ ಸಿದ್ಧವಾಗಿದೆ",
    errorTitle: "ಅಮಾನ್ಯ ಸಸ್ಯ ಚಿತ್ರ",
    reload: "ಪುಟವನ್ನು ಮರುಲೋಡ್ ಮಾಡಿ",
    chatGreeting: "ನಮಸ್ಕಾರ! ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ನಾನು ಅದರ ಆರೋಗ್ಯವನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ 🌿",
    resultIntro: "ನಾನು ನಿಮ್ಮ ಸಸ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿದ್ದೇನೆ 🌿 ಇದು",
    resultOutro: "ಚಿಕಿತ್ಸೆ, ಆರೈಕೆ ಅಥವಾ ತಡೆಗಟ್ಟುವಿಕೆಯ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ.",
  },
  ml: {
    back: "ഹോമിലേക്ക് മടങ്ങുക",
    title: "ചെടി",
    subtitle: "സ്കാനർ",
    uploadPrompt: "തുടങ്ങാൻ നിങ്ങളുടെ ചെടിയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    analyzing: "നിങ്ങളുടെ ചെടി വിശകലനം ചെയ്യുന്നു...",
    ready: "നിങ്ങളുടെ പ്ലാന്റ് ഡയഗ്നോസിസ് തയ്യാറാണ്",
    errorTitle: "അസാധുവായ ചിത്രം",
    reload: "പേജ് റീലോഡ് ചെയ്യുക",
    chatGreeting: "ഹായ്! ഒരു ചെടിയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യൂ, അതിന്റെ ആരോഗ്യം നിർണ്ണയിക്കാൻ ഞാൻ സഹായിക്കാം 🌿",
    resultIntro: "ഞാൻ നിങ്ങളുടെ ചെടി വിശകലനം ചെയ്തു 🌿 ഇത്",
    resultOutro: "ചികിത്സ, പരിചരണം അല്ലെങ്കിൽ പ്രതിരോധം എന്നിവയെക്കുറിച്ച് എന്നോട് ചോദിക്കുക.",
  },
  pa: {
    back: "ਘਰ ਵਾਪਸ ਜਾਓ",
    title: "ਪੌਦਾ",
    subtitle: "ਸਕੈਨਰ",
    uploadPrompt: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣੇ ਪੌਦੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    analyzing: "ਤੁਹਾਡੇ ਪੌਦੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    ready: "ਤੁਹਾਡਾ ਪੌਦਾ ਨਿਦਾਨ ਤਿਆਰ ਹੈ",
    errorTitle: "ਗਲਤ ਪੌਦੇ ਦੀ ਤਸਵੀਰ",
    reload: "ਪੇਜ ਰੀਲੋਡ ਕਰੋ",
    chatGreeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਪੌਦੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਮੈਂ ਇਸਦੀ ਸਿਹਤ ਦਾ ਪਤਾ ਲਗਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗਾ 🌿",
    resultIntro: "ਮੈਂ ਤੁਹਾਡੇ ਪੌਦੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਹੈ 🌿 ਇਹ ਹੈ",
    resultOutro: "ਇਲਾਜ, ਦੇਖਭਾਲ ਜਾਂ ਰੋਕਥਾਮ ਬਾਰੇ ਮੈਨੂੰ ਪੁੱਛੋ।",
  },
  or: {
    back: "ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ",
    title: "ଗଛ",
    subtitle: "ସ୍କାନର୍",
    uploadPrompt: "ଆରମ୍ଭ କରିବାକୁ ଆପଣଙ୍କ ଗଛର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
    analyzing: "ଆପଣଙ୍କ ଗଛର ବିଶ୍ଳେଷଣ କରାଯାଉଛି...",
    ready: "ଆପଣଙ୍କ ଗଛର ରୋଗ ନିରୂପଣ ପ୍ରସ୍ତୁତ ଅଛି",
    errorTitle: "ଅବୈଧ ଗଛ ଚିତ୍ର",
    reload: "ପୃଷ୍ଠା ରିଲୋଡ୍ କରନ୍ତୁ",
    chatGreeting: "ନମସ୍କାର! ଗଛର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ ଏବଂ ମୁଁ ଏହାର ସ୍ୱାସ୍ଥ୍ୟ ନିରୂପଣରେ ସାହାଯ୍ୟ କରିବି 🌿",
    resultIntro: "ମୁଁ ଆପଣଙ୍କ ଗଛର ବିଶ୍ଳେଷଣ କରିଛି 🌿 ଏହା ହେଉଛି",
    resultOutro: "ଚିକିତ୍ସା, ଯତ୍ନ କିମ୍ବା ନିରାକରଣ ବିଷୟରେ ମୋତେ ପଚାରନ୍ତୁ।",
  },
};

const Scan = () => {
  const navigate = useNavigate();

  // 🔹 State Management
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [alert, setAlert] = useState(null);
  
  // 🔹 Language State (Default English)
  const [language, setLanguage] = useState("en");

  // Helper to get text based on language (Falls back to English if missing)
  const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS["en"][key];

  // 📤 Handle image upload
  const handleImageUpload = useCallback((file) => {
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  // 💬 Chat messages
  const addChatMessage = useCallback((message) => {
    setChatHistory((prev) => [
      ...prev,
      { id: Date.now().toString(), ...message, timestamp: new Date() },
    ]);
  }, []);

  // 🔄 Clear everything (Soft Reset)
  const clearScan = useCallback(() => {
    setUploadedImage(null);
    setImagePreview(null);
    setScanResult(null);
    setIsScanning(false);
    setAlert(null);

    // 🌱 Start fresh chat session in selected language
    setChatHistory([
      {
        id: Date.now().toString(),
        role: "assistant",
        message: t("chatGreeting"),
        timestamp: new Date(),
      },
    ]);
  }, [language]); 

  // 🔍 Start scanning
  const startScan = useCallback(async () => {
    if (!uploadedImage) return;

    setIsScanning(true);
    setAlert(null);

    // 🔹 Pass language to API so the backend generates report in that language
    const result = await analyzePlant(uploadedImage, language);

    if (!result.success) {
      setAlert({ type: "error", message: result.message });
      setScanResult(null);
      setChatHistory([]);
      setIsScanning(false);
      return;
    }

    setScanResult(result.data);
    setIsScanning(false);

    // 🌿 AI opens conversation in selected language
    setChatHistory([
      {
        id: Date.now().toString(),
        role: "assistant",
        message: `${t("resultIntro")} **${result.data.plantName}**. ${t("resultOutro")}`,
        timestamp: new Date(),
      },
    ]);
  }, [uploadedImage, language]);

  // 🚀 Auto scan when image uploaded
  useEffect(() => {
    if (uploadedImage && !scanResult && !isScanning && !alert) {
      startScan();
    }
  }, [uploadedImage, scanResult, isScanning, alert, startScan]);

  // 🔄 Update chat greeting when language changes (if no scan yet)
  useEffect(() => {
    if (!scanResult && !isScanning && !uploadedImage) {
      setChatHistory([
        {
          id: Date.now().toString(),
          role: "assistant",
          message: t("chatGreeting"),
          timestamp: new Date(),
        },
      ]);
    }
  }, [language, scanResult, isScanning, uploadedImage]);

  // 🔄 Reload Page Function
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="section-container">
          
          {/* 🔹 Top Bar: Back Button & Language Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("back")}
            </Button>

            {/* 🌐 Language Selector - HIDDEN if report is generated */}
            {!scanResult && (
              <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-1 shadow-sm">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0 h-8">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {t("title")} <span className="gradient-text">{t("subtitle")}</span>
            </h1>
            <p className="text-muted-foreground">
              {!uploadedImage
                ? t("uploadPrompt")
                : isScanning
                ? t("analyzing")
                : t("ready")}
            </p>
          </div>

          {/* 🚨 Error Alert with Reload Button */}
          {alert && (
            <div className="max-w-2xl mx-auto mb-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("errorTitle")}</AlertTitle>
                <AlertDescription className="flex flex-col gap-3">
                  <span>{alert.message}</span>
                  
                  {/* Reload Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReload}
                    className="w-fit border-destructive/50 hover:bg-destructive/10 text-destructive-foreground"
                  >
                    <RefreshCcw className="w-3 h-3 mr-2" />
                    {t("reload")}
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {!uploadedImage && (
            <UploadSection
              onImageSelected={handleImageUpload}
              isLoading={isScanning}
              language={language} 
            />
          )}

          {uploadedImage && isScanning && (
            <div className="max-w-2xl mx-auto">
              <ImagePreview image={imagePreview} />
              {/* Passed language prop here */}
              <ScanningIndicator language={language} />
            </div>
          )}

          {uploadedImage && scanResult && !isScanning && (
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <PlantReport
                  reportData={scanResult}
                  image={imagePreview}
                  onNewScan={clearScan}
                  language={language} 
                />
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <ChatBox
                    reportData={scanResult}
                    chatHistory={chatHistory}
                    addChatMessage={addChatMessage}
                    language={language} 
                  />
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