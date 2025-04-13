# Vorlie API Documentation

This project is a documentation site for the Vorlie API, built using React, TypeScript, and Vite. It provides an interactive and user-friendly interface for exploring API endpoints, authentication methods, and usage examples.

## Features

- **React + TypeScript**: Modern frontend development with type safety.
- **Vite**: Fast build tool with hot module replacement (HMR).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Client-side routing for a seamless navigation experience.
- **Code Examples**: Interactive code blocks for cURL, Python, and JavaScript examples.
- **Dark Mode**: Built-in support for light and dark themes.

## Project Structure

```plaintext
src/
  apiData.ts          # API endpoint definitions and metadata
  App.tsx             # Main application component
  components/         # Reusable UI components (e.g., Sidebar, CodeBlock)
  pages/              # Page components for different sections of the documentation
  main.tsx            # Application entry point
  index.css           # Global styles (includes Tailwind CSS)
public/
  icon.png            # Favicon and other public assets
```

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm (>= 7.x)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vorlie-docs.git
   cd vorlie-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Build for Production

To build the project for production:
```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Linting

Run ESLint to check for code quality issues:
```bash
npm run lint
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
