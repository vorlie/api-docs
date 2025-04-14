// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // To link back home

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)] px-4"> {/* Adjust min-h based on layout header/footer height */}
      <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;