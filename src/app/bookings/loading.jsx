export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Text */}
        <h2 className="text-lg font-medium text-gray-700">Loading...</h2>

        <p className="text-sm text-gray-400">Please wait a moment</p>
      </div>
    </div>
  );
}
