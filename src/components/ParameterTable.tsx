// src/components/ParameterTable.tsx
import React from "react";
import { ApiParameter } from "../utils/apiData"; // Import the interface
import  InlineCode from "./InlineCode"; // Assuming you extracted InlineCode to its own file

interface ParameterTableProps {
  title: string;
  parameters?: ApiParameter[];
  caption?: string;
}

export const ParameterTable: React.FC<ParameterTableProps> = ({
  title,
  parameters,
  caption,
}) => {
  if (!parameters || parameters.length === 0) {
    return null; // Don't render anything if no parameters
  }

  return (
    <div className="mb-8">
      {" "}
      {/* Spacing below table section */}
      <h3 className="text-lg lg:text-xl font-semibold !mt-0 !mb-3">{title}</h3>
      {caption && (
        <p className="text-sm text-gray-500 dark:text-gray-400 !mt-0 !mb-4">
          {caption}
        </p>
      )}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-md">
        <table className="w-full text-sm">
          <thead className="text-left font-medium bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="py-2 px-3 lg:px-4 w-1/4">Name</th>
              <th className="py-2 px-3 lg:px-4 w-1/4">Type</th>
              <th className="py-2 px-3 lg:px-4 w-1/2">Description</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param) => (
              <tr
                key={param.name}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-3 lg:px-4 font-mono align-top">
                  {param.name}
                  {param.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </td>
                <td className="py-2 px-3 lg:px-4 font-mono text-purple-600 dark:text-purple-400 align-top">
                  {param.type}
                </td>
                <td className="py-2 px-3 lg:px-4 text-gray-600 dark:text-gray-400 align-top space-y-1">
                  <p className="!my-0">{param.description}</p>
                  {param.required && (
                    <span className="block text-xs text-red-500/80">
                      (required)
                    </span>
                  )}
                  {param.example !== undefined && (
                    <p className="!my-0 text-xs text-gray-500">
                      Example: <InlineCode>{String(param.example)}</InlineCode>
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParameterTable;