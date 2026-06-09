"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Building2, Landmark, TrendingUp, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

interface StatsCardsProps {
  totalCompanies: number;
  averageCompensation: number;
  highestCompensation: number;
  totalRecords?: number;
  currency?: string;
}

export function StatsCards({
  totalCompanies,
  averageCompensation,
  highestCompensation,
  totalRecords = 100,
  currency = "INR",
}: StatsCardsProps) {
  // Use formatCurrency with safety conversions or fallbacks since formatters expects CurrencyCode
  const formatVal = (val: number) => {
    // Basic formatted display with currency indicator
    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val)}`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-4"
    >
      <motion.div variants={item}>
        <Card className="relative overflow-hidden border-border/40 bg-card/50 backdrop-blur-xl transition-all hover:shadow-lg hover:border-primary/30 group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Companies
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold tracking-tight">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active tech hubs analyzed
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="relative overflow-hidden border-border/40 bg-card/50 backdrop-blur-xl transition-all hover:shadow-lg hover:border-[hsl(262,83%,58%)]/30 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(262,83%,58%)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Records
            </CardTitle>
            <div className="p-2 bg-[hsl(262,83%,58%)]/10 rounded-lg group-hover:bg-[hsl(262,83%,58%)]/20 transition-colors">
              <Database className="h-4 w-4 text-[hsl(262,83%,58%)]" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold tracking-tight">{totalRecords}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Verified salary submissions
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="relative overflow-hidden border-border/40 bg-card/50 backdrop-blur-xl transition-all hover:shadow-lg hover:border-[hsl(142,71%,45%)]/30 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(142,71%,45%)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Comp
            </CardTitle>
            <div className="p-2 bg-[hsl(142,71%,45%)]/10 rounded-lg group-hover:bg-[hsl(142,71%,45%)]/20 transition-colors">
              <TrendingUp className="h-4 w-4 text-[hsl(142,71%,45%)]" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold tracking-tight">
              {formatVal(averageCompensation)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average base + bonus + stock
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="relative overflow-hidden border-border/40 bg-card/50 backdrop-blur-xl transition-all hover:shadow-lg hover:border-[hsl(40,90%,50%)]/30 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(40,90%,50%)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Highest Comp
            </CardTitle>
            <div className="p-2 bg-[hsl(40,90%,50%)]/10 rounded-lg group-hover:bg-[hsl(40,90%,50%)]/20 transition-colors">
              <Landmark className="h-4 w-4 text-[hsl(40,90%,50%)]" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[hsl(40,90%,50%)] to-[hsl(20,90%,50%)]">
              {formatVal(highestCompensation)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Top individual package
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
