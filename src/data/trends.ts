// ============================================================
// Mock trend data — historical compensation trends
// ============================================================

import type { CompensationTrend } from "@/types";

export const compensationTrends: CompensationTrend[] = [
  {
    jobTitle: "Frontend Engineer",
    jobFamily: "engineering",
    level: "senior",
    location: "San Francisco, CA",
    dataPoints: [
      { period: "2023-Q1", averageSalary: 165000, medianSalary: 160000, growthRate: 0, sampleSize: 310 },
      { period: "2023-Q2", averageSalary: 168000, medianSalary: 163000, growthRate: 1.8, sampleSize: 325 },
      { period: "2023-Q3", averageSalary: 172000, medianSalary: 167000, growthRate: 2.5, sampleSize: 340 },
      { period: "2023-Q4", averageSalary: 175000, medianSalary: 170000, growthRate: 1.8, sampleSize: 355 },
      { period: "2024-Q1", averageSalary: 180000, medianSalary: 175000, growthRate: 2.9, sampleSize: 370 },
      { period: "2024-Q2", averageSalary: 185000, medianSalary: 180000, growthRate: 2.8, sampleSize: 385 },
      { period: "2024-Q3", averageSalary: 190000, medianSalary: 185000, growthRate: 2.7, sampleSize: 395 },
      { period: "2024-Q4", averageSalary: 195000, medianSalary: 190000, growthRate: 2.6, sampleSize: 410 },
      { period: "2025-Q1", averageSalary: 198000, medianSalary: 193000, growthRate: 1.6, sampleSize: 420 },
      { period: "2025-Q2", averageSalary: 200000, medianSalary: 195000, growthRate: 1.0, sampleSize: 415 },
    ],
    overallGrowth: 21.2,
  },
  {
    jobTitle: "Backend Engineer",
    jobFamily: "engineering",
    level: "senior",
    location: "New York, NY",
    dataPoints: [
      { period: "2023-Q1", averageSalary: 160000, medianSalary: 155000, growthRate: 0, sampleSize: 280 },
      { period: "2023-Q2", averageSalary: 163000, medianSalary: 158000, growthRate: 1.9, sampleSize: 290 },
      { period: "2023-Q3", averageSalary: 167000, medianSalary: 162000, growthRate: 2.5, sampleSize: 300 },
      { period: "2023-Q4", averageSalary: 170000, medianSalary: 165000, growthRate: 1.8, sampleSize: 315 },
      { period: "2024-Q1", averageSalary: 175000, medianSalary: 170000, growthRate: 2.9, sampleSize: 330 },
      { period: "2024-Q2", averageSalary: 180000, medianSalary: 175000, growthRate: 2.9, sampleSize: 345 },
      { period: "2024-Q3", averageSalary: 185000, medianSalary: 180000, growthRate: 2.8, sampleSize: 355 },
      { period: "2024-Q4", averageSalary: 190000, medianSalary: 185000, growthRate: 2.7, sampleSize: 370 },
      { period: "2025-Q1", averageSalary: 193000, medianSalary: 188000, growthRate: 1.6, sampleSize: 380 },
      { period: "2025-Q2", averageSalary: 195000, medianSalary: 190000, growthRate: 1.0, sampleSize: 389 },
    ],
    overallGrowth: 21.9,
  },
  {
    jobTitle: "Product Designer",
    jobFamily: "design",
    level: "senior",
    location: "San Francisco, CA",
    dataPoints: [
      { period: "2023-Q1", averageSalary: 140000, medianSalary: 135000, growthRate: 0, sampleSize: 150 },
      { period: "2023-Q2", averageSalary: 143000, medianSalary: 138000, growthRate: 2.1, sampleSize: 155 },
      { period: "2023-Q3", averageSalary: 148000, medianSalary: 143000, growthRate: 3.5, sampleSize: 162 },
      { period: "2023-Q4", averageSalary: 152000, medianSalary: 147000, growthRate: 2.7, sampleSize: 170 },
      { period: "2024-Q1", averageSalary: 158000, medianSalary: 153000, growthRate: 3.9, sampleSize: 175 },
      { period: "2024-Q2", averageSalary: 162000, medianSalary: 157000, growthRate: 2.5, sampleSize: 180 },
      { period: "2024-Q3", averageSalary: 167000, medianSalary: 162000, growthRate: 3.1, sampleSize: 188 },
      { period: "2024-Q4", averageSalary: 172000, medianSalary: 167000, growthRate: 3.0, sampleSize: 192 },
      { period: "2025-Q1", averageSalary: 175000, medianSalary: 170000, growthRate: 1.7, sampleSize: 196 },
      { period: "2025-Q2", averageSalary: 177000, medianSalary: 172000, growthRate: 1.1, sampleSize: 198 },
    ],
    overallGrowth: 26.4,
  },
  {
    jobTitle: "Data Scientist",
    jobFamily: "data",
    level: "mid",
    location: "New York, NY",
    dataPoints: [
      { period: "2023-Q1", averageSalary: 125000, medianSalary: 120000, growthRate: 0, sampleSize: 200 },
      { period: "2023-Q2", averageSalary: 128000, medianSalary: 123000, growthRate: 2.4, sampleSize: 208 },
      { period: "2023-Q3", averageSalary: 132000, medianSalary: 127000, growthRate: 3.1, sampleSize: 215 },
      { period: "2023-Q4", averageSalary: 136000, medianSalary: 131000, growthRate: 3.0, sampleSize: 222 },
      { period: "2024-Q1", averageSalary: 140000, medianSalary: 135000, growthRate: 2.9, sampleSize: 228 },
      { period: "2024-Q2", averageSalary: 143000, medianSalary: 138000, growthRate: 2.1, sampleSize: 232 },
      { period: "2024-Q3", averageSalary: 147000, medianSalary: 142000, growthRate: 2.8, sampleSize: 238 },
      { period: "2024-Q4", averageSalary: 150000, medianSalary: 145000, growthRate: 2.0, sampleSize: 242 },
      { period: "2025-Q1", averageSalary: 153000, medianSalary: 148000, growthRate: 2.0, sampleSize: 244 },
      { period: "2025-Q2", averageSalary: 155000, medianSalary: 150000, growthRate: 1.3, sampleSize: 245 },
    ],
    overallGrowth: 24.0,
  },
];
