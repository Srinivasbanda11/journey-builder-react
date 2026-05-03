import { BlueprintGraph } from '../types';
import { DataSource, PrefillOption } from './types';
import { getUpstreamForms } from '../utils/dagUtils';

/**
 * Prefill options from upstream form fields (direct + transitive deps).
 */
export const formFieldsDataSource: DataSource = {
  id: 'form_fields',
  label: 'Form Fields',

  getOptions(formId: string, graph: BlueprintGraph): PrefillOption[] {
    const upstream = getUpstreamForms(formId, graph);
    return upstream.flatMap(({ form, isDirect }) =>
      form.fields.map((field) => ({
        id: field.id,
        label: isDirect
          ? field.label + ' (' + form.name + ')'
          : field.label + ' (' + form.name + ' — transitive)',
        sourceId: 'form_fields',
      }))
    );
  },
};
