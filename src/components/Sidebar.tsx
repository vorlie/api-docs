// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { apiEndpoints, ApiEndpoint } from "../utils/apiData";
import getMethodBadgeClass from "../utils/GetMethodBadgeClass";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the sidebar (toggle)
}

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

const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

// ---------------------------------------

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
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
    <aside
      className={`
            fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700/50 flex flex-col
            transform transition-transform duration-300 ease-in-out
            ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }
            lg:translate-x-0 lg:sticky lg:inset-y-0 lg:left-0 lg:z-auto
        `}
      aria-label="Sidebar" // Accessibility
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src="/icon.png" alt="Vorlie Logo" className="h-8 w-auto mr-2" />
          <NavLink
            to="/"
            className="text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200"
            onClick={onClose} // Close sidebar on title click on mobile
          >
            Documentation
          </NavLink>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg p-1.5 lg:hidden" // Only show on small screens
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
        {/* ----------------------------------------- */}
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
          onClick={onClose}
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
          onClick={onClose}
        >
          Authentication
        </NavLink>
        <NavLink
          to="/usage-guidelines"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive ? linkActiveClasses : linkIdleClasses
            }`
          }
          onClick={onClose}
        >
          Usage Guidelines
        </NavLink>
        <NavLink
          to="/status-codes"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive ? linkActiveClasses : linkIdleClasses
            }`
          }
          onClick={onClose}
        >
          Status Codes
        </NavLink>
        <NavLink
          to="/rate-limits"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive ? linkActiveClasses : linkIdleClasses
            }`
          }
          onClick={onClose}
        >
          Rate Limits
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
