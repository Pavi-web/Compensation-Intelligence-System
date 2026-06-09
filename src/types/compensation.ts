// ============================================================
// Compensation Intelligence System — Core Type Definitions
// ============================================================

/** Supported currency codes */
export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "CAD" | "AUD";

/** Experience level bands */
export type ExperienceLevel =
  | "intern"
  | "junior"
  | "mid"
  | "senior"
  | "staff"
  | "principal"
  | "executive";

/** Job family categories */
export type JobFamily =
  | "engineering"
  | "design"
  | "product"
  | "data"
  | "marketing"
  | "sales"
  | "operations"
  | "finance"
  | "hr";

/** Company size buckets */
export type CompanySize =
  | "startup"    // 1-50
  | "small"      // 51-200
  | "medium"     // 201-1000
  | "large"      // 1001-5000
  | "enterprise"; // 5000+

// -----------------------------------------------------------
// Market data & salary benchmarks
// -----------------------------------------------------------

export interface SalaryRange {
  min: number;
  median: number;
  max: number;
  p25: number;
  p75: number;
  p90: number;
  currency: CurrencyCode;
}

export interface MarketDataPoint {
  id: string;
  jobTitle: string;
  jobFamily: JobFamily;
  level: ExperienceLevel;
  location: string;
  companySize: CompanySize;
  baseSalary: SalaryRange;
  totalCompensation: SalaryRange;
  sampleSize: number;
  lastUpdated: string;          // ISO 8601
  source: string;
}

// -----------------------------------------------------------
// Equity & benefits
// -----------------------------------------------------------

export interface EquityGrant {
  type: "rsu" | "options" | "espp";
  vestingSchedule: string;       // e.g. "4-year / 1-year cliff"
  totalShares: number;
  currentValue: number;
  currency: CurrencyCode;
}

export interface BenefitsPackage {
  healthInsurance: boolean;
  dentalVision: boolean;
  retirement401k: boolean;
  retirementMatch: string;       // e.g. "6%"
  paidTimeOff: number;           // days
  remoteWork: "full" | "hybrid" | "office";
  signingBonus: number;
  relocationAssistance: boolean;
  stockOptions: boolean;
  performanceBonus: string;      // e.g. "10-20%"
}

// -----------------------------------------------------------
// Compensation package (aggregate)
// -----------------------------------------------------------

export interface CompensationPackage {
  id: string;
  jobTitle: string;
  jobFamily: JobFamily;
  level: ExperienceLevel;
  company: string;
  location: string;
  baseSalary: number;
  bonus: number;
  equity: EquityGrant | null;
  benefits: BenefitsPackage;
  totalCompensation: number;
  currency: CurrencyCode;
  effectiveDate: string;         // ISO 8601
}

// -----------------------------------------------------------
// Comparison & benchmarking
// -----------------------------------------------------------

export interface ComparisonResult {
  packageA: CompensationPackage;
  packageB: CompensationPackage;
  differences: {
    baseSalary: number;
    bonus: number;
    equity: number;
    totalCompensation: number;
    percentageDiff: number;
  };
}

export interface BenchmarkResult {
  package: CompensationPackage;
  marketData: MarketDataPoint;
  percentile: number;
  competitiveness: "below_market" | "at_market" | "above_market";
  recommendation: string;
}

// -----------------------------------------------------------
// Trend & analytics
// -----------------------------------------------------------

export interface TrendDataPoint {
  period: string;               // e.g. "2024-Q1"
  averageSalary: number;
  medianSalary: number;
  growthRate: number;            // percentage
  sampleSize: number;
}

export interface CompensationTrend {
  jobTitle: string;
  jobFamily: JobFamily;
  level: ExperienceLevel;
  location: string;
  dataPoints: TrendDataPoint[];
  overallGrowth: number;        // percentage over full period
}

// -----------------------------------------------------------
// Filters & search
// -----------------------------------------------------------

export interface FilterOptions {
  jobFamily?: JobFamily[];
  level?: ExperienceLevel[];
  location?: string[];
  companySize?: CompanySize[];
  salaryRange?: { min: number; max: number };
  currency?: CurrencyCode;
}

export interface SearchParams {
  query: string;
  filters: FilterOptions;
  sortBy: "salary" | "company" | "location" | "level";
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
}

// -----------------------------------------------------------
// Dashboard metrics
// -----------------------------------------------------------

export interface DashboardMetrics {
  totalPackages: number;
  averageBaseSalary: number;
  medianTotalComp: number;
  topPayingCompany: string;
  salaryGrowthYoY: number;      // percentage
  marketCompetitiveness: number; // 0–100 score
}

// -----------------------------------------------------------
// Chart / visualisation helpers
// -----------------------------------------------------------

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
  color?: string;
}

export interface ChartConfig {
  title: string;
  type: "bar" | "line" | "pie" | "area" | "scatter" | "radar";
  data: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}
