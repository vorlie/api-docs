// src/pages/UsageGuidelinesPage.tsx
import React from "react";
import { Link } from "react-router-dom";

// Helper component for inline code styling
const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-gray-200 dark:bg-gray-700/80 text-gray-800 dark:text-gray-300 font-mono text-sm px-1.5 py-0.5 rounded mx-0.5">
    {" "}
    {/* Slightly more padding */}
    {children}
  </code>
);

// Simple Divider Component (Optional, if not using prose's default hr)
// const Hr = () => <hr className="my-8 border-gray-200 dark:border-gray-700" />;

const UsageGuidelinesPage: React.FC = () => {
  return (
    // Keep prose for base typography, customize elements inside
    <div className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-800 dark:text-gray-200">
      {/* --- Page Title --- */}
      <h1 className="!mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">
        {" "}
        {/* Adjusted margin, border */}
        API Usage Guidelines
      </h1>

      <p className="lead text-lg text-gray-600 dark:text-gray-400">
        {" "}
        {/* Enhanced intro paragraph */}
        Welcome! To ensure a positive experience for everyone using the Vorlie
        API, please adhere to the following guidelines, particularly when
        submitting content to the <InlineCode>/v1/actions</InlineCode> endpoint.
      </p>

      {/* --- GIF Rules Section --- */}
      <h2 className="!mt-10 !mb-5 border-b border-gray-300 dark:border-gray-700 pb-2">
        {" "}
        {/* Distinct heading */}
        GIF Submission Rules (<InlineCode>/v1/actions</InlineCode>)
      </h2>
      <p className="text-base">
        {" "}
        {/* Standard paragraph size */}
        The actions endpoints are designed to provide a shared library of
        anime-style reaction GIFs (hugs, pats, pokes, etc.) for use in community
        applications (like Discord bots). To maintain the quality and intended
        purpose of this feature, all submissions are subject to the following
        rules:
      </p>
      {/* Added background and padding to the list for emphasis */}
      <ul className="text-base !my-6 !pl-5 space-y-3 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <li>
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Content Theme:
          </strong>{" "}
          Submitted GIFs{" "}
          <strong className="text-blue-600 dark:text-blue-400">must</strong> be
          sourced from anime, manga, or closely related illustration styles.
          Real-life footage, western cartoons, or unrelated memes are not
          suitable for this endpoint.
        </li>
        <li>
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Action-Based:
          </strong>{" "}
          GIFs should clearly depict a common social action or reaction (e.g.,{" "}
          <InlineCode>hug</InlineCode>, <InlineCode>pat</InlineCode>,{" "}
          <InlineCode>poke</InlineCode>, <InlineCode>wave</InlineCode>,{" "}
          <InlineCode>smile</InlineCode>, <InlineCode>cry</InlineCode>,{" "}
          <InlineCode>blush</InlineCode>, etc.). Please use appropriate tags.
        </li>
        <li>
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Safe For Work (SFW):
          </strong>{" "}
          Absolutely{" "}
          <strong className="text-red-600 dark:text-red-400">no NSFW</strong>{" "}
          (Not Safe For Work) content is permitted. This includes explicit
          nudity, sexual content, excessive gore, or overly suggestive themes.
          Submissions should be generally appropriate for a wide audience.
        </li>
        <li>
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Quality:
          </strong>{" "}
          Please try to submit GIFs of reasonable quality. Avoid excessively
          blurry, heavily watermarked, or extremely low-resolution images.
        </li>
        <li>
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Respect Copyright:
          </strong>{" "}
          While this is a fan-based collection, ensure you are not submitting
          content in a way that maliciously infringes known copyright
          restrictions beyond typical fan use. Do not claim ownership of the
          source material.
        </li>
      </ul>

      {/* --- Enforcement Section --- */}
      <h2 className="!mt-10 !mb-5 border-b border-gray-300 dark:border-gray-700 pb-2">
        Monitoring and Enforcement
      </h2>
      {/* Added background/border to emphasize this section */}
      <div className="text-base bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-md !my-6">
        <p className="!my-0">
          {" "}
          {/* Override prose margin */}
          Please be aware that{" "}
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            all GIF submissions via the API are actively monitored
          </strong>
          . Our goal is to maintain a high-quality, SFW, and relevant collection
          of action GIFs.
        </p>
        <p className="!mt-3 !mb-0">
          {" "}
          {/* Override prose margin */}
          GIFs found to be in violation of these rules (e.g., NSFW, non-anime,
          unrelated content, poor quality){" "}
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            will be removed without notice
          </strong>
          .
        </p>
        <p className="!mt-3 !mb-0">
          {" "}
          {/* Override prose margin, ADDED IP BAN INFO */}
          Repeat violations or attempts to abuse the submission system may
          result in further action, potentially including the revocation of your
          Actions API key or{" "}
          <strong className="text-red-600 dark:text-red-500">
            blocking access from your IP address
          </strong>
          . We appreciate your cooperation in keeping this resource useful and
          appropriate!
        </p>
      </div>

      {/* --- General Usage Section --- */}
      <h2 className="!mt-10 !mb-5 border-b border-gray-300 dark:border-gray-700 pb-2">
        General API Usage
      </h2>
      <ul className="text-base !my-6 !pl-5 space-y-2">
        <li>
          Respect the{" "}
          <Link
            to="/introduction"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Rate Limits
          </Link>
          .
        </li>
        <li>
          Use the correct{" "}
          <Link
            to="/authentication"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            API Key
          </Link>{" "}
          for the endpoints you are accessing.
        </li>
        <li>
          Do not use the API for any illegal, harmful, or abusive activities.
        </li>
      </ul>

      <p className="text-base">
        If you have questions about these guidelines, please contact Vorlie on
        the Discord server mentioned in the Authentication section.
      </p>
    </div>
  );
};

export default UsageGuidelinesPage;
