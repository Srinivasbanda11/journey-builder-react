import { DataSource } from './types';
import { formFieldsDataSource } from './formFieldsDataSource';
import { globalDataSource } from './globalDataSource';

/**
 * Add new data sources here. No other code changes needed.
 */
export const DATA_SOURCES: DataSource[] = [
  formFieldsDataSource,
  globalDataSource,
];

export type { DataSource } from './types';
export type { PrefillOption } from './types';
