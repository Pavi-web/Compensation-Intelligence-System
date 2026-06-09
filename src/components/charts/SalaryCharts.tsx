"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalaryRecord } from "@/types/salary";

interface SalaryChartsProps {
  records: SalaryRecord[];
}

export function SalaryCharts({ records }: SalaryChartsProps) {
  const formatVal = (val: number) => {
    return `₹${(val / 100000).toFixed(1)}L`;
  };

  // 1. Average Compensation by Company
  const companyData = React.useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    records.forEach((r) => {
      if (!map[r.company]) map[r.company] = { total: 0, count: 0 };
      map[r.company].total += r.totalCompensation;
      map[r.company].count += 1;
    });
    return Object.entries(map).map(([name, stats]) => ({
      name,
      average: Math.round(stats.total / stats.count),
    })).sort((a, b) => b.average - a.average);
  }, [records]);

  // 2. Average Salary Breakdown (Base vs Bonus vs Stock)
  const breakdownData = React.useMemo(() => {
    if (records.length === 0) return [];
    const totals = records.reduce(
      (acc, r) => {
        acc.base += r.baseSalary;
        acc.bonus += r.bonus;
        acc.stock += r.stock;
        return acc;
      },
      { base: 0, bonus: 0, stock: 0 }
    );
    const count = records.length;
    return [
      { name: "Base Salary", value: Math.round(totals.base / count), color: "var(--color-primary)" },
      { name: "Bonus", value: Math.round(totals.bonus / count), color: "hsl(262, 83%, 58%)" },
      { name: "Stock options", value: Math.round(totals.stock / count), color: "hsl(142, 71%, 45%)" },
    ];
  }, [records]);

  // 3. Salary Distribution by Level
  const levelData = React.useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    records.forEach((r) => {
      if (!map[r.level]) map[r.level] = { total: 0, count: 0 };
      map[r.level].total += r.totalCompensation;
      map[r.level].count += 1;
    });
    return Object.entries(map).map(([level, stats]) => ({
      level,
      average: Math.round(stats.total / stats.count),
    })).sort((a, b) => a.level.localeCompare(b.level));
  }, [records]);

  if (records.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Average Compensation by Company */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Average Total Comp by Company</CardTitle>
          <CardDescription>Highest average package ranking</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={companyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} tickFormatter={formatVal} />
              <Tooltip
                formatter={(value: any) => [formatVal(value as number), "Average TC"]}
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              />
              <Bar dataKey="average" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Compensation Breakdown */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Compensation Component Mix</CardTitle>
          <CardDescription>Base vs. Bonus vs. Stock options breakdown</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [formatVal(value as number), "Average"]}
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Salary Distribution by Level */}
      <Card className="border-border bg-card md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Average Salary by Level</CardTitle>
          <CardDescription>Salary progressions across level bands</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={levelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="level" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} tickFormatter={formatVal} />
              <Tooltip
                formatter={(value: any) => [formatVal(value as number), "Average TC"]}
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              />
              <Bar dataKey="average" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
