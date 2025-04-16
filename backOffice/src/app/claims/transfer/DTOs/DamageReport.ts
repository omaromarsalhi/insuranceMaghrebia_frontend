export interface EstimatedCost {
  minCost: number;
  maxCost: number;
}

export interface DamageItem {
  part: string;
  possibly: "certain" | "uncertain";
  estimatedCost: EstimatedCost;
}

export interface DamageReport {
  certain: DamageItem[];
  uncertain: DamageItem[];
  totalRepairEstimateRange: EstimatedCost;
}