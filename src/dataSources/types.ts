import { BlueprintGraph } from '../types';

export interface PrefillOption {
  id: string;
  label: string;
  sourceId: string;
}

/**
 * Implement this interface to add a new prefill data source.
 * Register it in src/dataSources/index.ts.
 */
export interface DataSource {
  id: string;
  label: string;
  getOptions(formId: string, graph: BlueprintGraph): PrefillOption[];
}
