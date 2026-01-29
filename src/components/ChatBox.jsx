import { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScan } from '@/contexts/ScanContext';

const ChatBox = ({ reportData }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { chatHistory, addChatMessage } = useScan();

  const quickActions = [
    { label: 'Summarize Report', prompt: 'Can you summarize the diagnosis report for me?' },
    { label: 'More Treatments', prompt: 'What are some alternative treatment options?' },
    { label: 'Prevention Tips', prompt: 'How can I prevent this disease in the future?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setError(null);
    setIsLoading(true);

    // 1. Add User Message to local state/context
    addChatMessage({ role: 'user', content: userMessage });

    try {
      // 2. Axios POST request
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/chat", {
        message: userMessage,
        reportContext: reportData,
        history: chatHistory.slice(-5) // Send last 5 messages for context
      });

      // 3. Add AI Response (Assuming backend returns { data: { reply: "..." } })
      addChatMessage({ 
        role: 'assistant', 
        content: response.data.reply 
      });

    } catch (err) {
      console.error("Axios Error:", err);
      // Detailed error message handling
      const errorMessage = err.response?.data?.message || "Connection to the Plant Doctor failed.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (prompt) => {
    setMessage(prompt);
    setTimeout(() => handleSend(), 50);
  };

  return (
    <div className="glass-card h-[500px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Plant Doctor</h3>
          <p className="text-xs text-muted-foreground">Expert botanical advice</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Sparkles className="w-12 h-12 text-primary/50 mb-4" />
            <p className="text-muted-foreground text-sm">Ask me about your {reportData?.plantName || 'plant'}</p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 animate-slide-up ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${
                msg.role === 'user' ? 'bg-primary/10' : 'bg-accent/10'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-accent" />}
              </div>
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}>
                {/* Markdown Rendering */}
                <div className="text-sm prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <p className="text-[10px] text-muted-foreground/50 mt-1">
                  {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-accent/10 rounded-lg"><Bot className="w-4 h-4 text-accent" /></div>
            <div className="chat-bubble-assistant py-3 px-4">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.4s' }} />
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
            placeholder="Type a message..."
            className="flex-1 bg-secondary/50 text-foreground rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={!message.trim() || isLoading} className="h-10 w-10 p-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;