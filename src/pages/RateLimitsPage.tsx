// src/pages/RateLimitsPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import InlineCode from "../components/InlineCode"; // Use relative path if needed

// Optional: Icon component example (replace with actual icons from a library like Heroicons if you use one)
const InfoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const RateLimitsPage: React.FC = () => {
  return (
    <div className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold !mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">
        Rate Limiting
      </h1>

      <p className="lead text-lg text-gray-600 dark:text-gray-400">
        To ensure fair usage and maintain API stability, requests to the Vorlie
        API are subject to rate limiting.
      </p>

      {/* --- Current Limits Section --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Current Limits
      </h2>
      <p className="text-base">
        The primary rate limit is applied{" "}
        <strong className="font-semibold text-gray-900 dark:text-gray-100">
          per source IP address
        </strong>
        . The current limit is:
      </p>
      {/* Highlight the limit */}
      <div className="my-4 px-4 py-3 rounded-md bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50">
        <p className="!my-0 text-center font-medium text-blue-800 dark:text-blue-200">
          <strong className="text-xl">60</strong> requests per{" "}
          <strong className="text-xl">1</strong> minute
        </p>
      </div>
      <p className="text-base">
        This limit applies globally across all applicable endpoints.
      </p>

      {/* --- Exceeding Limit Section --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Exceeding the Limit
      </h2>
      <p className="text-base">
        If you exceed the rate limit, the API will respond with an{" "}
        <InlineCode>HTTP 429 Too Many Requests</InlineCode> status code.
      </p>
      <p className="text-base">
        When you receive a 429 error, the response will include the following
        headers to help you manage your request rate:
      </p>
      {/* Style the header list more clearly */}
      <div className="text-base !my-6 space-y-3">
        <div className="flex items-start gap-3">
          <InlineCode>Retry-After</InlineCode>
          <span className="text-gray-600 dark:text-gray-400">
            - The number of seconds to wait before making another request.
          </span>
        </div>
        <div className="flex items-start gap-3">
          <InlineCode>X-RateLimit-Limit</InlineCode>
          <span className="text-gray-600 dark:text-gray-400">
            - The maximum number of requests allowed in the time window
            (currently 60).
          </span>
        </div>
        <div className="flex items-start gap-3">
          <InlineCode>X-RateLimit-Remaining</InlineCode>
          <span className="text-gray-600 dark:text-gray-400">
            - The number of requests remaining in the current window (will be 0
            when limited).
          </span>
        </div>
        <div className="flex items-start gap-3">
          <InlineCode>X-RateLimit-Reset</InlineCode>
          <span className="text-gray-600 dark:text-gray-400">
            - The remaining time in seconds until the rate limit window resets.
          </span>
        </div>
      </div>

      {/* --- Handling Section --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Handling Rate Limits
      </h2>
      <p className="text-base">
        Your application should anticipate and handle rate limits gracefully:
      </p>
      {/* Style the handling list */}
      <ul className="text-base !my-6 !pl-0 space-y-4">
        {" "}
        <li className="flex items-start gap-3">
          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span>
            Check for a <InlineCode>429</InlineCode> status code in the
            response.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span>
            If received, read the value from the{" "}
            <InlineCode>Retry-After</InlineCode> header (indicates minimum
            seconds to wait).
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span>
            Implement an <strong>exponential backoff</strong> strategy for retrying requests
            that fail due to rate limiting. Do not simply retry immediately in a
            tight loop.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span>
            Consider <strong>caching</strong> responses where appropriate to reduce the
            number of API calls needed.
          </span>
        </li>
      </ul>
      <div className="text-base !my-6 p-4 border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30 rounded-md flex items-start gap-3">
        <InfoIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          Consistently exceeding rate limits may lead to further restrictions.
          See the{" "}
          <Link
            to="/usage-guidelines"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Usage Guidelines
          </Link>{" "}
          for more information. For details on specific error codes, see the{" "}
          <Link
            to="/status-codes"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Status Codes
          </Link>{" "}
          page.
        </div>
      </div>
    </div>
  );
};

export default RateLimitsPage;
