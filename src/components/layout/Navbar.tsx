"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Market Data", href: "/market-data" },
    { name: "Compare", href: "/compare" },
    { name: "Trends", href: "/trends" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-primary to-primary/60 p-1.5 rounded-lg shadow-sm shadow-primary/20">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              CompIntel
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Add Salary</Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pr-0">
              <SheetTitle className="text-left px-7 mb-4">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 px-7 mt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-6">
                  <Button variant="outline" className="w-full">Sign In</Button>
                  <Button className="w-full">Add Salary</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
