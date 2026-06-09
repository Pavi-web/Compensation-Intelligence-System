"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SearchBar } from "@/components/shared/SearchBar";
import { FilterSidebar } from "@/components/shared/FilterSidebar";
import { SalaryTable } from "@/components/compensation/SalaryTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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
  const router = useRouter();

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
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 p-8 sm:p-12 mb-8"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Sparkles className="w-64 h-64 text-primary" />
          </div>
          <div className="relative z-10 flex flex-col gap-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Live Market Data Updates
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              Master your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(280,80%,65%)]">
                Compensation Intelligence
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Gain unparalleled insights into tech salaries across India's top hubs. Compare packages, discover trends, and make data-driven career decisions.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/25 group" onClick={() => router.push('/market-data')}>
                Explore Market Data
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <StatsCards
          totalCompanies={stats.totalCompanies}
          totalRecords={records.length}
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
              onClick={() => router.push(`/compare?ids=${comparedRecords.map((r) => r.id).join(",")}`)}
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
    </div>
  );
}
