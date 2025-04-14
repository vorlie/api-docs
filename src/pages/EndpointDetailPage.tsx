// src/pages/EndpointDetailPage.tsx
import React from "react"; // Import Fragment for Tab component
import { useParams, Navigate, Link } from "react-router-dom";
import { Tab } from "@headlessui/react"; // Import Tab components

import CodeBlock from "../components/CodeBlock";
import ParameterTable from "../components/ParameterTable"; // Table for displaying parameters
// import InlineCode from "../components/InlineCode"; // Helper component for inline code styling

import { apiEndpoints } from "../utils/apiData";
import getMethodBadgeClass from "../utils/GetMethodBadgeClass"; // Helper for Method Badge Colors

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
  // Determine if auth is needed FOR EXAMPLES
  const needsAuthExample = endpoint.requiresAuth !== false; // True if requiresAuth is true or undefined

  // Define apiKeyPlaceholder only if needed
  const apiKeyPlaceholder = needsAuthExample
    ? endpoint.group === "users" ||
      (endpoint.id === "delete-action" && endpoint.group === "actions")
      ? "YOUR_ADMIN_API_KEY"
      : "YOUR_ACTIONS_API_KEY"
    : ""; // Empty if not needed

  // cURL Example generation
  let curlCommand = `curl -X ${endpoint.method} '${fullUrl}'`;
  if (needsAuthExample) {
    curlCommand += ` \\\n  -H 'Authorization: Bearer ${apiKeyPlaceholder}'`; // Conditionally add Auth
  }
  if (endpoint.requestBody) {
    curlCommand += ` \\\n  -H 'Content-Type: application/json' \\\n  -d '${endpoint.requestBody.replace(
      /'/g,
      "'\\''"
    )}'`;
  }

  // Python Example generation
  let pythonCode = `import requests\n\nurl = "${fullUrl}"\n`;
  let pythonHeaders = "{";
  if (needsAuthExample) {
    pythonCode += `api_key = "${apiKeyPlaceholder}" # Replace with your actual key\n`;
    pythonHeaders += `\n    "Authorization": f"Bearer {api_key}"`;
  }
  if (endpoint.requestBody) {
    if (needsAuthExample) pythonHeaders += ","; // Add comma if Auth header was added
    pythonHeaders += `\n    "Content-Type": "application/json"`;
  }
  pythonHeaders += pythonHeaders === "{" ? "" : "\n}"; // Close headers dict only if not empty
  pythonCode += `\nheaders = ${pythonHeaders || "{}"}\n\n`; // Add headers dict (or empty dict)

  if (endpoint.requestBody) {
    let bodyData = `json_body = ${endpoint.requestBody}`;
    try {
      const parsed = JSON.parse(endpoint.requestBody);
      bodyData = `json_body = ${JSON.stringify(parsed, null, 2)}`;
    } catch (e) {
      // If JSON parsing fails, fall back to original string
      console.error("Failed to parse JSON body:", e);
      bodyData = `json_body = '''${endpoint.requestBody}'''`;
    }
    pythonCode += `${bodyData}\n\nresponse = requests.request("${endpoint.method}", url, headers=headers, json=json_body)\n`;
  } else {
    pythonCode += `response = requests.request("${endpoint.method}", url, headers=headers)\n`;
  }
  pythonCode += `\nprint(response.status_code)\nprint(response.json())`;

  // JavaScript Example generation
  let jsCode = `const url = "${fullUrl}";\n`;
  if (needsAuthExample) {
    jsCode += `const apiKey = "${apiKeyPlaceholder}"; // Replace with your actual key\n`;
  }
  jsCode += `\nconst options = {\n  method: "${endpoint.method}",\n`;
  let jsHeaders = "";
  if (needsAuthExample) {
    jsHeaders += `\n    "Authorization": \`Bearer \${apiKey}\``;
  }
  if (endpoint.requestBody) {
    if (needsAuthExample) jsHeaders += ","; // Add comma if Auth header was added
    jsHeaders += `\n    "Content-Type": "application/json"`;
  }
  if (jsHeaders !== "") {
    // Only add headers object if there are headers
    jsCode += `  headers: {${jsHeaders}\n  },\n`;
  } else {
    jsCode += `  headers: {},\n`; // Add empty headers object if none
  }
  if (endpoint.requestBody) {
    jsCode += `  body: JSON.stringify(${endpoint.requestBody})\n`;
  } else {
    // Remove trailing comma if no body
    jsCode = jsCode.replace(/,\n$/, "\n");
  }
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
  const placeholderText = needsAuthExample
    ? `Remember to replace placeholders like <InlineCode>${apiKeyPlaceholder}</InlineCode> and path parameters.`
    : `Remember to replace path parameters (e.g., <InlineCode>{tag}</InlineCode>) if needed.`;

  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Endpoint Title Section */}
      <div className="flex flex-row flex-wrap items-baseline gap-x-3 gap-y-1 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <span
          className={`
            w-fit
            flex-shrink-0 text-sm font-mono font-bold px-2.5 py-1 rounded
            ${getMethodBadgeClass(endpoint.method)}
            /* Removed mb-2 sm:mb-0 and self-start */
          `}
        >
          {endpoint.method}
        </span>
        <h1 className="text-xl lg:text-2xl font-semibold font-mono !my-0 break-all text-gray-800 dark:text-gray-200">
          {endpoint.path}
        </h1>
      </div>
      {/* Description */}
      <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1 mb-8">
        {endpoint.description}
      </p>
      {/* Two Column Layout (Large Screens) */}
      <div className="lg:flex lg:gap-8 xl:gap-12">
        {/* Left Column (Content Flow) */}
        <div className="lg:w-2/3 min-w-0">
          {" "}
          {/* min-w-0 prevents flex overflow */}
          {/* Parameters Section */}
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Parameters
          </h2>
          <ParameterTable
            title="Path Parameters"
            parameters={endpoint.pathParameters}
          />
          <ParameterTable
            title="Query Parameters"
            parameters={endpoint.queryParameters}
            caption="Parameters appended to the URL after '?'."
          />
          <ParameterTable
            title="Request Headers"
            parameters={endpoint.requestHeaders}
          />
          {/* Request Body */}
          {endpoint.requestBodySchema && ( // Check if schema exists
            <>
              <Hr />
              <ParameterTable
                title="Request Body Schema"
                parameters={endpoint.requestBodySchema}
              />
              {/* ----------------------------------------------------- */}
            </>
          )}
          {/* Response Information */}
          <Hr />
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Responses
          </h2>
          {/* Explanation / Field Descriptions */}
          {endpoint.responseFieldDescriptions &&
            endpoint.responseFieldDescriptions.length > 0 && (
              <div className="mb-6">
                {/* Use ParameterTable to display the response schema details */}
                <ParameterTable
                  title="Response Field Descriptions"
                  parameters={endpoint.responseFieldDescriptions}
                />
              </div>
            )}
          {/* Response Body Example */}
          {endpoint.responseBody && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Body Example</h3>
              <CodeBlock language="json" code={endpoint.responseBody} />
            </div>
          )}
          {/* Response Codes */}
          {endpoint.responseCodes && endpoint.responseCodes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Status Codes</h3>
              <ul className="!my-0 !pl-0 space-y-2">
                {endpoint.responseCodes.map((item) => (
                  <li
                    key={item.code}
                    className="text-sm flex items-center gap-3"
                  >
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
              <Link to="/errors" className="text-blue-600 hover:underline">
                Error Reference
              </Link>
            </div>
          )}
        </div>
        {/* End Left Column */}
        {/* Right Column (Examples - Sticky) */}
        <div className="lg:w-2/3 mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Request Examples
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 !mt-0 !mb-4" dangerouslySetInnerHTML={{ __html: placeholderText.replace(/<InlineCode>(.*?)<\/InlineCode>/g, '<code class="bg-gray-200 dark:bg-gray-700/80 text-gray-800 dark:text-gray-300 font-mono text-[0.875em] px-1.5 py-0.5 rounded mx-0.5">$1</code>')}}>
            </p>
            <div className="w-full max-w-full px-0">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-lg bg-gray-200 dark:bg-gray-900/40 p-1">
                  {examples.map((ex) => (
                    <Tab
                      key={ex.id}
                      // --- CORRECTED className logic ---
                      className={({ selected }) =>
                        `w-full rounded-md py-1.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                          // Base and focus classes
                          selected
                            ? "bg-white dark:bg-gray-700 shadow text-blue-700 dark:text-white" // Selected classes
                            : "text-gray-600 hover:bg-white/[0.50] dark:text-gray-400 dark:hover:bg-white/[0.12] dark:hover:text-white" // Idle classes
                        }`
                      }
                      // ---------------------------------
                    >
                      {ex.name}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {examples.map((ex) => (
                    <Tab.Panel
                      key={ex.id}
                      className={
                        "rounded-xl bg-gray-50 dark:bg-gray-800/50 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      }
                    >
                      <CodeBlock language={ex.language} code={ex.code} />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>{" "}
        {/* End Right Column */}
      </div>{" "}
      {/* End Two Column Layout */}
    </div> // End Main Wrapper
  );
};

export default EndpointDetailPage;
