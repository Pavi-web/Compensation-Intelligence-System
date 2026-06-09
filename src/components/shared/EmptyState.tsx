import * as React from "react";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No data found",
  description = "Try adjusting your filters or search terms to find what you are looking for.",
}: EmptyStateProps) {
  return (
    <Card className="border border-dashed border-border bg-muted/5 w-full">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-3">
        <Info className="h-10 w-10 text-muted-foreground/50" />
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <p className="text-xs max-w-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
