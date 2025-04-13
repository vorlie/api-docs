// src/App.tsx
import { Routes, Route, Outlet } from "react-router-dom"; 

import Sidebar from "./components/Sidebar";

import IntroductionPage from "./pages/IntroductionPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import EndpointDetailPage from "./pages/EndpointDetailPage";
import NotFoundPage from './pages/NotFoundPage';

const DocsLayout = () => (
  <div className="flex min-h-screen bg-white dark:bg-gray-950">
    {" "}
    <Sidebar />
    <div className="ml-64 flex-1 p-8 min-w-0">
      {" "}
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<DocsLayout />}>
        <Route index element={<IntroductionPage />} />{" "}
        <Route path="introduction" element={<IntroductionPage />} />
        <Route path="authentication" element={<AuthenticationPage />} />
        <Route
          path="api-reference/:endpointId"
          element={<EndpointDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
