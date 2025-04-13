// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { apiEndpoints, ApiEndpoint } from "../apiData";

const groupEndpoints = (endpoints: ApiEndpoint[]) => {
  return endpoints.reduce((acc, endpoint) => {
    const group = endpoint.group || "General";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(endpoint);
    return acc;
  }, {} as Record<string, ApiEndpoint[]>);
};

// --- Helper for Method BADGE Colors ---
const getMethodBadgeClass = (method: ApiEndpoint["method"]) => {
  // Returns background and text colors suitable for a badge
  switch (method) {
    case "GET":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "POST":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "PUT":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "DELETE":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "PATCH":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};
// ---------------------------------------

const Sidebar: React.FC = () => {
  const groupedEndpoints = groupEndpoints(apiEndpoints);

  // Styling classes
  const linkBaseClasses =
    "flex items-center justify-between w-full text-left px-3 py-1.5 rounded transition-colors duration-150 text-sm"; // Added justify-between
  const linkIdleClasses =
    "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50";
  const linkActiveClasses =
    "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium";
  const groupHeadingClasses =
    "text-xs font-semibold text-gray-500 dark:text-white uppercase tracking-wider mt-6 mb-2 px-3";

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-800/30 border-r border-gray-200 dark:border-gray-700/50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 h-16 flex items-center">
        {/* Logo and Title */}
        <img src="/icon.png" alt="Vorlie Logo" className="h-8 w-auto mr-2" />
        <NavLink
          to="/"
          className="text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200"
        >
          Documentation
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {/* Static Links */}
        <NavLink
          to="/introduction"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive ? linkActiveClasses : linkIdleClasses
            }`
          }
        >
          Introduction
        </NavLink>
        <NavLink
          to="/authentication"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive ? linkActiveClasses : linkIdleClasses
            }`
          }
        >
          Authentication
        </NavLink>

        {/* Dynamic Endpoint Links */}
        {Object.entries(groupedEndpoints).map(([groupName, endpoints]) => (
          <div key={groupName}>
            <h3 className={groupHeadingClasses}>
              {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
            </h3>
            <ul className="space-y-1">
              {endpoints.map((endpoint) => (
                <li key={endpoint.id}>
                  <NavLink
                    to={`/api-reference/${endpoint.id}`}
                    className={({ isActive }) =>
                      `${linkBaseClasses} ${
                        isActive ? linkActiveClasses : linkIdleClasses
                      }`
                    }
                    title={`${endpoint.method} ${endpoint.path}`}
                  >
                    <span className="truncate font-mono text-xs">
                      {" "}
                      {endpoint.path}
                    </span>

                    <span
                      className={`flex-shrink-0 font-mono text-xs font-semibold px-1.5 py-0.5 rounded ${getMethodBadgeClass(
                        endpoint.method
                      )}`}
                    >
                      {endpoint.method}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700/50 mt-auto h-14 flex items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Vorlie
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
