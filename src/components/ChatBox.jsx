import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// 🔹 Translations for Chat Interface
const CHAT_TRANSLATIONS = {
  en: {
    title: "AI Plant Doctor",
    subtitle: "Expert botanical advice",
    placeholder: "Type a message...",
    emptyState: "Ask me about your",
    error: "Connection to the Plant Doctor failed.",
    // Quick Actions
    qa_summarize_label: "Summarize Report",
    qa_summarize_prompt: "Can you summarize the diagnosis report for me?",
    qa_treat_label: "More Treatments",
    qa_treat_prompt: "What are some alternative treatment options?",
    qa_prevent_label: "Prevention Tips",
    qa_prevent_prompt: "How can I prevent this disease in the future?",
  },
  hi: {
    title: "एआई प्लांट डॉक्टर",
    subtitle: "विशेषज्ञ वनस्पति सलाह",
    placeholder: "संदेश टाइप करें...",
    emptyState: "अपने पौधे के बारे में पूछें",
    error: "प्लांट डॉक्टर से संपर्क विफल रहा।",
    qa_summarize_label: "रिपोर्ट का सारांश",
    qa_summarize_prompt: "क्या आप मेरे लिए निदान रिपोर्ट का सारांश दे सकते हैं?",
    qa_treat_label: "अधिक उपचार",
    qa_treat_prompt: "कुछ वैकल्पिक उपचार विकल्प क्या हैं?",
    qa_prevent_label: "रोकथाम के सुझाव",
    qa_prevent_prompt: "मैं भविष्य में इस बीमारी को कैसे रोक सकता हूँ?",
  },
  bn: {
    title: "এআই উদ্ভিদ ডাক্তার",
    subtitle: "বিশেষজ্ঞ বোটানিক্যাল পরামর্শ",
    placeholder: "একটি বার্তা টাইপ করুন...",
    emptyState: "আপনার উদ্ভিদ সম্পর্কে জিজ্ঞাসা করুন",
    error: "উদ্ভিদ ডাক্তারের সাথে সংযোগ ব্যর্থ হয়েছে।",
    qa_summarize_label: "রিপোর্ট সারসংক্ষেপ",
    qa_summarize_prompt: "আপনি কি আমার জন্য রোগনির্ণয় রিপোর্টের সারসংক্ষেপ করতে পারেন?",
    qa_treat_label: "আরও চিকিৎসা",
    qa_treat_prompt: "কিছু বিকল্প চিকিৎসার বিকল্প কী?",
    qa_prevent_label: "প্রতিরোধ টিপস",
    qa_prevent_prompt: "ভবিষ্যতে আমি কীভাবে এই রোগ প্রতিরোধ করতে পারি?",
  },
  te: {
    title: "AI ప్లాంట్ డాక్టర్",
    subtitle: "నిపుణుల వృక్షశాస్త్ర సలహా",
    placeholder: "సందేశాన్ని టైప్ చేయండి...",
    emptyState: "మీ మొక్క గురించి అడగండి",
    error: "ప్లాంట్ డాక్టర్‌తో కనెక్షన్ విఫలమైంది.",
    qa_summarize_label: "నివేదిక సారాంశం",
    qa_summarize_prompt: "మీరు నా కోసం నిర్ధారణ నివేదికను సంగ్రహించగలరా?",
    qa_treat_label: "మరిన్ని చికిత్సలు",
    qa_treat_prompt: "కొన్ని ప్రత్యామ్నాయ చికిత్స ఎంపికలు ఏమిటి?",
    qa_prevent_label: "నివారణ చిట్కాలు",
    qa_prevent_prompt: "భవిష్యత్తులో ఈ వ్యాధిని నేను ఎలా నివారించగలను?",
  },
  ta: {
    title: "AI தாவர மருத்துவர்",
    subtitle: "நிபுணர் தாவரவியல் ஆலோசனை",
    placeholder: "செய்தியை தட்டச்சு செய்யவும்...",
    emptyState: "உங்கள் தாவரத்தைப் பற்றி கேளுங்கள்",
    error: "தாவர மருத்துவருடனான இணைப்பு தோல்வியடைந்தது.",
    qa_summarize_label: "அறிக்கை சுருக்கம்",
    qa_summarize_prompt: "நோயறிதல் அறிக்கையை எனக்காக சுருக்க முடியுமா?",
    qa_treat_label: "மேலும் சிகிச்சைகள்",
    qa_treat_prompt: "சில மாற்று சிகிச்சை விருப்பங்கள் யாவை?",
    qa_prevent_label: "தடுப்பு குறிப்புகள்",
    qa_prevent_prompt: "எதிர்காலத்தில் இந்த நோயை நான் எவ்வாறு தடுப்பது?",
  },
  mr: {
    title: "एआय प्लांट डॉक्टर",
    subtitle: "तज्ञ वनस्पति सल्ला",
    placeholder: "संदेश टाइप करा...",
    emptyState: "आपल्या वनस्पतीबद्दल विचारा",
    error: "प्लांट डॉक्टरशी संपर्क अयशस्वी झाला.",
    qa_summarize_label: "अहवाल सारांश",
    qa_summarize_prompt: "तुम्ही माझ्यासाठी निदान अहवालाचा सारांश देऊ शकता का?",
    qa_treat_label: "अधिक उपचार",
    qa_treat_prompt: "काही पर्यायी उपचार पर्याय काय आहेत?",
    qa_prevent_label: "प्रतिबंधाच्या टिप्स",
    qa_prevent_prompt: "भविष्यात मी हा रोग कसा रोखू शकतो?",
  },
  gu: {
    title: "AI પ્લાન્ટ ડોક્ટર",
    subtitle: "નિષ્ણાત બોટનિકલ સલાહ",
    placeholder: "સંદેશ લખો...",
    emptyState: "તમારા છોડ વિશે પૂછો",
    error: "પ્લાન્ટ ડોક્ટર સાથે કનેક્શન નિષ્ફળ ગયું.",
    qa_summarize_label: "રિપોર્ટ સારાંશ",
    qa_summarize_prompt: "શું તમે મારા માટે નિદાન રિપોર્ટનો સારાંશ આપી શકો છો?",
    qa_treat_label: "વધુ સારવાર",
    qa_treat_prompt: "કેટલાક વૈકલ્પિક સારવાર વિકલ્પો શું છે?",
    qa_prevent_label: "નિવારણ ટિપ્સ",
    qa_prevent_prompt: "હું ભવિષ્યમાં આ રોગને કેવી રીતે અટકાવી શકું?",
  },
  kn: {
    title: "AI ಸಸ್ಯ ವೈದ್ಯರು",
    subtitle: "ತಜ್ಞ ಸಸ್ಯಶಾಸ್ತ್ರೀಯ ಸಲಹೆ",
    placeholder: "ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    emptyState: "ನಿಮ್ಮ ಸಸ್ಯದ ಬಗ್ಗೆ ಕೇಳಿ",
    error: "ಸಸ್ಯ ವೈದ್ಯರೊಂದಿಗಿನ ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ.",
    qa_summarize_label: "ವರದಿ ಸಾರಾಂಶ",
    qa_summarize_prompt: "ನೀವು ನನಗಾಗಿ ರೋಗನಿರ್ಣಯ ವರದಿಯನ್ನು ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸಬಹುದೇ?",
    qa_treat_label: "ಹೆಚ್ಚಿನ ಚಿಕಿತ್ಸೆಗಳು",
    qa_treat_prompt: "ಕೆಲವು ಪರ್ಯಾಯ ಚಿಕಿತ್ಸಾ ಆಯ್ಕೆಗಳು ಯಾವುವು?",
    qa_prevent_label: "ತಡೆಗಟ್ಟುವಿಕೆ ಸಲಹೆಗಳು",
    qa_prevent_prompt: "ಭವಿಷ್ಯದಲ್ಲಿ ನಾನು ಈ ರೋಗವನ್ನು ಹೇಗೆ ತಡೆಯಬಹುದು?",
  },
  ml: {
    title: "AI പ്ലാന്റ് ഡോക്ടർ",
    subtitle: "വിദഗ്ദ്ധ ബൊട്ടാണിക്കൽ ഉപദേശം",
    placeholder: "സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    emptyState: "നിങ്ങളുടെ ചെടിയെക്കുറിച്ച് ചോദിക്കുക",
    error: "പ്ലാന്റ് ഡോക്ടറുമായുള്ള കണക്ഷൻ പരാജയപ്പെട്ടു.",
    qa_summarize_label: "റിപ്പോർട്ട് സംഗ്രഹം",
    qa_summarize_prompt: "രോഗനിർണയ റിപ്പോർട്ട് എനിക്ക് സംഗ്രഹിച്ചു തരാമോ?",
    qa_treat_label: "കൂടുതൽ ചികിത്സകൾ",
    qa_treat_prompt: "ചില ബദൽ ചികിത്സാ മാർഗങ്ങൾ ഏവ?",
    qa_prevent_label: "പ്രതിരോധ ടിപ്പുകൾ",
    qa_prevent_prompt: "ഭാവിയിൽ ഈ രോഗം എനിക്ക് എങ്ങനെ തടയാം?",
  },
  pa: {
    title: "AI ਪਲਾਂਟ ਡਾਕਟਰ",
    subtitle: "ਮਾਹਰ ਬੋਟੈਨੀਕਲ ਸਲਾਹ",
    placeholder: "ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...",
    emptyState: "ਆਪਣੇ ਪੌਦੇ ਬਾਰੇ ਪੁੱਛੋ",
    error: "ਪਲਾਂਟ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਅਸਫਲ ਹੋ ਗਿਆ।",
    qa_summarize_label: "ਰਿਪੋਰਟ ਸਾਰ",
    qa_summarize_prompt: "ਕੀ ਤੁਸੀਂ ਮੇਰੇ ਲਈ ਨਿਦਾਨ ਰਿਪੋਰਟ ਦਾ ਸਾਰ ਦੇ ਸਕਦੇ ਹੋ?",
    qa_treat_label: "ਹੋਰ ਇਲਾਜ",
    qa_treat_prompt: "ਕੁਝ ਵਿਕਲਪਕ ਇਲਾਜ ਦੇ ਵਿਕਲਪ ਕੀ ਹਨ?",
    qa_prevent_label: "ਰੋਕਥਾਮ ਸੁਝਾਅ",
    qa_prevent_prompt: "ਮੈਂ ਭਵਿੱਖ ਵਿੱਚ ਇਸ ਬਿਮਾਰੀ ਨੂੰ ਕਿਵੇਂ ਰੋਕ ਸਕਦਾ ਹਾਂ?",
  },
  or: {
    title: "AI ପ୍ଲାଣ୍ଟ ଡାକ୍ତର",
    subtitle: "ବିଶେଷଜ୍ଞ ଉଦ୍ଭିଦ ପରାମର୍ଶ",
    placeholder: "ବାର୍ତ୍ତା ଟାଇପ୍ କରନ୍ତୁ...",
    emptyState: "ଆପଣଙ୍କ ଗଛ ବିଷୟରେ ପଚାରନ୍ତୁ",
    error: "ପ୍ଲାଣ୍ଟ ଡାକ୍ତରଙ୍କ ସହ ସଂଯୋଗ ବିଫଳ ହେଲା।",
    qa_summarize_label: "ରିପୋର୍ଟ ସାରାଂଶ",
    qa_summarize_prompt: "ଆପଣ ମୋ ପାଇଁ ରୋଗ ନିରୂପଣ ରିପୋର୍ଟ ସାରାଂଶ କରିପାରିବେ କି?",
    qa_treat_label: "ଅଧିକ ଚିକିତ୍ସା",
    qa_treat_prompt: "କିଛି ବିକଳ୍ପ ଚିକିତ୍ସା ବିକଳ୍ପ କ'ଣ?",
    qa_prevent_label: "ନିରାକରଣ ଟିପ୍ସ",
    qa_prevent_prompt: "ମୁଁ ଭବିଷ୍ୟତରେ ଏହି ରୋଗକୁ କିପରି ରୋକିପାରିବି?",
  },
};

