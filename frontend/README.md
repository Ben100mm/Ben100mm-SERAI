# SERAI Frontend

The frontend application for SERAI - Boutique Hotel Booking Reinvented.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Inter Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:4000](http://localhost:4000) in your browser.

### Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   └── components/         # React components
│       └── HomePage.tsx    # Main homepage component
├── public/
│   └── images/
│       └── serai-images/   # Image assets
└── package.json
```

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, modern design with glassmorphism effects
- **Hero Image** - Full-screen hero with Quebec2.jpg background
- **Translucent Buttons** - Sign Up/Sign In buttons with backdrop blur
- **Mobile Navigation** - Collapsible mobile menu
- **TypeScript** - Full type safety
- **Performance Optimized** - Next.js optimizations and lazy loading

## Image Requirements

Place the `Quebec2.jpg` image in the `public/images/serai-images/` directory. The application will fallback to a gradient background if the image is not found.

## Development Guidelines

- Follow the project's TypeScript configuration
- Use semantic color names from the theme system
- Maintain responsive design principles
- Follow the established file naming conventions
- Use functional components with hooks
