export interface NumberItem {
  id: string;
  name: string;
  value: number;
  originalIndex: number;
}

export interface SortStep {
  stepNumber: number;
  title: string;
  comparison: string;
  condition: string;
  result: boolean;
  explanation: string;
  stateSnapshot: number[];
}

export interface SortingResult {
  original: [number, number, number];
  sorted: [number, number, number];
  sortedWithLabels: { label: string; value: number; originalLabel: string }[];
  relationString: string; // e.g. "5 < 12 <= 20"
  min: number;
  median: number;
  max: number;
  sum: number;
  average: number;
  range: number;
  hasDuplicates: boolean;
  allEqual: boolean;
  steps: SortStep[];
}

export type ProgrammingLanguage = 'c' | 'cpp' | 'python' | 'java' | 'csharp' | 'javascript' | 'pseudocode';
