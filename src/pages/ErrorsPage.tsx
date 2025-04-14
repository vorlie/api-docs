// src/pages/ErrorsPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import InlineCode from "../components/InlineCode";

const ErrorEntry: React.FC<{
  code: number;
  title: string;
  children: React.ReactNode;
}> = ({ code, title, children }) => {
  const isError = code >= 400;
  const bgColor = isError
    ? "bg-red-50 dark:bg-red-900/30"
    : "bg-green-50 dark:bg-green-900/30";
  const borderColor = isError
    ? "border-red-400 dark:border-red-600"
    : "border-green-400 dark:border-green-600";
  const codeColor = isError
    ? "text-red-700 dark:text-red-300"
    : "text-green-700 dark:text-green-400";

  return (
    <div
      className={`!my-6 border-l-4 p-4 rounded-md ${bgColor} ${borderColor}`}
    >
      <h3 className={`!mt-0 !mb-2 font-semibold text-lg ${codeColor}`}>
        <InlineCode>{code}</InlineCode> - {title}
      </h3>
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
        {children}
      </div>
    </div>
  );
};

const ErrorsPage: React.FC = () => {
  return (
    // Using prose for overall text flow, but styling entries specifically
    <div className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold !mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">
        Status & Error Codes
      </h1>

      <p className="lead text-lg text-gray-600 dark:text-gray-400">
        The Vorlie API uses standard HTTP status codes to indicate the success
        or failure of API requests. Generally, codes in the{" "}
        <InlineCode>2xx</InlineCode> range indicate success,{" "}
        <InlineCode>4xx</InlineCode> range indicate a client-side error (like
        invalid input or permissions), and <InlineCode>5xx</InlineCode> range
        indicate a server-side problem.
      </p>

      {/* --- Success Codes (2xx) --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-5 border-b border-gray-300 dark:border-gray-700 pb-2">
        Success Codes
      </h2>

      <ErrorEntry code={200} title="OK">
        <p>
          The request was successful. Typically returned for successful{" "}
          <InlineCode>GET</InlineCode>, <InlineCode>DELETE</InlineCode>, or
          sometimes <InlineCode>PUT</InlineCode> operations.
        </p>
      </ErrorEntry>

      <ErrorEntry code={201} title="Created">
        <p>
          The resource was successfully created. Typically returned for
          successful <InlineCode>PUT /v1/actions</InlineCode> requests when
          adding a new GIF.
        </p>
      </ErrorEntry>

      {/* --- Client Errors (4xx) --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-5 border-b border-gray-300 dark:border-gray-700 pb-2">
        Client Error Codes
      </h2>

      <ErrorEntry code={400} title="Bad Request">
        <p>
          The server could not process the request due to invalid syntax or
          missing required parameters/fields in the request body.
        </p>
        <p>
          <strong>Action:</strong> Check your request path, headers, and body
          against the documentation for the specific endpoint.
        </p>
      </ErrorEntry>

      <ErrorEntry code={401} title="Unauthorized">
        <p>
          Authentication failed. The request lacks a valid API key, or the
          provided key is incorrect or inactive.
        </p>
        <p>
          <strong>Action:</strong> Ensure you are providing a valid API key in
          the <InlineCode>Authorization: Bearer YOUR_API_KEY</InlineCode>{" "}
          header. Refer to the{" "}
          <Link
            to="/authentication"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Authentication
          </Link>{" "}
          page.
        </p>
      </ErrorEntry>

      <ErrorEntry code={403} title="Forbidden">
        <p>
          Authentication succeeded, but the authenticated user/key does not have
          permission to access the requested resource, OR your IP address may be
          blocked.
        </p>
        <p>
          <strong>Action:</strong> Verify you are using the correct key type
          (e.g., Admin vs Actions key) for the endpoint. If you suspect an IP
          block, contact support.
        </p>
      </ErrorEntry>

      <ErrorEntry code={404} title="Not Found">
        <p>
          The requested resource (e.g., a specific user ID, GIF ID, tag, or even
          the endpoint path itself) could not be found.
        </p>
        <p>
          <strong>Action:</strong> Double-check the ID, tag, or path in your
          request URL.
        </p>
      </ErrorEntry>

      <ErrorEntry code={429} title="Too Many Requests">
        <p>You have exceeded the allowed request rate limit.</p>
        <p>
          <strong>Action:</strong> Check the{" "}
          <InlineCode>Retry-After</InlineCode> header in the response to see how
          many seconds to wait before making another request. Refer to the Rate
          Limiting section on the{" "}
          <Link
            to="/rate-limits"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Rate Limits
          </Link>{" "}
          page.
        </p>
      </ErrorEntry>

      {/* --- Server Errors (5xx) --- */}
      <h2 className="text-2xl font-semibold !mt-10 !mb-5 border-b border-gray-300 dark:border-gray-700 pb-2">
        Server Error Codes
      </h2>

      <ErrorEntry code={500} title="Internal Server Error">
        <p>
          Something went wrong on our server while processing your request. This
          is usually unexpected and indicates a problem on our end.
        </p>
        <p>
          <strong>Action:</strong> Please try your request again after a short
          wait. If the problem persists, contact support via the Discord server
          and provide the <strong>Ray ID</strong> (<InlineCode>cf-ray</InlineCode> header)
          from the failed request if possible. This helps us investigate.
        </p>
      </ErrorEntry>
    </div>
  );
};

export default ErrorsPage;
