# Next-IMS

Project/Inventory Management System built with Next.js, Clerk authentication, and Convex backend.

## About

A comprehensive management system for tracking projects, inventory, and tasks. Features authentication via Clerk and real-time database with Convex.

## Tech Stack

- Next.js 14
- React 18
- Clerk (authentication)
- Convex (real-time database)
- Radix UI (headless components)
- Tailwind CSS
- Zustand (state management)
- React Resizable Panels
- React To Print

## Features

- **Authentication** - Clerk-based auth with multiple providers
- **Real-time Data** - Convex backend for live updates
- **Project Management** - Track projects and tasks
- **Print Support** - Generate printable documents
- **Responsive Layout** - Resizable panels
- **Dark Mode** - Theme support

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Project Structure

```
app/                       # Next.js App Router
├── (auth)/               # Authentication pages
├── (dashboard)/          # Protected dashboard pages
├── layout.tsx            # Root layout
└── globals.css           # Global styles
components/               # Reusable components
├── ui/                   # Radix UI components
├── layout/               # Layout components
└── features/             # Feature components
convex/                   # Convex schema and functions
lib/                      # Utility functions
store/                    # Zustand stores
```

## Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret
CONVEX_DEPLOYMENT=your-convex-deployment
```
