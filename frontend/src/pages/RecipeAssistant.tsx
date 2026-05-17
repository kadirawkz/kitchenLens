import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  ChefHat, 
  Bot, 
  User, 
  Sparkles,
  RefreshCcw
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function RecipeAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your AI kitchen assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I've checked your inventory. Based on the eggs and bread you have expiring soon, I recommend making French Toast! Would you like the steps?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-600 text-white rounded-2xl shadow-lg">
            <ChefHat size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Recipe Assistant</h2>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <Sparkles size={14} className="text-primary-500" />
              Powered by Gemini 1.5 Flash
            </p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 card-premium p-4 mb-4 flex flex-col min-h-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 px-2 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-center text-slate-400">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="mt-4 pt-4 border-t dark:border-slate-800">
          <div className="relative flex items-center">
            <input 
              type="text"
              placeholder="Ask for recipes or check inventory..."
              className="w-full pl-6 pr-16 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-inner"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-3 bg-primary-600 text-white rounded-xl shadow-lg hover:bg-primary-700 transition-all active:scale-90 disabled:opacity-50 disabled:scale-100"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {[
              "What can I cook today?",
              "What's expiring soon?",
              "Suggest a budget meal plan",
              "How much did I spend this week?"
            ].map((suggest) => (
              <button
                key={suggest}
                onClick={() => setInput(suggest)}
                className="px-4 py-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-full text-xs font-medium text-slate-500 hover:border-primary-500 hover:text-primary-600 transition-all whitespace-nowrap shadow-sm"
              >
                {suggest}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
