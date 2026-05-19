# DirectIPTV Frontend Platform

Welcome to the frontend repository for DirectIPTV. This application is built using a modern React & Vite stack designed for high performance, maintainability, and scale.

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
src/
├── AdminPages/       # Admin dashboard views and components
├── components/       # Reusable UI components (Navbar, Footer, Preloader, etc.)
├── context/          # React Context providers (PricingContext)
├── hooks/            # Custom React hooks
├── pages/            # Main application pages
│   └── tutorials/    # Sub-pages for device setup guides
├── App.tsx           # Root component and routing
├── main.tsx          # Application entry point
└── index.css         # Global stylesheets and Tailwind directives
```

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The built assets will be output to the `dist` directory. To preview the production build locally:

```bash
npm run preview
```

## Key Features

- **Dynamic Preloader**: Custom animated preloader introducing the brand.
- **Responsive Design**: Mobile-first architecture scaling seamlessly up to 4K displays.
- **Lazy Loading**: Route-based code splitting for optimal initial payload time.
- **Admin Dashboard**: Built-in administrative views for managing users, promo codes, and metrics.
- **Interactive UI**: Fluid motion and transitions using Framer Motion.

## License

Proprietary Software. All rights reserved. Do not distribute without permission.
