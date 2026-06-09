"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Landmark, Award, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import salariesData from "@/data/salaries.json";
import { SalaryRecord } from "@/types/salary";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default function CompanyPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const companyName = decodeURIComponent(resolvedParams.name);
  const allRecords = React.useMemo(() => salariesData as SalaryRecord[], []);

  // Filter records by company
  const companyRecords = React.useMemo(() => {
    return allRecords.filter((r) => r.company.toLowerCase() === companyName.toLowerCase());
  }, [allRecords, companyName]);

  // Safe checks if company doesn't exist in data
  if (companyRecords.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center space-y-4">
          <h1 className="text-2xl font-bold">Company Not Found</h1>
          <p className="text-muted-foreground">We couldn't find any compensation records for "{companyName}".</p>
          <Button variant="outline" className="mt-4" render={<Link href="/" />}>
            Back to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  // Calculate stats
  const totalRecords = companyRecords.length;
  const avgComp = companyRecords.reduce((sum, r) => sum + r.totalCompensation, 0) / totalRecords;
  const maxComp = Math.max(...companyRecords.map((r) => r.totalCompensation));

  // Locations breakdown
  const locations = Array.from(new Set(companyRecords.map((r) => r.location)));

  // Top paying roles / aggregate by role
  const roleMetrics = React.useMemo(() => {
    const map: Record<string, { total: number; count: number; max: number }> = {};
    companyRecords.forEach((r) => {
      if (!map[r.role]) {
        map[r.role] = { total: 0, count: 0, max: 0 };
      }
      map[r.role].total += r.totalCompensation;
      map[r.role].count += 1;
      if (r.totalCompensation > map[r.role].max) {
        map[r.role].max = r.totalCompensation;
      }
    });

    return Object.entries(map)
      .map(([role, stats]) => ({
        role,
        average: stats.total / stats.count,
        count: stats.count,
        max: stats.max,
      }))
      .sort((a, b) => b.average - a.average);
  }, [companyRecords]);

  const formatVal = (val: number) => {
    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Button variant="ghost" size="sm" className="mb-4" render={<Link href="/" />}>
            <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </span>
          </Button>
        </div>

        {/* Company Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-muted/10 border border-border p-6 sm:p-8 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-primary/5 text-primary p-4 rounded-xl border border-primary/10">
              <Building2 className="h-10 w-10" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{companyRecords[0].company}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{totalRecords} Compensation Records</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{locations.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Total Comp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-foreground">{formatVal(avgComp)}</div>
              <p className="text-xs text-muted-foreground mt-1">Base salary, bonus, and stock grants</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Highest Compensation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-primary">{formatVal(maxComp)}</div>
              <p className="text-xs text-muted-foreground mt-1">Top reported package</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-foreground">{locations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{locations.join(", ")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Top Paying Roles sidebar */}
          <Card className="lg:col-span-1 bg-card border-border h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Top Paying Roles</CardTitle>
              <CardDescription>Average compensation ranking by title.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleMetrics.map((r, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground truncate max-w-[70%]">{r.role}</span>
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {r.count} sample{r.count > 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Average TC:</span>
                    <span className="font-bold text-sm font-mono text-primary">{formatVal(r.average)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Salary Records Table */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg font-bold">Compensation Records</CardTitle>
                <CardDescription>Individual salary breakdowns for this company.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Base</TableHead>
                      <TableHead className="text-right">Bonus</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyRecords.map((r) => (
                      <TableRow key={r.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium text-foreground">{r.role}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">{r.level}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{r.location}</TableCell>
                        <TableCell className="text-right font-mono">{formatVal(r.baseSalary)}</TableCell>
                        <TableCell className="text-right font-mono">{formatVal(r.bonus)}</TableCell>
                        <TableCell className="text-right font-mono">{formatVal(r.stock)}</TableCell>
                        <TableCell className="text-right font-bold font-mono text-primary">{formatVal(r.totalCompensation)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
