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
import { motion } from "framer-motion";
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
      { name: "Bonus", value: Math.round(totals.bonus / count), color: "hsl(280, 80%, 65%)" },
      { name: "Stock options", value: Math.round(totals.stock / count), color: "hsl(200, 90%, 60%)" },
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

  // 4. Salary Distribution by Location
  const locationData = React.useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    records.forEach((r) => {
      if (!map[r.location]) map[r.location] = { total: 0, count: 0 };
      map[r.location].total += r.totalCompensation;
      map[r.location].count += 1;
    });
    return Object.entries(map).map(([location, stats]) => ({
      location,
      average: Math.round(stats.total / stats.count),
    })).sort((a, b) => b.average - a.average);
  }, [records]);

  if (records.length === 0) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
      {/* Average Compensation by Company */}
      <motion.div variants={item}>
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Average Total Comp by Company</CardTitle>
            <CardDescription>Highest average package ranking</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatVal} />
                <Tooltip
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                  formatter={(value: any) => [formatVal(value as number), "Average TC"]}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="average" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compensation Breakdown */}
      <motion.div variants={item}>
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm hover:shadow-lg transition-shadow">
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
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [formatVal(value as number), "Average"]}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Salary Distribution by Level */}
      <motion.div variants={item}>
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Average Salary by Level</CardTitle>
            <CardDescription>Salary progressions across level bands</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="level" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatVal} />
                <Tooltip
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                  formatter={(value: any) => [formatVal(value as number), "Average TC"]}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="average" fill="hsl(200, 90%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Salary Distribution by Location */}
      <motion.div variants={item}>
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Average Salary by Location</CardTitle>
            <CardDescription>Highest paying tech hubs</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="location" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatVal} />
                <Tooltip
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                  formatter={(value: any) => [formatVal(value as number), "Average TC"]}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="average" fill="hsl(40, 90%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
