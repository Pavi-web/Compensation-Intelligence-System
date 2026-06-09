"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, Share2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { toast } from "sonner";
import { CompareTable } from "@/components/compensation/CompareTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import salariesData from "@/data/salaries.json";
import { SalaryRecord } from "@/types/salary";

function CompareContent() {
  const allRecords = React.useMemo(() => salariesData as SalaryRecord[], []);
  const searchParams = useSearchParams();
  
  const [selectedIds, setSelectedIds] = React.useState<string[]>(() => {
    const ids = searchParams.get("ids");
    if (!ids) return [];
    return ids.split(",").filter((id) => allRecords.some((r) => r.id === id));
  });

  const selectedRecords = React.useMemo(() => {
    return selectedIds
      .map((id) => allRecords.find((r) => r.id === id))
      .filter((r): r is SalaryRecord => !!r);
  }, [selectedIds, allRecords]);

  const addRecord = (id: string) => {
    if (id && !selectedIds.includes(id) && selectedIds.length < 3) {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const removeRecord = (id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("ids", selectedIds.join(","));
    navigator.clipboard.writeText(url.toString());
    toast.success("Link copied to clipboard", {
      description: "You can now share this comparison with others.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <ArrowLeftRight className="h-8 w-8 text-primary" />
              Compare Salaries
            </h1>
            <p className="text-muted-foreground">
              Select and analyze up to 3 individual packages side-by-side.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <Select onValueChange={(val) => val && addRecord(val)} value="">
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Add salary package to compare..." />
              </SelectTrigger>
              <SelectContent>
                {allRecords
                  .filter((r) => !selectedIds.includes(r.id))
                  .map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.company} ({r.level}) — {r.role}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {selectedIds.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="h-10 px-3">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" onClick={() => setSelectedIds([])} className="text-xs h-10">
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Selected packages list */}
        {selectedRecords.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {selectedRecords.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-2 bg-muted/60 border border-border px-3.5 py-1.5 rounded-full text-sm font-medium"
              >
                <span>{r.company} ({r.level}) • {r.role}</span>
                <button
                  onClick={() => removeRecord(r.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-bold text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Comparison grid / table */}
        <CompareTable records={selectedRecords} />
      </main>
    </div>
  );
}

export default function ComparePage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center">Loading comparison...</div>}>
      <CompareContent />
    </React.Suspense>
  );
}
