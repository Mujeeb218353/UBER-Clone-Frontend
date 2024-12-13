import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
      setErrorInfo(event.error);
    };

    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <h1 className='text-3xl font-bold'>Something went wrong</h1>
        </div>
    )
  }

  return children;
};

export default ErrorBoundary;