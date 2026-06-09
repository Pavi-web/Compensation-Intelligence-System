"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SalaryRecord } from "@/types/salary";

interface SalaryTableProps {
  records: SalaryRecord[];
  onSort: (field: "company" | "role" | "level" | "location" | "totalCompensation") => void;
  onCompareToggle: (record: SalaryRecord) => void;
  comparedIds: string[];
}

export function SalaryTable({
  records,
  onSort,
  onCompareToggle,
  comparedIds,
}: SalaryTableProps) {
  const formatVal = (val: number) => {
    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val)}`;
  };

  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Compare</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort("company")} className="-ml-4 hover:bg-transparent">
                  Company <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort("role")} className="-ml-4 hover:bg-transparent">
                  Role <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort("level")} className="-ml-4 hover:bg-transparent">
                  Level <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort("location")} className="-ml-4 hover:bg-transparent">
                  Location <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Base Salary</TableHead>
              <TableHead className="text-right">Bonus</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => onSort("totalCompensation")} className="-mr-4 ml-auto hover:bg-transparent flex items-center justify-end">
                  Total <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                  No salary records found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => {
                const isCompared = comparedIds.includes(record.id);
                return (
                  <TableRow key={record.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <Button
                        variant={isCompared ? "default" : "outline"}
                        size="sm"
                        onClick={() => onCompareToggle(record)}
                        className="h-8 px-2.5 text-xs font-medium"
                      >
                        {isCompared ? "Selected" : "Compare"}
                      </Button>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {record.company}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.role}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {record.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.location}</TableCell>
                    <TableCell className="text-right font-mono">{formatVal(record.baseSalary)}</TableCell>
                    <TableCell className="text-right font-mono">{formatVal(record.bonus)}</TableCell>
                    <TableCell className="text-right font-mono">{formatVal(record.stock)}</TableCell>
                    <TableCell className="text-right font-semibold font-mono text-primary">
                      {formatVal(record.totalCompensation)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
