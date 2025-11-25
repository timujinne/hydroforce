<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Hydroforce Engineering

[![CI Pipeline](https://github.com/timujinne/hydroforce/actions/workflows/ci.yml/badge.svg)](https://github.com/timujinne/hydroforce/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/timujinne/hydroforce/actions/workflows/deploy.yml/badge.svg)](https://github.com/timujinne/hydroforce/actions/workflows/deploy.yml)

Modern React SPA for Hydroforce Engineering - a company specializing in hydraulic cylinders, motors, and precision metal manufacturing.

## 🚀 Quick Start

**Prerequisites:** Node.js 18+ and npm

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment (optional):**

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your GEMINI_API_KEY
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

### Development

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

### Testing

- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report

### Code Quality

- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint + Prettier

## 🧪 Testing

Tests are located in the `__tests__/` directory and use Vitest with React Testing Library.

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

Coverage thresholds:

- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Continuous Integration (CI)

Runs on every push and pull request:

- ✅ Code formatting check (Prettier)
- ✅ Linting (ESLint)
- ✅ Type checking (TypeScript)
- ✅ Unit tests (Vitest)
- ✅ Build verification
- ✅ Coverage reporting

### Continuous Deployment (CD)

Automatically deploys to GitHub Pages on push to `main` branch.

See [CI-CD-PROPOSAL.md](CI-CD-PROPOSAL.md) for detailed documentation.

## 📚 Documentation

- [CI/CD Proposal](CI-CD-PROPOSAL.md) - Complete CI/CD setup documentation
- [Deployment Guide](.github/DEPLOYMENT.md) - How to deploy the application
- [AI Studio App](https://ai.studio/apps/drive/1nBP0XWTgKgZQlhDns9MkKHc773t5R1qE) - Original AI Studio project

## 🚢 Deployment

### GitHub Pages

Automatic deployment on push to `main`:

1. Ensure GitHub Pages is enabled in repository settings
2. Push to `main` branch
3. GitHub Actions will automatically build and deploy

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

See [Deployment Guide](.github/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

All PRs must pass CI checks before merging.

## 📄 License

© 2025 Hydroforce Engineering. All rights reserved.

## 🔗 Links

- [Website](https://www.hydroforce.ee)
- [Facebook](https://www.facebook.com/profile.php?id=61569990287623)
- [LinkedIn](https://www.linkedin.com/company/hydroforce-engineering/)

## 📞 Contact

**Hydroforce Engineering**

- Address: Valge 13, Tallinn, 11415, Estonia
- Phone: +372 5669 94 64
- Email: office@hydroforce.ee
