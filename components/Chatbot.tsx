"use client";

import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hi there! I'm SoftSell's AI assistant. How can I help you with your software license management today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const callChatAPI = async (userMessage: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();
      setIsLoading(false);
      return data.response;
    } catch (error) {
      console.error("Error calling chat API:", error);
      setIsLoading(false);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", content: inputMessage.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    const aiResponse = await callChatAPI(inputMessage);
    setMessages((prev) => [...prev, { role: "system", content: aiResponse }]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 bottom-6 right-6 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed z-50 bottom-24 right-6 w-[22rem] max-w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">SoftSell Assistant</p>
                <p className="text-xs text-blue-100">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-96">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 text-sm max-w-[80%] ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 text-sm flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 bg-gray-50 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`bg-blue-600 text-white p-2 rounded-lg transition duration-200 ${
                  inputMessage.trim() === "" || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={inputMessage.trim() === "" || isLoading}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
