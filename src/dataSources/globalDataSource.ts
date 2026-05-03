import { BlueprintGraph } from '../types';
import { DataSource, PrefillOption } from './types';

const GLOBAL_PROPERTIES: PrefillOption[] = [
  { id: 'global.tenant_name', label: 'Tenant Name', sourceId: 'global' },
  { id: 'global.tenant_id', label: 'Tenant ID', sourceId: 'global' },
  { id: 'global.current_user_email', label: 'Current User Email', sourceId: 'global' },
  { id: 'global.current_user_name', label: 'Current User Name', sourceId: 'global' },
  { id: 'global.submission_date', label: 'Submission Date', sourceId: 'global' },
];

/**
 * Provides global / tenant-level prefill options.
 * The same options are available for every form.
 */
export const globalDataSource: DataSource = {
  id: 'global',
  label: 'Global Properties',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOptions(_formId: string, _graph: BlueprintGraph): PrefillOption[] {
    return GLOBAL_PROPERTIES;
  },
};
