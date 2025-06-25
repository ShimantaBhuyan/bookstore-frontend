export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-40 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-label="Close modal overlay"
      />
      <div className="relative z-10 max-w-full min-w-[320px] rounded-xl bg-white p-6 shadow-lg">
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
