// src/components/CodeBlock.tsx
import React, { useState } from "react"; // Import useState
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// Import the highlight.js style you want (if not imported globally)
import "highlight.js/styles/tokyo-night-dark.css";

// --- Optional: Copy Icon Component ---
const CopyIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
  >
    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z" />
  </svg>
);
const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
  >
    <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
  </svg>
);
// ---------------------------------

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const markdown = `\`\`\`${language}\n${code}\n\`\`\``;

  return (
    <div className="code-block group relative my-0">
      {" "}
      <button
        onClick={handleCopy}
        className={`
            absolute top-2 right-2 p-1.5 rounded
            bg-gray-300/50 dark:bg-gray-700/60
            text-gray-700 dark:text-gray-300
            opacity-0 group-hover:opacity-100
            focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-opacity duration-150
            ${
              copyStatus === "copied"
                ? "text-green-600 dark:text-green-400"
                : "hover:bg-gray-400/50 dark:hover:bg-gray-600/60"
            }
          `}
        aria-label={copyStatus === "copied" ? "Copied!" : "Copy code"}
      >
        {copyStatus === "copied" ? <CheckIcon /> : <CopyIcon />}
      </button>
      {/* ----------------- */}
      {/* Apply padding to the Markdown container if needed, or let prose handle it */}
      <div className="rounded-xl overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          // Using 'pre' directly is common within ReactMarkdown for hljs
          components={{
            pre: ({ ...props }) => (
              <pre {...props} className={`hljs language-${language}`} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default CodeBlock;
