"use client";

import * as React from "react";
import Link from "next/link";
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
import { motion } from "framer-motion";

interface SalaryTableProps {
  records: SalaryRecord[];
  onSort: (field: "company" | "role" | "level" | "location" | "totalCompensation") => void;
  onCompareToggle: (record: SalaryRecord) => void;
  comparedIds: string[];
}

const getLevelBadgeProps = (level: string) => {
  switch (level.toUpperCase()) {
    case 'L3':
      return { className: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
    case 'L4':
      return { className: "bg-purple-500/10 text-purple-500 border-purple-500/20" };
    case 'L5':
      return { className: "bg-orange-500/10 text-orange-500 border-orange-500/20" };
    default:
      return { variant: "secondary" as const };
  }
};

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden shadow-sm"
    >
      <div className="overflow-x-auto max-h-[600px] relative">
        <Table>
          <TableHeader className="sticky top-0 bg-card/80 backdrop-blur-md z-10 shadow-sm border-b border-border/50">
            <TableRow className="hover:bg-transparent border-b-0">
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
                  <TableRow key={record.id} className="group hover:bg-primary/5 transition-colors border-border/50">
                    <TableCell>
                      <Button
                        variant={isCompared ? "default" : "outline"}
                        size="sm"
                        onClick={() => onCompareToggle(record)}
                        className={`h-7 px-2.5 text-xs font-medium rounded-full transition-all ${isCompared ? 'bg-primary shadow-md shadow-primary/20' : 'hover:border-primary/50'}`}
                      >
                        {isCompared ? "Selected" : "Compare"}
                      </Button>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      <Link href={`/company/${encodeURIComponent(record.company)}`} className="hover:underline hover:text-primary transition-colors">
                        {record.company}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium">{record.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-mono text-[10px] uppercase tracking-wider ${getLevelBadgeProps(record.level).className || ''}`}>
                        {record.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.location}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground group-hover:text-foreground transition-colors">{formatVal(record.baseSalary)}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground group-hover:text-foreground transition-colors">{formatVal(record.bonus)}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground group-hover:text-foreground transition-colors">{formatVal(record.stock)}</TableCell>
                    <TableCell className="text-right font-semibold font-mono text-primary bg-primary/5 group-hover:bg-primary/10 transition-colors rounded-r-md">
                      {formatVal(record.totalCompensation)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
