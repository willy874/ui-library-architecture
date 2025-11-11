# UI Library Architecture

A modern, scalable UI library monorepo built with TypeScript, featuring React components and comprehensive development tools.

## 🏗️ Architecture

This project is structured as a monorepo using pnpm workspaces, containing:

- **Packages**: Core UI libraries and utilities
- **Apps**: Development and preview applications

### Packages

- `@ui-library-architecture/builder-base` - Build tools and configurations
- `@ui-library-architecture/eslint-config` - Shared ESLint configuration
- `@ui-library-architecture/lodash` - Utility functions
- `@ui-library-architecture/rollup-plugin-svgr` - SVG handling plugin
- `@ui-library-architecture/anatomy` - Component anatomy and structure definitions
- `@ui-library-architecture/utils` - Shared utilities
- `@ui-library-architecture/react` - React UI component library with TypeScript
- `@ui-library-architecture/vue` - Vue UI components (future)

### Apps

- `react-vite` - Vite development setup
- `react-preview` - Storybook development environment for React components
- `next` - Next.js integration example
- `vue-preview` - Vue components preview
- `vue-vite` - Vue Vite setup
- `nuxt` - Nuxt.js integration example

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.12.1

### Installation

```bash
# Install dependencies
pnpm install

# Setup development environment
pnpm setup:dev
```

### Development

```bash
# Build packages
pnpm pkg:build

# Start Storybook for React components
cd apps/react-preview
pnpm dev
```

## 🛠️ Tech Stack

- **Framework**: React 18+, Vue 3 (planned)
- **Build Tool**: Vite with Rolldown
- **Styling**: Panda CSS
- **State Management**: Zag.js
- **TypeScript**: Full TypeScript support
- **Testing**: Vitest with Browser testing
- **Documentation**: Storybook
- **Package Manager**: pnpm with workspaces

## 📦 React Library Features

The React package (`@ui-library-architecture/react`) includes:

- 🎨 **Design System**: Built with Panda CSS for scalable styling
- 🔧 **Component Logic**: Powered by Zag.js for robust state management
- 📱 **Accessibility**: Built-in a11y support
- 🎯 **TypeScript**: Full type safety
- 🚀 **Performance**: Optimized bundle size
- 📖 **Documentation**: Comprehensive Storybook stories

### Component Architecture

Components follow atomic design principles with:

- Global variables and tokens
- Portal rendering capabilities
- Field components with optimized performance
- Button variants with dynamic styling

## 🔧 Development Scripts

```bash
# Setup environments
pnpm setup:dev      # Development setup
pnpm setup:prod     # Production setup

# Package management
pnpm pkg:build      # Build all packages
pnpm pkg:watch      # Watch and rebuild packages

# Maintenance
pnpm reinstall      # Clean reinstall of dependencies
```

## 📁 Project Structure

```
ui-library-architecture/
├── packages/
│   ├── react/           # React UI library
│   ├── anatomy/         # Component definitions
│   ├── builder-base/    # Build configurations
│   ├── eslint-config/   # ESLint rules
│   ├── lodash/          # Utilities
│   └── ...
├── apps/
│   ├── react-preview/   # Storybook for React
│   ├── react-vite/      # Vite React setup
│   └── ...
└── scripts/             # Build and setup scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

ISC

## 👤 Author

Willy Bamboo
