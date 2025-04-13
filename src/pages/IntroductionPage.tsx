// src/pages/IntroductionPage.tsx
import React from "react";
import CodeBlock from "../components/CodeBlock";
import { Link } from "react-router-dom";

// Helper component for inline code styling
const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-mono text-sm px-1 py-0.5 rounded">
    {children}
  </code>
);

// Example Quick Start Code
const quickStartExample = `curl -X GET \\
  https://api.vorlie.pl/v1/actions/tags \\
  -H 'Authorization: Bearer YOUR_API_KEY'`;

const IntroductionPage: React.FC = () => {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
        Introduction
      </h1>
      <p className="mb-6 text-base">
        This API provides programmatic access to interact with user verification
        data managed by Vorlie and a collection of curated GIF actions
        categorized by tags. You can use this API to retrieve verified user
        lists, check specific user status, manage GIF actions, and more.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Base URL</h2>
      <p className="mb-4 text-base">
        All API endpoints are relative to the following base URL:
      </p>
      <CodeBlock language="plaintext" code="https://api.vorlie.pl/" />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Authentication</h2>
      <p className="mb-4 text-base">
        Most requests to the Vorlie API require authentication. Authentication
        is handled via Bearer Tokens passed in the{" "}
        <InlineCode>Authorization</InlineCode> header.
      </p>
      <p className="text-base">
        You can find detailed information on obtaining and using your API key on
        the{" "}
        <Link
          to="/authentication"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Authentication
        </Link>{" "}
        page.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Quick Start Example</h2>
      <p className="mb-4 text-base">
        Here's a quick example using cURL to fetch the available action tags
        (replace <InlineCode>YOUR_API_KEY</InlineCode> with your actual key):
      </p>
      <CodeBlock language="bash" code={quickStartExample} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Versioning</h2>
      <p className="mb-4 text-base">
        The API is versioned using a path prefix. The current stable version is{" "}
        <InlineCode>/v1</InlineCode>. Breaking changes will result in a new
        version prefix.
      </p>

      {/* --- Updated Rate Limiting Section with Scope --- */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Rate Limiting</h2>
      <p className="mb-4 text-base">
        To ensure fair usage for everyone, the API enforces rate limiting
        applied <strong>per source IP address</strong>. The current limit is <strong>60 requests
        per 1 minute</strong>.
      </p>
      <p className="mb-4 text-base">
        Exceeding this limit will result in an{" "}
        <InlineCode>HTTP 429 Too Many Requests</InlineCode> error response. When
        you receive a 429 error, the response will include the following headers
        to help you manage your request rate:
      </p>
      <ul className="list-disc list-inside mb-4 text-base space-y-1">
        <li>
          <InlineCode>Retry-After</InlineCode>: The number of seconds to wait
          before making another request.
        </li>
        <li>
          <InlineCode>X-RateLimit-Limit</InlineCode>: The maximum number of
          requests allowed in the time window (currently 60).
        </li>
        <li>
          <InlineCode>X-RateLimit-Remaining</InlineCode>: The number of requests
          remaining in the current window (will be 0 when limited).
        </li>
        <li>
          <InlineCode>X-RateLimit-Reset</InlineCode>: The remaining time in
          seconds until the rate limit window resets.
        </li>
      </ul>
      <p className="text-base">
        Please implement appropriate error handling and backoff strategies in
        your application to respect these limits.
      </p>
      {/* --------------------------------------------- */}
    </div>
  );
};

export default IntroductionPage;
