"use client";

import * as React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  companies: string[];
  locations: string[];
  levels: string[];
  onFilterChange: (filters: { company: string; location: string; level: string }) => void;
}

export function FilterSidebar({
  companies,
  locations,
  levels,
  onFilterChange,
}: FilterSidebarProps) {
  const [selectedCompany, setSelectedCompany] = React.useState("all");
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [selectedLevel, setSelectedLevel] = React.useState("all");

  React.useEffect(() => {
    onFilterChange({
      company: selectedCompany === "all" ? "" : selectedCompany,
      location: selectedLocation === "all" ? "" : selectedLocation,
      level: selectedLevel === "all" ? "" : selectedLevel,
    });
  }, [selectedCompany, selectedLocation, selectedLevel, onFilterChange]);

  const handleReset = () => {
    setSelectedCompany("all");
    setSelectedLocation("all");
    setSelectedLevel("all");
  };

  return (
    <Card className="w-full lg:w-[280px] shrink-0 border border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span>Filters</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="mr-1 h-3. w-3" />
          Reset
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-5 pt-5">
        <div className="grid gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Company
          </label>
          <Select value={selectedCompany} onValueChange={(val) => setSelectedCompany(val || "all")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Location
          </label>
          <Select value={selectedLocation} onValueChange={(val) => setSelectedLocation(val || "all")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Level
          </label>
          <Select value={selectedLevel} onValueChange={(val) => setSelectedLevel(val || "all")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
