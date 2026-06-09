"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SearchBar } from "@/components/shared/SearchBar";
import { FilterSidebar } from "@/components/shared/FilterSidebar";
import { SalaryTable } from "@/components/compensation/SalaryTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Import local data and types
import salariesData from "@/data/salaries.json";
import { SalaryRecord, Company, Level, Location } from "@/types/salary";

// Import visual widgets
import { SalaryCharts } from "@/components/charts/SalaryCharts";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/Skeleton";

export default function DashboardPage() {
  // Safe cast for salaries JSON records
  const records = React.useMemo(() => salariesData as SalaryRecord[], []);

  // Unique options for filters
  const companies = React.useMemo(() => Array.from(new Set(records.map((r) => r.company))).sort(), [records]);
  const locations = React.useMemo(() => Array.from(new Set(records.map((r) => r.location))).sort(), [records]);
  const levels = React.useMemo(() => Array.from(new Set(records.map((r) => r.level))).sort(), [records]);

  // States
  const [searchQuery, setSearchQuery] = React.useState({ company: "", role: "" });
  const [filters, setFilters] = React.useState({ company: "", location: "", level: "" });
  const [sortField, setSortField] = React.useState<"company" | "role" | "level" | "location" | "totalCompensation">("totalCompensation");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [comparedRecords, setComparedRecords] = React.useState<SalaryRecord[]>([]);
  const [isCompareOpen, setIsCompareOpen] = React.useState(false);

  // Filtered and sorted data
  const filteredRecords = React.useMemo(() => {
    return records
      .filter((record) => {
        const matchesSearchCompany = record.company.toLowerCase().includes(searchQuery.company.toLowerCase());
        const matchesSearchRole = record.role.toLowerCase().includes(searchQuery.role.toLowerCase());
        
        const matchesFilterCompany = !filters.company || record.company === filters.company;
        const matchesFilterLocation = !filters.location || record.location === filters.location;
        const matchesFilterLevel = !filters.level || record.level === filters.level;

        return matchesSearchCompany && matchesSearchRole && matchesFilterCompany && matchesFilterLocation && matchesFilterLevel;
      })
      .sort((a, b) => {
        let valueA = a[sortField];
        let valueB = b[sortField];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
          return sortOrder === "asc" ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
        }
      });
  }, [records, searchQuery, filters, sortField, sortOrder]);

  // KPIs
  const stats = React.useMemo(() => {
    const totalCompanies = new Set(filteredRecords.map((r) => r.company)).size;
    const averageCompensation = filteredRecords.length
      ? filteredRecords.reduce((sum, r) => sum + r.totalCompensation, 0) / filteredRecords.length
      : 0;
    const highestCompensation = filteredRecords.length
      ? Math.max(...filteredRecords.map((r) => r.totalCompensation))
      : 0;

    return { totalCompanies, averageCompensation, highestCompensation };
  }, [filteredRecords]);

  // Handlers
  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleCompareToggle = (record: SalaryRecord) => {
    setComparedRecords((prev) => {
      const exists = prev.find((r) => r.id === record.id);
      if (exists) {
        return prev.filter((r) => r.id !== record.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), record]; // Keep max 3
      }
      return [...prev, record];
    });
  };

  const formatVal = (val: number) => {
    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Compensation Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze tech compensation benchmarks across India's top locations.
          </p>
        </div>

        {/* Overview Stats */}
        <StatsCards
          totalCompanies={stats.totalCompanies}
          averageCompensation={stats.averageCompensation}
          highestCompensation={stats.highestCompensation}
        />

        {/* Analytics Charts */}
        <div className="mt-4">
          <SalaryCharts records={filteredRecords} />
        </div>

        <Separator className="my-6" />

        {/* Comparison Floating Action Bar */}
        {comparedRecords.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40 flex items-center gap-4 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg border border-primary/20 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-sm font-semibold">
              Comparing {comparedRecords.length} package{comparedRecords.length > 1 ? "s" : ""}
            </span>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full text-xs font-semibold px-4 h-8"
              onClick={() => setIsCompareOpen(true)}
            >
              Analyze Compare
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-xs font-semibold text-primary-foreground hover:bg-white/10 h-8"
              onClick={() => setComparedRecords([])}
            >
              Clear
            </Button>
          </div>
        )}

        {/* Dashboard Workspace */}
        <div className="flex flex-col gap-6 lg:flex-row items-start">
          <FilterSidebar
            companies={companies}
            locations={locations}
            levels={levels}
            onFilterChange={setFilters}
          />
          <div className="flex-1 w-full space-y-4">
            <SearchBar onSearchChange={setSearchQuery} />
            {filteredRecords.length === 0 ? (
              <EmptyState />
            ) : (
              <SalaryTable
                records={filteredRecords}
                onSort={handleSort}
                onCompareToggle={handleCompareToggle}
                comparedIds={comparedRecords.map((r) => r.id)}
              />
            )}
          </div>
        </div>
      </main>

      {/* Compare Modal */}
      <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>Compare Salaries</DialogTitle>
            <DialogDescription>
              Side-by-side total compensation breakdown.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {comparedRecords.map((record) => (
              <div key={record.id} className="border border-border rounded-lg p-5 bg-muted/20 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{record.company}</h3>
                  <p className="text-sm text-muted-foreground">{record.role}</p>
                  <p className="text-xs font-mono bg-secondary w-fit px-1.5 py-0.5 rounded mt-1">{record.level} • {record.location}</p>
                </div>
                <Separator />
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Salary</span>
                    <span className="font-mono">{formatVal(record.baseSalary)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bonus</span>
                    <span className="font-mono">{formatVal(record.bonus)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stock Options</span>
                    <span className="font-mono">{formatVal(record.stock)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total Comp</span>
                    <span className="font-mono text-primary">{formatVal(record.totalCompensation)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
