"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SalaryCharts } from "@/components/charts/SalaryCharts";
import { motion } from "framer-motion";
import salariesData from "@/data/salaries.json";
import { SalaryRecord } from "@/types/salary";

export default function TrendsPage() {
  const records = React.useMemo(() => salariesData as SalaryRecord[], []);

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
            Compensation Trends
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore industry-wide patterns, top paying hubs, and compensation structure breakdowns.
          </p>
        </motion.div>

        <div className="mt-8">
          <SalaryCharts records={records} />
        </div>
      </main>
    </div>
  );
}