const ChatBox = ({ reportData, chatHistory, addChatMessage, language = "en" }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Helper to get text based on language
  const t = (key) =>
    CHAT_TRANSLATIONS[language]?.[key] || CHAT_TRANSLATIONS["en"][key];

  // Dynamic Quick Actions based on language
  const quickActions = [
    { label: t("qa_summarize_label"), prompt: t("qa_summarize_prompt") },
    { label: t("qa_treat_label"), prompt: t("qa_treat_prompt") },
    { label: t("qa_prevent_label"), prompt: t("qa_prevent_prompt") },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setError(null);
    setIsLoading(true);

    // 1. Add User Message to local state
    addChatMessage({ role: "user", content: userMessage });

    try {
      // 2. Axios POST request
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/chat",
        {
          message: userMessage,
          reportContext: reportData,
          history: chatHistory.slice(-5), // Send last 5 messages context
          language: language, // 🔹 Pass language to backend
        }
      );

      // 3. Add AI Response
      addChatMessage({
        role: "doctor",
        content: response.data.reply,
      });
    } catch (err) {
      console.error("Axios Error:", err);
      const errorMessage =
        err.response?.data?.message || t("error");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (prompt) => {
    setMessage(prompt);
    // Slight delay to allow state update before sending
    setTimeout(() => {
        // We can't call handleSend directly here because 'message' state 
        // won't be updated instantly in the closure. 
        // Better approach: directly call API or set a flag, but for simplicity
        // in this structure, we often just set message and let user press enter
        // OR trigger the send logic manually with the prompt argument.
        
        // Correct way for this specific implementation:
        // We need to bypass the 'message' state check or pass the prompt directly
        triggerQuickSend(prompt);
    }, 50);
  };

  // Helper to send immediately without waiting for state
  const triggerQuickSend = async (text) => {
      if(isLoading) return;
      setError(null);
      setIsLoading(true);
      
      // Clear input just in case
      setMessage("");

      addChatMessage({ role: "user", content: text });

      try {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/chat",
          {
            message: text,
            reportContext: reportData,
            history: chatHistory.slice(-5),
            language: language,
          }
        );
  
        addChatMessage({
          role: "doctor",
          content: response.data.reply,
        });
      } catch (err) {
        console.error("Axios Error:", err);
        setError(t("error"));
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <div className="glass-card h-[500px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{t("title")}</h3>
          <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Sparkles className="w-12 h-12 text-primary/50 mb-4" />
            <p className="text-muted-foreground text-sm">
              {t("emptyState")} {reportData?.plantName || "plant"} 🌿
            </p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 animate-slide-up ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  msg.role === "user" ? "bg-primary/10" : "bg-accent/10"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-accent" />
                )}
              </div>
              <div
                className={
                  msg.role === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-assistant"
                }
              >
                {/* Markdown Rendering */}
                <div className="text-sm prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <p className="text-[10px] text-muted-foreground/50 mt-1">
                  {new Date(msg.timestamp || Date.now()).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </p>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div className="chat-bubble-assistant py-3 px-4">
              <div className="flex gap-1">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-xs">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {chatHistory.length === 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleQuickAction(action.prompt)}
              className="px-3 py-1.5 bg-secondary/50 hover:bg-secondary text-xs text-foreground rounded-full transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t("placeholder")}
            className="flex-1 bg-secondary/50 text-foreground rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="h-10 w-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;