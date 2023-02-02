import React from 'react';

const logErrorToMyService = (error, errorInfo) => {
  console.log(`logErrorToMyService; error: ${error}`);
  console.log(`logErrorToMyService; errorInfo: ${errorInfo}`);
  document.getElementById('errorContainer').innerHTML = error;
  document.getElementById('errorInfoContainer').innerHTML = JSON.stringify(
    JSON.parse(JSON.stringify(errorInfo)),
    null,
    4
  );
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: 'no error',
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          error:
          <div id="errorContainer">errorContainer</div>
          errorInfo:
          <pre id="errorInfoContainer" style={{ width: '80%' }}>
            errorInfoContainer
          </pre>
        </>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
