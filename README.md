# Compensation Intelligence System

A cutting-edge platform for software engineers to analyze, compare, and benchmark tech salaries across India's top tech hubs. Built as a powerful Frontend Engineering project focusing on deep data visualization, performant table manipulation, and premium UI/UX design.

---

## 🚀 Live Features

- **Dashboard Hero & Metrics**: High-level overview of total companies, verified records, and average/highest compensation metrics.
- **Market Data Explorer**: A powerful data table handling 100+ simulated salary records. Includes real-time text search, multi-faceted filtering (Company, Level, Location), and dynamic multi-column sorting.
- **Compensation Trends (Analytics)**: Deep data visualization using `recharts` to identify the top paying companies, salary distributions by tier, location-based heat trends, and equity vs. base ratios.
- **Side-by-Side Comparison**: Select up to 3 individual compensation packages to generate a detailed, side-by-side comparison matrix.
- **Share & Export**: Generate shareable links for your specific salary comparisons or export the entire filtered market dataset directly to CSV.
- **Flawless Dark Mode**: A premium, visually striking aesthetic with full Light/Dark mode support avoiding SSR hydration mismatches.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & custom `oklch` CSS variables for vibrant dark mode aesthetics
- **Components**: `shadcn/ui` (Radix UI primitives)
- **Animations**: Framer Motion & native CSS micro-interactions
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Local Setup & Installation

To run this project locally on your machine:

1. **Clone the repository** (if applicable) and navigate to the project root:
   ```bash
   cd Compensation-Intelligence-System-1
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Platform**:
   Open `http://localhost:3000` (or whatever port Next.js automatically assigns) in your browser.

## 🏗 Architecture & Folder Structure

```text
src/
├── app/                  # Next.js App Router (Dashboard, Market Data, Trends, Compare)
├── components/
│   ├── charts/           # Recharts visual wrappers
│   ├── compensation/     # Highly specific domain components (Tables, Matrices)
│   ├── dashboard/        # Dashboard layout items (Stats Cards)
│   ├── layout/           # Shared structures (Navbar)
│   ├── shared/           # Reusable micro-components (Search, Filter, Empty States)
│   └── ui/               # shadcn base components
├── data/                 # Local mock datasets (salaries.json)
├── lib/                  # Utilities (formatters, helpers)
└── types/                # TypeScript strict definitions
```

## ✨ Design Decisions

- **Client-Side Processing**: Data filtering and sorting are optimized using `useMemo` hooks to ensure minimal re-renders while handling the heavy dataset arrays.
- **Staggered Animations**: We utilized Framer Motion's `staggerChildren` property to create a cascading load-in effect for the statistics cards and Recharts grid, vastly improving perceived performance.
- **Type Safety**: Strictly enforced `types/salary.ts` interfaces map exactly to the underlying JSON dataset, ensuring zero runtime data coercion errors.

---
