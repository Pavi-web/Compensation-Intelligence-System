"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearchChange: (searchQuery: { company: string; role: string }) => void;
}

export function SearchBar({ onSearchChange }: SearchBarProps) {
  const [company, setCompany] = React.useState("");
  const [role, setRole] = React.useState("");

  // Notify parent on change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange({ company, role });
    }, 300); // Debounce to prevent layout thrashing

    return () => clearTimeout(timer);
  }, [company, role, onSearchChange]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by company (e.g., Google)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by role (e.g., Software Engineer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
    </div>
  );
}
