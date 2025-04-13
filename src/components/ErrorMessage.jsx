export const ErrorMessage = ({ error, onRetry }) => {
    if (!error) return null;
  
    return (
      <div className="error-message">
        <div className="flex justify-between items-center">
          <p>{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  };