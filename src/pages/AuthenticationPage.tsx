// src/pages/AuthenticationPage.tsx
import React from "react";
import CodeBlock from "../components/CodeBlock";
// Import Link if you haven't already in this file, though not used in this snippet
// import { Link } from 'react-router-dom';

// Helper component for inline code styling
const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-mono text-sm px-1 py-0.5 rounded">
    {children}
  </code>
);

// Example HTTP Request
const httpExample = `GET /v1/actions/tags HTTP/1.1
Host: api.vorlie.pl
Authorization: Bearer YOUR_ACTIONS_API_KEY`;

const AuthenticationPage: React.FC = () => {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
        Authentication
      </h1>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Overview</h2>
      <p className="mb-4 text-base md:text-lg">
        Most requests to the Vorlie API require authentication using an API key
        provided as a Bearer Token in the <InlineCode>Authorization</InlineCode>{" "}
        header.
      </p>
      <CodeBlock language="http" code={httpExample} />
      <p className="mt-4 mb-6 text-base md:text-lg">
        Replace <InlineCode>YOUR_ACTIONS_API_KEY</InlineCode> (or the relevant
        key for your request) with your actual API key. Requests without a valid
        key or with insufficient permissions will receive a{" "}
        <InlineCode>401 Unauthorized</InlineCode> or{" "}
        <InlineCode>403 Forbidden</InlineCode> error.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        API Key Types & Permissions
      </h2>
      <p className="mb-3 text-base">
        There are different API keys available, each granting access to specific
        parts of the API:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2 text-base">
        <li>
          <strong className="font-semibold">Actions Key:</strong> This key
          provides access to endpoints under{" "}
          <InlineCode>/v1/actions/</InlineCode> (e.g., retrieving GIFs by tag,
          listing tags, adding new actions). This is the key typically provided
          to external users or applications.
        </li>
        <li>
          <strong className="font-semibold">User Management Key:</strong> This
          key grants access to sensitive user management endpoints under{" "}
          <InlineCode>/v1/users/</InlineCode> (e.g., listing verified users,
          deleting users).{" "}
          <strong className="text-red-600 dark:text-red-400">
            This key is strictly private and intended for administrative use
            only. It will not be distributed.
          </strong>
        </li>
      </ul>
      <p className="text-base">
        Ensure you are using the appropriate key for the endpoint you are trying
        to access.
      </p>

      {/* --- Updated Obtaining Keys Section --- */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">Obtaining an API Key</h2>
      <p className="mb-4 text-base">
        As mentioned, the User Management Key is private.
      </p>
      <p className="text-base">
        To obtain an <strong>Actions Key</strong> for accessing the GIF endpoints, please
        follow these steps:
      </p>
      <ol className="list-decimal list-inside mb-4 text-base space-y-1">
        <li>
          Join the official Discord server using this link:{" "}
          <a
            href="https://vorlie.pl/?link=miko_support"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Vorlie API Discord Server
          </a>
          .
        </li>
        <li>
          Once you're in the server, please contact{" "}
          <InlineCode>Vorlie</InlineCode> to request an Actions API key.
        </li>
        <li>
          Briefly mention your intended use case for the key when requesting.
        </li>
      </ol>
      {/* ------------------------------------- */}
    </div>
  );
};

export default AuthenticationPage;
