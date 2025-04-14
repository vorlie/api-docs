// src/App.tsx
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

// Import page components
import IntroductionPage from "./pages/IntroductionPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import EndpointDetailPage from "./pages/EndpointDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import UsageGuidelinesPage from "./pages/UsageGuidelinesPage";
import Sidebar from "./components/Sidebar";
import ErrorsPage from "./pages/ErrorsPage";
import RateLimitsPage from "./pages/RateLimitsPage";

// --- Theme Management Logic ---
//type Theme = 'light' | 'dark';

// --- Burger Icon Component ---
const BurgerIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
  >
    <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
  </svg>
);
// ------------------------------------

// ------------------------

const DocsLayout = () => {
  // --- State for Mobile Sidebar ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  // ------------------------------

  return (
    <div className="flex min-h-screen relative lg:static">
      <Sidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 bg-white dark:bg-gray-950 ">
        <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-900 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center">
          <img src="/icon.png" alt="Vorlie Logo" className="h-8 w-auto mr-2" />
          <NavLink
            to="/"
            className="text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200"
          >
            Documentation
          </NavLink>
        </div>
          <button
            onClick={toggleMobileMenu}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Open sidebar"
          >
            <BurgerIcon />
          </button>
        </div>
        {/* ----------------------------------------- */}

        <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-950">
          <Outlet />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden" // Show only on mobile when open
          onClick={toggleMobileMenu} // Close menu on overlay click
          aria-hidden="true"
        ></div>
      )}
      {/* -------------------------------------- */}
    </div>
  );
};

function App() {
  // ... (Routes setup remains the same) ...
  return (
    <Routes>
      <Route path="/" element={<DocsLayout />}>
        <Route index element={<IntroductionPage />} />
        <Route path="introduction" element={<IntroductionPage />} />
        <Route path="authentication" element={<AuthenticationPage />} />
        <Route path="status-codes" element={<ErrorsPage />} />
        <Route path="usage-guidelines" element={<UsageGuidelinesPage />} />
        <Route
          path="api-reference/:endpointId"
          element={<EndpointDetailPage />}
        />
        <Route path="rate-limits" element={<RateLimitsPage />} />
        {/* Catch-all within layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
