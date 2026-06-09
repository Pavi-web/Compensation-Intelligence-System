// ============================================================
// Formatting utilities for compensation data
// ============================================================

import type { CurrencyCode } from "@/types";
import { CURRENCY_SYMBOLS } from "./constants";

/**
 * Format a number as currency.
 * Example: formatCurrency(125000, "USD") → "$125,000"
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "USD",
  compact = false
): string {
  if (compact) {
    if (amount >= 1_000_000) return `${CURRENCY_SYMBOLS[currency]}${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${CURRENCY_SYMBOLS[currency]}${(amount / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number as a percentage.
 * Example: formatPercentage(0.156) → "15.6%"
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a raw percentage number (already x100).
 * Example: formatPercentageRaw(15.6) → "15.6%"
 */
export function formatPercentageRaw(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a number with commas.
 * Example: formatNumber(1234567) → "1,234,567"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get a relative time string.
 * Example: "2 days ago", "just now"
 */
export function formatRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
