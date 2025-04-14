// src/pages/AuthenticationPage.tsx
import React from "react";
import { Link } from "react-router-dom"; 
import CodeBlock from "../components/CodeBlock";
import InlineCode from "../components/InlineCode"; 

import "highlight.js/styles/tokyo-night-dark.css";

// --- Optional Icons ---
const KeyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.566-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
    />
  </svg>
);
const StepNumber = ({ number }: { number: number }) => (
  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold flex-shrink-0">
    {number}
  </span>
);
// --------------------

const httpExample = `PUT /v1/actions HTTP/1.1
Host: api.vorlie.pl
Authorization: Bearer YOUR_ACTIONS_API_KEY
Content-Type: application/json`;
// -------------------------------------------------------------------

const AuthenticationPage: React.FC = () => {
  return (
    <div className="text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold !mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">
        Authentication
      </h1>

      {/* --- Overview Section --- */}
      <h2 className="text-2xl font-semibold !mt-6 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Overview
      </h2>
      <p className="text-base md:text-lg !mb-4">
        Most write operations (<InlineCode>PUT</InlineCode>,{" "}
        <InlineCode>DELETE</InlineCode>) and all user management requests (
        <InlineCode>/v1/users/*</InlineCode>) require authentication using an
        API key provided as a Bearer Token in the{" "}
        <InlineCode>Authorization</InlineCode> header.
      </p>
      <p className="text-base md:text-lg !mb-4">
        However, read requests for actions (
        <InlineCode>GET /v1/actions/tags</InlineCode> and{" "}
        <InlineCode>GET /v1/actions/tag/:tag</InlineCode>) are{" "}
        <strong>public and do not require authentication</strong>.
      </p>
      <p className="text-base md:text-lg !mb-4">
        For authenticated requests, the header should look like this (See{" "}
        <Link
          to="/api-reference/put-actions"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          /v1/actions
        </Link>
        ):
      </p>
      <CodeBlock language="http" code={httpExample} />
      <p className="!mt-4 !mb-6 text-base md:text-lg">
        Replace <InlineCode>YOUR_ACTIONS_API_KEY</InlineCode> with your actual
        key when making authenticated requests like the{" "}
        <InlineCode>PUT</InlineCode> example above. Requests without a valid key
        or with insufficient permissions for the required action will receive a{" "}
        <InlineCode>401 Unauthorized</InlineCode> or{" "}
        <InlineCode>403 Forbidden</InlineCode> error. See the{" "}
        <Link
          to="/status-codes"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Status Codes
        </Link>{" "}
        page for details.
      </p>

      {/* --- Key Types Section --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        API Key Types & Permissions
      </h2>
      <p className="text-base !mb-5">
        There are different API keys available, granting access to specific
        parts of the API:
      </p>
      {/* Styled list container */}
      <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700/80 p-4 lg:p-6 bg-gray-50 dark:bg-gray-800/40">
        {/* Actions Key Item */}
        <div className="flex items-start gap-3">
          <KeyIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Actions Key:
            </strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 !my-0">
              Provides access to <strong>write</strong> operations under{" "}
              <InlineCode>/v1/actions/</InlineCode> (specifically{" "}
              <InlineCode>PUT /v1/actions</InlineCode> for adding new GIFs). It
              is <strong>not</strong> required for reading action tags or GIFs.
              This is the key typically provided to external users or
              applications.
            </p>
          </div>
        </div>
        {/* User Management Key Item */}
        <div className="flex items-start gap-3">
          <KeyIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              User Management Key:
            </strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 !my-0">
              Grants access to sensitive user management endpoints under{" "}
              <InlineCode>/v1/users/</InlineCode> and the{" "}
              <InlineCode>DELETE /v1/actions/:gif_id</InlineCode> endpoint.{" "}
              <strong className="text-red-600 dark:text-red-400">
                This key is strictly private and intended for administrative use
                only. It will not be distributed.
              </strong>
            </p>
          </div>
        </div>
      </div>
      <p className="text-base !mt-6">
        Ensure you are using the appropriate key for the specific endpoint and
        method you are trying to access.
      </p>

      {/* --- Obtaining Keys Section --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Obtaining an Actions API Key
      </h2>
      <p className="text-base !mb-2">
        As mentioned, the User Management Key is private. You only need to
        request an Actions Key if you intend to submit new GIFs via{" "}
        <InlineCode>PUT /v1/actions</InlineCode>.
      </p>
      <p className="text-base !mb-4">
        To obtain an{" "}
        <strong className="font-semibold text-gray-900 dark:text-gray-100">
          Actions Key
        </strong>
        , please follow these steps:
      </p>
      {/* Styled ordered list */}
      <ol className="text-base !pl-0 !list-none space-y-4">
        <li className="flex items-start gap-3">
          <StepNumber number={1} />
          <span>
            Join the official Discord server:{" "}
            <a
              href="https://vorlie.pl/?link=miko_support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Miko's Shrine (Support Server)
            </a>
            .
          </span>
        </li>
        <li className="flex items-start gap-3">
          <StepNumber number={2} />
          <span>
            {" "}
            Once in the server, contact <InlineCode>Vorlie</InlineCode> to
            request an Actions API key.{" "}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <StepNumber number={3} />
          <span>
            {" "}
            Briefly mention your intended use case (e.g., project name).{" "}
          </span>
        </li>
      </ol>
      {/* ------------------------------------- */}
    </div>
  );
};

export default AuthenticationPage;
