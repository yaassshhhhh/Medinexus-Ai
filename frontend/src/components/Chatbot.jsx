import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [symptoms, setSymptoms] = useState('');
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hello! I'm your **AI Health Assistant**. Describe your symptoms, and I'll suggest potential causes and home remedies." }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleAnalyze = async () => {
        if (!symptoms.trim()) return;

        const userMessage = { role: 'user', content: symptoms };
        setMessages(prev => [...prev, userMessage]);
        setSymptoms('');
        setLoading(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
            const { data } = await axios.post(`${backendUrl}/api/chatbot/analyze`, { symptoms: userMessage.content });

            if (data.success) {
                setMessages(prev => [...prev, { role: 'bot', content: data.analysis }]);
            } else {
                toast.error(data.message);
                setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I encountered an error analyzing your symptoms." }]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to analyze symptoms.");
            setMessages(prev => [...prev, { role: 'bot', content: "Network error. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-[90vw] sm:w-[400px] mb-4 overflow-hidden border border-white/20 flex flex-col h-[500px] sm:h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex justify-between items-center text-white shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none animate-pulse"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm shadow-inner">
                                    <Sparkles size={20} className="text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight tracking-wide">MediNexus AI</h3>
                                    <p className="text-xs text-indigo-100 font-medium">Smart Health Assistant</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 p-2 rounded-full text-white transition-colors relative z-10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4 scroll-smooth">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-100'}`}>
                                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-md ${msg.role === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-none'
                                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                            }`}>
                                            {msg.role === 'bot' ? (
                                                <div className="markdown-body prose prose-sm prose-indigo max-w-none">
                                                    <ReactMarkdown
                                                        components={{
                                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                                            li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                                                            h1: ({ node, ...props }) => <h1 className="text-base font-bold mb-2 text-indigo-800" {...props} />,
                                                            h2: ({ node, ...props }) => <h2 className="text-sm font-bold mb-2 text-indigo-700" {...props} />,
                                                            h3: ({ node, ...props }) => <h3 className="text-sm font-semibold mb-1 text-indigo-600" {...props} />,
                                                            strong: ({ node, ...props }) => <strong className="font-bold text-indigo-900" {...props} />,
                                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-full bg-white text-indigo-600 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <Bot size={16} />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-md flex items-center gap-2">
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Disclaimer */}
                        <div className="px-4 py-1.5 bg-indigo-50/50 border-t border-indigo-100 text-center backdrop-blur-sm">
                            <p className="text-[10px] text-indigo-400 font-medium tracking-wide">⚠️ AI advice only. Please consult a doctor for medical issues.</p>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-slate-100">
                            <div className="flex gap-2 items-end">
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none placeholder-slate-400 transition-all max-h-32 shadow-inner"
                                    placeholder="Describe your symptoms..."
                                    rows="1"
                                    value={symptoms}
                                    onChange={(e) => {
                                        setSymptoms(e.target.value);
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleAnalyze();
                                        }
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAnalyze}
                                    disabled={loading || !symptoms.trim()}
                                    className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 transition-colors flex-shrink-0"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="group flex items-center justify-center p-0 rounded-full shadow-2xl hover:shadow-indigo-500/30 transition-shadow duration-300 relative"
                    >
                        <span className="absolute inset-0 rounded-full bg-indigo-600 opacity-75 animate-ping"></span>
                        <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-4 rounded-full relative overflow-hidden ring-4 ring-white">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
                            <MessageCircle size={32} className="relative z-10" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
