import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/messagesSlice";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: message,
      email: "you@example.com",
      status: "sent",
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));
    setMessage("");
    onSend(); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-t p-4 flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
