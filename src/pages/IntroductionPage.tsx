// src/pages/IntroductionPage.tsx
import React from "react";
import CodeBlock from "../components/CodeBlock";
import { Link } from "react-router-dom";
import InlineCode from "../components/InlineCode"; // Use consistent import path

// --- UPDATED Quick Start Code (No Auth Header) ---
const quickStartExample = `curl -X GET https://api.vorlie.pl/v1/actions/tags`;
// -------------------------------------------------

const IntroductionPage: React.FC = () => {
  return (
    // Added base text colors
    <div className="text-gray-800 dark:text-gray-200">
      {/* Consistent H1 style */}
      <h1 className="text-3xl font-bold !mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">
        Introduction
      </h1>

      {/* Lead Paragraph style */}
      <p className="text-lg text-gray-600 dark:text-gray-400 !mb-8">
        Welcome! This API provides programmatic access to interact with user
        verification data managed by Vorlie and a collection of curated GIF
        actions categorized by tags. Use this API to retrieve verified user
        lists, check specific user status, manage GIF actions, and more.
      </p>

      {/* Consistent H2 style */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Base URL
      </h2>
      <p className="text-base !mb-4">
        All API endpoints described in this documentation are relative to the
        following base URL:
      </p>
      <CodeBlock language="plaintext" code="https://api.vorlie.pl/v1" />

      {/* Authentication Section - MODIFIED Text */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Authentication
      </h2>
      <p className="text-base !mb-4">
        Most write requests (<InlineCode>PUT</InlineCode>,{" "}
        <InlineCode>DELETE</InlineCode>) and all user management requests
        require authentication via a Bearer Token in the{" "}
        <InlineCode>Authorization</InlineCode> header. However,{" "}
        <strong className="font-semibold">GET requests for actions data</strong>{" "}
        (like listing tags or getting GIFs) are public and do not require a key.
      </p>
      <p className="text-base">
        Please see the{" "}
        <Link
          to="/authentication"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Authentication page
        </Link>{" "}
        for full details on key types and how to obtain one if needed.
      </p>

      {/* Quick Start Section - MODIFIED Text and Example */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Quick Start Example
      </h2>
      <p className="text-base !mb-4">
        Here's a quick example using cURL to fetch the available action tags.
        This request{" "}
        <strong className="font-semibold">does not require an API key</strong>:
      </p>
      <CodeBlock language="bash" code={quickStartExample} />

      {/* Versioning Section */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Versioning
      </h2>
      <p className="text-base !mb-4">
        The API is versioned using a path prefix. The current stable version is{" "}
        <InlineCode>/v1</InlineCode>. Breaking changes may result in a future
        version prefix (e.g., `/v2`).
      </p>

      {/* Rate Limiting Section - Text unchanged, just styling */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Rate Limiting
      </h2>
      <p className="text-base !mb-4">
        To ensure fair usage, the API enforces rate limits (currently 60
        requests per minute per IP). Exceeding the limit will result in an{" "}
        <InlineCode>HTTP 429</InlineCode> error.
      </p>
      <p className="text-base">
        Please see the dedicated{" "}
        <Link
          to="/rate-limits"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Rate Limits page
        </Link>{" "}
        for detailed information on limits, headers, and handling strategies.
      </p>
    </div>
  );
};

export default IntroductionPage;
