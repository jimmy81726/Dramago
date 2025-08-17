export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
      <div
        className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
