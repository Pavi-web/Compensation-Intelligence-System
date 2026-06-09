"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SearchBar } from "@/components/shared/SearchBar";
import { FilterSidebar } from "@/components/shared/FilterSidebar";
import { SalaryTable } from "@/components/compensation/SalaryTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toast } from "sonner";

import salariesData from "@/data/salaries.json";
import { SalaryRecord } from "@/types/salary";
import { EmptyState } from "@/components/shared/EmptyState";

export default function MarketDataPage() {
  const records = React.useMemo(() => salariesData as SalaryRecord[], []);

  const companies = React.useMemo(() => Array.from(new Set(records.map((r) => r.company))).sort(), [records]);
  const locations = React.useMemo(() => Array.from(new Set(records.map((r) => r.location))).sort(), [records]);
  const levels = React.useMemo(() => Array.from(new Set(records.map((r) => r.level))).sort(), [records]);

  const [searchQuery, setSearchQuery] = React.useState({ company: "", role: "" });
  const [filters, setFilters] = React.useState({ company: "", location: "", level: "" });
  const [sortField, setSortField] = React.useState<"company" | "role" | "level" | "location" | "totalCompensation">("totalCompensation");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [comparedRecords, setComparedRecords] = React.useState<SalaryRecord[]>([]);
  const router = useRouter();

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

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      toast.error("No data to export", { description: "Adjust your filters to find records first." });
      return;
    }

    const headers = ["Company", "Role", "Level", "Location", "Base Salary", "Bonus", "Stock", "Total Compensation"];
    const csvContent = [
      headers.join(","),
      ...filteredRecords.map(r => 
        `"${r.company}","${r.role}","${r.level}","${r.location}",${r.baseSalary},${r.bonus},${r.stock},${r.totalCompensation}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `compensation_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Export successful", { description: `Downloaded ${filteredRecords.length} records as CSV.` });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Market Data Explorer
          </h1>
          <p className="text-lg text-muted-foreground">
            Search, filter, and compare compensation data across the industry.
          </p>
        </motion.div>

        <StatsCards
          totalCompanies={stats.totalCompanies}
          totalRecords={filteredRecords.length}
          averageCompensation={stats.averageCompensation}
          highestCompensation={stats.highestCompensation}
        />

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

        <div className="flex flex-col gap-6 lg:flex-row items-start">
          <FilterSidebar
            companies={companies}
            locations={locations}
            levels={levels}
            onFilterChange={setFilters}
          />
          <div className="flex-1 w-full space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex-1 w-full sm:max-w-md">
                <SearchBar onSearchChange={setSearchQuery} />
              </div>
              <Button variant="outline" onClick={handleExportCSV} className="shrink-0 group">
                <Download className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                Export CSV
              </Button>
            </div>
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
