// ============================================================
// Salary Record — Type definitions for compensation data
// ============================================================

/** FAANG + Netflix company names */
export type Company =
  | "Google"
  | "Microsoft"
  | "Amazon"
  | "Meta"
  | "Apple"
  | "Netflix";

/** Engineering levels */
export type Level = "L3" | "L4" | "L5";

/** Office locations (India) */
export type Location =
  | "Bangalore"
  | "Hyderabad"
  | "Chennai"
  | "Pune";

/** A single salary record */
export interface SalaryRecord {
  id: string;
  company: Company;
  role: string;
  level: Level;
  location: Location;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
}
