# Canvas

A modern, bleeding-edge Angular application built for performance and developer experience.

## 🚀 Tech Stack

This project leverages the latest advancements in the web ecosystem:

| Technology      | Version    | Purpose                          |
| --------------- | ---------- | -------------------------------- |
| **Angular**     | v21.0.0    | Core Framework (Bleeding Edge)   |
| **PrimeNG**     | v21.0.1    | UI Component Library             |
| **TailwindCSS** | v4.1.12    | Utility-first Styling            |
| **Vite**        | Integrated | Development Server & HMR         |
| **Esbuild**     | Integrated | Lightning-fast Production Builds |
| **Vitest**      | v4.0.8     | Next-gen Unit Testing            |
| **ESLint**      | v9.39      | Pluggable Linting Utility        |
| **Prettier**    | v3.7       | Opinionated Code Formatter       |

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- NPM (v11+)

### Installation

```bash
npm install
```

### Development Server

Run the dev server with hot module replacement (HMR):

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`.

## 📂 Project Structure

```text
.
├── angular.json
├── eslint.config.js
├── package.json
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.routes.server.ts
│   │   ├── app.routes.ts
│   │   ├── app.spec.ts
│   │   └── app.ts
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   └── styles.css
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## ✅ Quality Assurance

### Linting

This project uses **ESLint** to enforce code quality.

```bash
npm run lint
```

### Formatting

**Prettier** is configured to keep code consistent.

```bash
npm run format
```

### Testing

Unit tests are powered by **Vitest**.

```bash
npm test
```

## 🤖 Git Hooks (Husky)

We use **Husky** and **Lint-Staged** to automatically lint and format your code before every commit. This ensures that no bad code ever enters the codebase.

## 📦 Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

---

_Built with ❤️ using Angular v21_
