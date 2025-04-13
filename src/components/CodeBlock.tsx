// src/components/CodeBlock.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/tokyo-night-dark.css";
// --------------------------------------------

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const markdown = `\`\`\`${language}\n${code}\n\`\`\``;

  return (
    <div className="code-block my-4">
      {" "}
      <div className="rounded-xl overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default CodeBlock;
