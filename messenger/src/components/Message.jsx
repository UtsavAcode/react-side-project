const Message = ({ message, isOutgoing }) => (
  <div
    className={`max-w-[70%] mb-2 p-3 rounded-lg ${
      isOutgoing
        ? "bg-blue-500 text-white self-end rounded-br-none"
        : "bg-gray-200 self-start rounded-bl-none"
    }`}
  >
    <div className="font-medium">{message.name}</div>
    <div className="text-sm">{message.email}</div>
    <div className="text-xs mt-1 opacity-70">{message.status}</div>
  </div>
);

export default Message;
