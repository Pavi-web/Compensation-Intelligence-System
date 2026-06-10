// ============================================================
// Application-wide constants
// ============================================================

import type { ExperienceLevel, JobFamily, CompanySize, CurrencyCode } from "@/types";

/** Human-readable labels for experience levels */
export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  intern: "Intern",
  junior: "Junior (0-2 yrs)",
  mid: "Mid-Level (2-5 yrs)",
  senior: "Senior (5-8 yrs)",
  staff: "Staff (8-12 yrs)",
  principal: "Principal (12+ yrs)",
  executive: "Executive",
};

/** Human-readable labels for job families */
export const JOB_FAMILY_LABELS: Record<JobFamily, string> = {
  engineering: "Engineering",
  design: "Design",
  product: "Product",
  data: "Data Science",
  marketing: "Marketing",
  sales: "Sales",
  operations: "Operations",
  finance: "Finance",
  hr: "Human Resources",
};

/** Human-readable labels for company sizes */
export const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  startup: "Startup (1-50)",
  small: "Small (51-200)",
  medium: "Medium (201-1K)",
  large: "Large (1K-5K)",
  enterprise: "Enterprise (5K+)",
};

/** Currency symbols */
export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  CAD: "C$",
  AUD: "A$",
};

/** Application metadata */
export const APP_CONFIG = {
  name: "CI",
  description: "Compensation Intelligence System",
  version: "1.0.0",
  defaultCurrency: "USD" as CurrencyCode,
  defaultPageSize: 10,
  maxComparisonItems: 4,
} as const;

/** Navigation items for the sidebar / header */
export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
  { label: "Market Data", href: "/market-data", icon: "TrendingUp" },
  { label: "Compare", href: "/compare", icon: "GitCompare" },
  { label: "Benchmarks", href: "/benchmarks", icon: "Target" },
  { label: "Trends", href: "/trends", icon: "LineChart" },
  { label: "Calculator", href: "/calculator", icon: "Calculator" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

/** Chart color palette — designed to be accessible & harmonious */
export const CHART_COLORS = [
  "hsl(221, 83%, 53%)",   // primary blue
  "hsl(262, 83%, 58%)",   // violet
  "hsl(142, 71%, 45%)",   // emerald
  "hsl(38, 92%, 50%)",    // amber
  "hsl(346, 77%, 50%)",   // rose
  "hsl(199, 89%, 48%)",   // sky
  "hsl(24, 95%, 53%)",    // orange
  "hsl(173, 80%, 40%)",   // teal
] as const;
