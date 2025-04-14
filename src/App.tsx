// src/App.tsx
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';

// Import page components
import IntroductionPage from './pages/IntroductionPage';
import AuthenticationPage from './pages/AuthenticationPage';
import EndpointDetailPage from './pages/EndpointDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import UsageGuidelinesPage from './pages/UsageGuidelinesPage';
import Sidebar from './components/Sidebar'; 
import ErrorsPage from './pages/ErrorsPage';
import RateLimitsPage from './pages/RateLimitsPage';

// --- Theme Management Logic --- (Keep existing)
//type Theme = 'light' | 'dark';

// --- Burger Icon Component ---
const BurgerIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
        <div className="flex min-h-screen relative lg:static"> {/* Relative for overlay positioning */}
            {/* Pass state and toggle function to Sidebar */}
            <Sidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

            {/* Main Content Area */}
            {/* --- MODIFIED: Responsive Margin --- */}
            <div className="flex-1 min-w-0 bg-white dark:bg-gray-950 "> {/* Margin applied only on lg screens */}
                {/* --- ADDED: Mobile Header/Burger Button --- */}
                <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-900 flex justify-between items-center sticky top-0 z-30">
                    {/* Link to home or site title for mobile header */}
                    <NavLink to="/" className="text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
                      API Docs
                    </NavLink>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-label="Open sidebar"
                    >
                        <BurgerIcon />
                    </button>
                </div>
                {/* ----------------------------------------- */}

                {/* --- MODIFIED: Padding inside content --- */}
                <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-950"> {/* Moved padding here */}
                    <Outlet />
                </div>
            </div>

            {/* --- ADDED: Overlay for Mobile Menu --- */}
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
            <Route path="api-reference/:endpointId" element={<EndpointDetailPage />} />
            <Route path="rate-limits" element={<RateLimitsPage />} />
            {/* Catch-all within layout */}
            <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* You might not need the separate /not-found route anymore if the above catch-all works */}
        {/* <Route path="/not-found" element={<SimpleLayout />}> ... </Route> */}
        {/* <Route path="*" element={<SimpleLayout />}> ... </Route> */}
    </Routes>
  )
}

export default App