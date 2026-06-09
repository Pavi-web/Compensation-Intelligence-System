// ============================================================
// General-purpose helpers
// ============================================================

import type {
  CompensationPackage,
  FilterOptions,
  MarketDataPoint,
} from "@/types";

/**
 * Calculate the percentile rank of a value in a sorted array.
 */
export function calculatePercentile(value: number, sortedValues: number[]): number {
  if (sortedValues.length === 0) return 0;
  const below = sortedValues.filter((v) => v < value).length;
  return Math.round((below / sortedValues.length) * 100);
}

/**
 * Determine competitiveness label from percentile rank.
 */
export function getCompetitiveness(percentile: number): "below_market" | "at_market" | "above_market" {
  if (percentile < 40) return "below_market";
  if (percentile <= 65) return "at_market";
  return "above_market";
}

/**
 * Compute competitiveness badge colour.
 */
export function getCompetitivenessColor(
  competitiveness: "below_market" | "at_market" | "above_market"
): string {
  switch (competitiveness) {
    case "below_market":
      return "destructive";
    case "at_market":
      return "secondary";
    case "above_market":
      return "default";
  }
}

/**
 * Apply filter options to a list of market data points.
 */
export function filterMarketData(
  data: MarketDataPoint[],
  filters: FilterOptions
): MarketDataPoint[] {
  return data.filter((item) => {
    if (filters.jobFamily?.length && !filters.jobFamily.includes(item.jobFamily))
      return false;
    if (filters.level?.length && !filters.level.includes(item.level))
      return false;
    if (filters.location?.length && !filters.location.includes(item.location))
      return false;
    if (filters.companySize?.length && !filters.companySize.includes(item.companySize))
      return false;
    if (filters.salaryRange) {
      const median = item.baseSalary.median;
      if (median < filters.salaryRange.min || median > filters.salaryRange.max)
        return false;
    }
    return true;
  });
}

/**
 * Sort compensation packages by a given key.
 */
export function sortPackages(
  packages: CompensationPackage[],
  sortBy: "salary" | "company" | "location" | "level",
  order: "asc" | "desc" = "asc"
): CompensationPackage[] {
  const sorted = [...packages].sort((a, b) => {
    switch (sortBy) {
      case "salary":
        return a.totalCompensation - b.totalCompensation;
      case "company":
        return a.company.localeCompare(b.company);
      case "location":
        return a.location.localeCompare(b.location);
      case "level":
        return a.level.localeCompare(b.level);
    }
  });
  return order === "desc" ? sorted.reverse() : sorted;
}

/**
 * Generate a unique ID (for client-side only).
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
