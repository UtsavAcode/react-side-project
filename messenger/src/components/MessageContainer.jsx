import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/messagesSlice";
import Message from "./Message";
import MessageInput from "./MessageInput";
import ScrollToBottom from "./ScrollToBottom";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const {
    items: messages,
    loading,
    error,
    currentPage,
    hasMore,
  } = useSelector((state) => state.messages);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadInitialMessages();
  }, []);

  const loadInitialMessages = async () => {
    await dispatch(fetchMessages(1));
  };

  const handleScroll = async (e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && !loading && hasMore) {
      await dispatch(fetchMessages(currentPage + 1));
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {error && (
        <div className="bg-red-100 text-red-600 p-2 text-center">{error}</div>
      )}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 flex flex-col-reverse"
      >
        {loading && (
          <div className="text-center py-2">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent mx-auto" />
          </div>
        )}

        <div ref={bottomRef} />

        {messages
          .slice()
          .reverse()
          .map((message, index) => (
            <Message
              key={message.id}
              message={message}
              isOutgoing={index % 2 === 1}
            />
          ))}
      </div>

      <ScrollToBottom onClick={scrollToBottom} />
      <MessageInput onSend={scrollToBottom} />
    </div>
  );
};

export default MessageContainer;
