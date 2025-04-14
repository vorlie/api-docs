import React from 'react';

const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-mono text-sm px-1 py-0.5 rounded mx-0.5">
    {children}
  </code>
);

export default InlineCode;