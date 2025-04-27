import React, { useState } from "react";
import { FaTimes, FaUser, FaPaperPlane, FaComments } from "react-icons/fa";

const FloatingChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: `Welcome to Flex11! How can I assist you today?`,
    },
    {
      from: "bot",
      text: `💡 Most people ask about "Order Protection & Safety"`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
      // Simulate bot reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "Thank you for your question! We'll get back to you shortly.",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-[#C84A31] text-white p-3 shadow-lg hover:bg-blue-700 z-50"
      >
        <FaComments size={20} />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white shadow-lg w-80 h-96 p-4 z-50 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold text-gray-800">Chat with us</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>

          {/* Message Area */}
          <div className="mt-4 flex-grow overflow-y-auto space-y-4 pr-1">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                {msg.from === "bot" ? (
                  <>
                    <div className="bg-gray-300 p-2">
                      <FaUser />
                    </div>
                    <div className="bg-gray-100 p-3 text-sm text-gray-800 max-w-xs">
                      {msg.text}
                    </div>
                  </>
                ) : (
                  <div className="ml-auto bg-blue-100 p-3 text-sm text-blue-900 max-w-xs">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatBox;
