import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    //This state is used to determine whether to show the fallback UI or the children components.
    this.state = { hasError: false };
  }

  // This method is called when a child component throws an error.
  // It updates the state so that the fallback UI is shown on the next render.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // This method is also called and is ideal for side effects
  // such as logging the error to an external service (e.g. Sentry, LogRocket).
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    // Example: logErrorToMyService(error, errorInfo);
  }

  render() {
    // If an error has occurred, show our fallback UI.
    if (this.state.hasError) {
      // You can render any fallback component here.
      // We'll create a simple one shortly.
      return <GlobalErrorFallback />;
    }

    // If everything is fine, render the children components as normal.
    return this.props.children;
  }
}

// A simple fallback UI that is shown when the app crashes.
function GlobalErrorFallback() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">An error has occurred</h1>
      <p className="text-lg text-neutral-300 mb-8">
        Something went wrong. Please try reloading the page.
      </p>
      <button
        onClick={handleRefresh}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
      >
        Reload Page
      </button>
    </div>
  );
}

export default ErrorBoundary;