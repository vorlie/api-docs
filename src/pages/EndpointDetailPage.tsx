// src/pages/EndpointDetailPage.tsx
import React from "react"; // Import Fragment for Tab component
import { useParams, Navigate } from "react-router-dom";
import { Tab } from "@headlessui/react"; // Import Tab components
import { apiEndpoints, ApiEndpoint } from "../apiData";
import CodeBlock from "../components/CodeBlock";
import cn from "classnames"; // Optional utility for conditional classes

// Helper component for inline code styling
const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-mono text-sm px-1 py-0.5 rounded mx-0.5">
    {children}
  </code>
);

// Helper for Method Badge Colors
const getMethodBadgeClass = (method: ApiEndpoint["method"]) => {
  // ... (keep existing function)
  switch (method) {
    case "GET":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "POST":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "PUT":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "DELETE":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "PATCH":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

// Simple Divider Component
const Hr = () => <hr className="my-8 border-gray-200 dark:border-gray-700" />;

const EndpointDetailPage: React.FC = () => {
  const { endpointId } = useParams<{ endpointId: string }>();
  const endpoint = apiEndpoints.find((ep) => ep.id === endpointId);

  if (!endpoint) {
    return <Navigate to="/not-found" replace />; // Redirect to a not-found page
  }

  // --- Generate Example Snippets ---
  const baseUrl = "https://api.vorlie.pl";
  const examplePath = endpoint.path.replace(/:(\w+)/g, "{$1}");
  const fullUrl = `${baseUrl}${examplePath}`;
  const apiKeyPlaceholder =
    endpoint.group === "users" ? "YOUR_ADMIN_API_KEY" : "YOUR_ACTIONS_API_KEY";

  // cURL Example generation
  let curlCommand = `curl -X ${endpoint.method} '${fullUrl}' \\\n  -H 'Authorization: Bearer ${apiKeyPlaceholder}'`;
  if (endpoint.requestBody) {
    curlCommand += ` \\\n  -H 'Content-Type: application/json' \\\n  -d '${endpoint.requestBody.replace(
      /'/g,
      "'\\''"
    )}'`;
  }

  // Python Example generation
  let pythonCode = `import requests\n\nurl = "${fullUrl}"\napi_key = "${apiKeyPlaceholder}" # Replace with your actual key\n\nheaders = {\n    "Authorization": f"Bearer {api_key}"`;
  if (endpoint.requestBody)
    pythonCode += `,\n    "Content-Type": "application/json"`;
  pythonCode += `\n}\n\n`;
  if (endpoint.requestBody) {
    let bodyData = `json_body = ${endpoint.requestBody}`;
    try {
      const parsed = JSON.parse(endpoint.requestBody);
      bodyData = `json_body = ${JSON.stringify(parsed, null, 2)}`;
    } catch (e) {
      // If JSON parsing fails, fallback to original string
      console.error("Failed to parse request body JSON:", e);
      bodyData = `json_body = '''${endpoint.requestBody}'''`;
    }
    pythonCode += `${bodyData}\n\nresponse = requests.request("${endpoint.method}", url, headers=headers, json=json_body)\n`;
  } else {
    pythonCode += `response = requests.request("${endpoint.method}", url, headers=headers)\n`;
  }
  pythonCode += `\nprint(response.status_code)\nprint(response.json())`;

  // JavaScript Example generation
  let jsCode = `const url = "${fullUrl}";\nconst apiKey = "${apiKeyPlaceholder}"; // Replace with your actual key\n\nconst options = {\n  method: "${endpoint.method}",\n  headers: {\n    "Authorization": \`Bearer \${apiKey}\``;
  if (endpoint.requestBody)
    jsCode += `,\n    "Content-Type": "application/json"`;
  jsCode += `\n  }`;
  if (endpoint.requestBody)
    jsCode += `,\n  body: JSON.stringify(${endpoint.requestBody})`;
  jsCode += `\n};\n\nfetch(url, options)\n  .then(response => {\n    if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);\n    return response.json();\n  })\n  .then(data => console.log(data))\n  .catch(error => console.error('Error fetching data:', error));`;
  // -----------------------------

  const examples = [
    { id: "curl", name: "cURL", language: "bash", code: curlCommand },
    { id: "python", name: "Python", language: "python", code: pythonCode },
    {
      id: "javascript",
      name: "JavaScript",
      language: "javascript",
      code: jsCode,
    },
  ];

  return (
    <div className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-900 dark:text-gray-100">
      {/* Endpoint Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-6">
        <span
          className={`flex-shrink-0 text-sm font-mono font-bold px-2.5 py-1 rounded ${getMethodBadgeClass(
            endpoint.method
          )} mb-2 sm:mb-0`}
        >
          {endpoint.method}
        </span>
        <h1 className="text-2xl lg:text-3xl font-mono !my-0 break-all">
          {endpoint.path}
        </h1>
      </div>

      {/* Description */}
      <p className="text-base text-gray-600 dark:text-gray-400 mt-1 mb-8">
        {endpoint.description}
      </p>

      <Hr />

      {/* --- Parameters Section (Kept for Reference) --- */}
      <h2 className="text-xl lg:text-2xl font-semibold !mb-4">Parameters</h2>
      {endpoint.path.includes(":") ? (
        <div className="mb-6">
          <h3 className="text-lg font-medium !mt-0 !mb-3">Path Parameters</h3>
          <div className="overflow-x-auto">
            {/* ... (existing table structure) ... */}
            <table className="w-full text-sm">
              <thead className="text-left font-semibold border-b border-gray-300 dark:border-gray-600">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoint.path
                  .split("/")
                  .filter((p) => p.startsWith(":"))
                  .map((p) => (
                    <tr
                      key={p}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-2 pr-4 font-mono">{p.substring(1)}</td>
                      <td className="py-2 pr-4 font-mono">string</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">
                        {/* Add description */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          No path parameters required for this endpoint.
        </p>
      )}

      {/* --- Request Examples Section (Using Tabs) --- */}
      <Hr />
      <h2 className="text-xl lg:text-2xl font-semibold !mb-3">
        Request Examples
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 !mt-0 !mb-4">
        Remember to replace placeholders like{" "}
        <InlineCode>{apiKeyPlaceholder}</InlineCode> and path parameters (e.g.,{" "}
        <InlineCode>
          {examplePath.includes("{")
            ? examplePath.match(/\{(\w+)\}/)?.[0] ?? "{parameter}"
            : "{parameter}"}
        </InlineCode>
        ) with actual values.
      </p>

      <div className="w-full max-w-full px-0 pt-2">
        {" "}
        {/* Container for tabs */}
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-200 dark:bg-gray-900/40 p-1">
            {examples.map((ex) => (
              <Tab
                key={ex.id}
                className={({ selected }) =>
                  cn(
                    // Using classnames utility (npm install classnames) or just template literals
                    "w-full rounded-md py-1.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400", // Focus styling
                    selected
                      ? "bg-white dark:bg-gray-700 shadow text-blue-700 dark:text-white" // Selected tab style
                      : "text-gray-600 hover:bg-white/[0.50] dark:text-gray-400 dark:hover:bg-white/[0.12] dark:hover:text-white" // Idle tab style
                  )
                }
              >
                {ex.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {examples.map((ex) => (
              <Tab.Panel
                key={ex.id}
                className={cn(
                  "rounded-xl bg-gray-50 dark:bg-gray-800/50 p-0", // Panel background (padding removed, CodeBlock has it)
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400" // Focus styling
                )}
              >
                {/* Render CodeBlock inside the panel */}
                <CodeBlock language={ex.language} code={ex.code} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      {/* ----------------------------------------- */}

      {/* Request Body */}
      {endpoint.requestBody && (
        <>
          <Hr />
          <h2 className="text-xl lg:text-2xl font-semibold !mb-3">
            Request Body Schema
          </h2>
          <CodeBlock language="json" code={endpoint.requestBody} />
        </>
      )}

      {/* Response Body */}
      {endpoint.responseBody && (
        <>
          <Hr />
          <h2 className="text-xl lg:text-2xl font-semibold !mb-3">
            Response Body Example
          </h2>
          <CodeBlock language="json" code={endpoint.responseBody} />
        </>
      )}

      {/* Explanation / Field Descriptions */}
      {endpoint.explanation && endpoint.explanation.length > 0 && (
        <>
          <Hr />
          <h2 className="text-xl lg:text-2xl font-semibold !mb-4">
            Field Descriptions
          </h2>
          {/* ... (existing explanation list) ... */}
          <ul className="!my-0 !pl-0 space-y-2">
            {endpoint.explanation.map((item, index) => (
              <li key={index} className="text-sm">
                <InlineCode>{item.field}</InlineCode>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Response Codes */}
      {endpoint.responseCodes && endpoint.responseCodes.length > 0 && (
        <>
          <Hr />
          <h2 className="text-xl lg:text-2xl font-semibold !mb-4">
            Response Codes
          </h2>
          {/* ... (existing response code list) ... */}
          <ul className="!my-0 !pl-0 space-y-2">
            {endpoint.responseCodes.map((item, index) => (
              <li key={index} className="text-sm flex items-center gap-3">
                <strong
                  className={`font-semibold font-mono px-1.5 py-0.5 rounded text-xs ${
                    item.success
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400"
                  }`}
                >
                  {item.code}
                </strong>
                <span className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EndpointDetailPage;
