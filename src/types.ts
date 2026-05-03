// Core domain types

export interface FormField {
  id: string;
  name: string;
  label: string;
}

export interface FormNode {
  id: string;
  name: string;
  fields: FormField[];
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface BlueprintGraph {
  blueprint_id: string;
  forms: FormNode[];
  edges: GraphEdge[];
}

export type PrefillMapping = Record<string, string | null>;
