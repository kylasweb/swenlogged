import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotSettings {
  enabled: boolean;
  name: string;
  welcomeMessage: string;
  theme: 'blue' | 'green' | 'purple' | 'orange';
  position: 'bottom-right' | 'bottom-left' | 'bottom-center';
  size: 'small' | 'medium' | 'large';
  avatar?: string;
  personality: string;
  language: string;
  apiProvider: 'puter' | 'openai' | 'custom';
  customApiUrl?: string;
  contextInstructions: string;
}

const defaultChatbotSettings: ChatbotSettings = {
  enabled: true,
  name: 'SWENLOG Assistant',
  welcomeMessage: 'Hello! How can I help you with your logistics needs today?',
  theme: 'blue',
  position: 'bottom-right',
  size: 'medium',
  personality: 'professional and helpful',
  language: 'en',
  apiProvider: 'puter',
  contextInstructions: 'You are SWENLOG\'s AI assistant. Provide helpful, concise responses about logistics services.'
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPuterReady, setIsPuterReady] = useState(false);
  const [chatbotSettings] = useLocalStorage<ChatbotSettings>('chatbotSettings', defaultChatbotSettings);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Puter.js
  useEffect(() => {
    if (!chatbotSettings.enabled) return;

    const initializePuter = async () => {
      try {
        // Load Puter.js script if not already loaded
        if (!document.querySelector('script[src="https://js.puter.com/v2/"]')) {
          const script = document.createElement('script');
          script.src = 'https://js.puter.com/v2/';
          script.async = true;
          document.head.appendChild(script);
          
          script.onload = () => {
            console.log('Puter.js script loaded');
            checkPuterAvailability();
          };
          
          script.onerror = () => {
            console.error('Failed to load Puter.js script');
          };
        } else {
          checkPuterAvailability();
        }
      } catch (error) {
        console.error('Error initializing Puter.js:', error);
      }
    };

    const checkPuterAvailability = async () => {
      const maxAttempts = 20;
      let attempts = 0;
      
      while ((!window.puter || !window.puter.ai) && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      }
      
      if (window.puter && window.puter.ai) {
        console.log('Puter.js is ready');
        setIsPuterReady(true);
        
        // Add welcome message
        if (chatbotSettings.welcomeMessage && messages.length === 0) {
          const welcomeMessage: Message = {
            id: Date.now(),
            text: chatbotSettings.welcomeMessage,
            isUser: false,
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }
      } else {
        console.error('Puter.js failed to initialize');
      }
    };

    initializePuter();
  }, [chatbotSettings.enabled, chatbotSettings.welcomeMessage]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const extractTextFromResponse = (response: any): string => {
    console.log('Full AI response:', response);
    
    if (!response) {
      return 'I apologize, but I did not receive a response. Please try again.';
    }

    try {
      // Handle Puter.js response format
      if (response.message?.content) {
        if (Array.isArray(response.message.content)) {
          const textContent = response.message.content
            .filter((item: any) => item.type === 'text')
            .map((item: any) => item.text)
            .join(' ');
          return textContent || 'I apologize, but I could not process the response properly.';
        }
        return String(response.message.content);
      }

      // Fallback to string conversion
      if (typeof response === 'string') {
        return response;
      }

      return 'I apologize, but I could not process the response properly.';
    } catch (error) {
      console.error('Error extracting text from response:', error);
      return 'I apologize, but there was an error processing the response.';
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      if (!isPuterReady) {
        throw new Error('AI service is not ready. Please wait a moment and try again.');
      }

      // Enhanced context with training data
      const enhancedContext = `${chatbotSettings.contextInstructions}

Personality: ${chatbotSettings.personality}
Language: ${chatbotSettings.language}

User question: ${inputMessage}

Please provide a helpful response about SWENLOG's logistics services.`;

      const response = await window.puter.ai.chat(enhancedContext, true);
      const responseText = extractTextFromResponse(response);
      
      // Reduce timeout delay for better performance
      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: responseText,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 300); // Reduced from default to improve performance

    } catch (error) {
      console.error('Error sending message:', error);
      setTimeout(() => {
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: 'I apologize, but I encountered an error. Please try again later.',
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 300);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const getThemeColors = () => {
    switch (chatbotSettings.theme) {
      case 'green': return { primary: 'bg-green-500 hover:bg-green-700', secondary: 'bg-green-100 text-green-800' };
      case 'purple': return { primary: 'bg-purple-500 hover:bg-purple-700', secondary: 'bg-purple-100 text-purple-800' };
      case 'orange': return { primary: 'bg-orange-500 hover:bg-orange-700', secondary: 'bg-orange-100 text-orange-800' };
      default: return { primary: 'bg-blue-500 hover:bg-blue-700', secondary: 'bg-blue-100 text-blue-800' };
    }
  };

  const getSizeClasses = () => {
    switch (chatbotSettings.size) {
      case 'small': return 'w-72';
      case 'large': return 'w-96';
      default: return 'w-80';
    }
  };

  const getPositionClasses = () => {
    switch (chatbotSettings.position) {
      case 'bottom-left': return 'bottom-5 left-5';
      case 'bottom-center': return 'bottom-5 left-1/2 transform -translate-x-1/2';
      default: return 'bottom-5 right-5';
    }
  };

  const themeColors = getThemeColors();

  if (!chatbotSettings.enabled) {
    return null;
  }

  return (
    <div className={`fixed z-50 ${getPositionClasses()}`}>
      {/* Open/Close Button */}
      <button
        className={`text-white p-3 rounded-full shadow-lg transition duration-300 ${themeColors.primary}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Live Chat" : "Open Live Chat"}
      >
        {isOpen ? 'X' : (chatbotSettings.avatar ? 
          <img src={chatbotSettings.avatar} alt="Chat" className="w-6 h-6 rounded-full" /> : 
          '💬'
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`${getSizeClasses()} bg-white rounded-lg shadow-xl overflow-hidden mt-2`}>
          {/* Header */}
          <div className={`p-4 border-b text-white ${themeColors.primary.replace('hover:', '').split(' ')[0]}`}>
            <h5 className="text-lg font-semibold">{chatbotSettings.name}</h5>
            {!isPuterReady && (
              <p className="text-xs opacity-75">Initializing AI...</p>
            )}
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto" ref={chatContainerRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 p-2 rounded-lg ${message.isUser ? 
                  `${themeColors.secondary} ml-auto w-fit max-w-[70%]` : 
                  'bg-gray-200 text-gray-800 mr-auto w-fit max-w-[70%]'
                }`}
              >
                {message.text}
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-gray-500">Typing...</div>}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="mt-2 flex justify-end">
              <button
                className={`text-white p-2 rounded-md transition duration-300 ${themeColors.primary}`}
                onClick={sendMessage}
                disabled={!isPuterReady || isTyping}
              >
                {isTyping ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
