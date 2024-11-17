import { ChevronDown } from 'lucide-react';

const ScrollToBottom = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-20 right-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
  >
    <ChevronDown className="h-6 w-6" />
  </button>
);

export default ScrollToBottom;