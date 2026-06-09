import * as React from "react";
import { Building2, Landmark, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

interface StatsCardsProps {
  totalCompanies: number;
  averageCompensation: number;
  highestCompensation: number;
  currency?: string;
}

export function StatsCards({
  totalCompanies,
  averageCompensation,
  highestCompensation,
  currency = "INR",
}: StatsCardsProps) {
  // Use formatCurrency with safety conversions or fallbacks since formatters expects CurrencyCode
  const formatVal = (val: number) => {
    // Basic formatted display with currency indicator
    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val)}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="overflow-hidden border border-border bg-card transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Companies
          </CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight">{totalCompanies}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Active tech hubs analyzed
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border border-border bg-card transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average Compensation
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight">
            {formatVal(averageCompensation)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Average base + bonus + stock
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border border-border bg-card transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Highest Compensation
          </CardTitle>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight text-primary">
            {formatVal(highestCompensation)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Top individual compensation package
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
