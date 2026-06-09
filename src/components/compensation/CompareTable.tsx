"use client";

import * as React from "react";
import { Check, ArrowLeftRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SalaryRecord } from "@/types/salary";

interface CompareTableProps {
  records: SalaryRecord[];
}

export function CompareTable({ records }: CompareTableProps) {
  const formatVal = (val: number) => {
    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val)}`;
  };

  if (records.length === 0) {
    return (
      <Card className="border border-dashed border-border bg-muted/10">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-3">
          <ArrowLeftRight className="h-10 w-10 text-muted-foreground/60" />
          <p className="text-sm">No items selected for comparison. Please go back to the dashboard and select up to 3 salaries.</p>
        </CardContent>
      </Card>
    );
  }

  // Find max total compensation to highlight
  const maxTotal = Math.max(...records.map((r) => r.totalCompensation));

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px]">Metric</TableHead>
            {records.map((r) => (
              <TableHead key={r.id} className="min-w-[200px]">
                <div className="flex flex-col gap-1 py-2">
                  <span className="font-bold text-lg text-foreground">{r.company}</span>
                  <span className="text-xs text-muted-foreground font-medium">{r.role}</span>
                  <Badge variant="secondary" className="w-fit font-mono text-[10px] mt-1">
                    {r.level}
                  </Badge>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Level */}
          <TableRow>
            <TableCell className="font-semibold text-muted-foreground">Level</TableCell>
            {records.map((r) => (
              <TableCell key={r.id} className="font-mono">{r.level}</TableCell>
            ))}
          </TableRow>

          {/* Location */}
          <TableRow>
            <TableCell className="font-semibold text-muted-foreground">Location</TableCell>
            {records.map((r) => (
              <TableCell key={r.id}>{r.location}</TableCell>
            ))}
          </TableRow>

          {/* Base Salary */}
          <TableRow>
            <TableCell className="font-semibold text-muted-foreground">Base Salary</TableCell>
            {records.map((r) => (
              <TableCell key={r.id} className="font-mono">{formatVal(r.baseSalary)}</TableCell>
            ))}
          </TableRow>

          {/* Bonus */}
          <TableRow>
            <TableCell className="font-semibold text-muted-foreground">Bonus</TableCell>
            {records.map((r) => (
              <TableCell key={r.id} className="font-mono">{formatVal(r.bonus)}</TableCell>
            ))}
          </TableRow>

          {/* Stock */}
          <TableRow>
            <TableCell className="font-semibold text-muted-foreground">Stock Options</TableCell>
            {records.map((r) => (
              <TableCell key={r.id} className="font-mono">{formatVal(r.stock)}</TableCell>
            ))}
          </TableRow>

          {/* Total Compensation */}
          <TableRow className="bg-muted/10 font-medium">
            <TableCell className="font-bold text-foreground">Total Compensation</TableCell>
            {records.map((r) => {
              const isHighest = r.totalCompensation === maxTotal && records.length > 1;
              return (
                <TableCell key={r.id} className={`font-mono text-base ${isHighest ? "text-primary font-bold bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span>{formatVal(r.totalCompensation)}</span>
                    {isHighest && (
                      <Badge variant="default" className="text-[10px] h-5 px-1.5 flex items-center gap-0.5">
                        <Check className="h-3 w-3" /> Highest
                      </Badge>
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
