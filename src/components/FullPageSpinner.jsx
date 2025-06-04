export default function FullPageSpinner() {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 
        h-100 justify-content-center align-items-center bg-white bg-opacity-75 "
      style={{ zIndex: 1000 }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
