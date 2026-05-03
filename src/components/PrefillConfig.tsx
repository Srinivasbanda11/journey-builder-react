import React, { useState } from 'react';
import { BlueprintGraph, FormNode, PrefillMapping } from '../types';
import { PrefillOption } from '../dataSources/types';
import { PrefillSourceModal } from './PrefillSourceModal';

interface PrefillConfigProps {
  form: FormNode;
  graph: BlueprintGraph;
  mapping: PrefillMapping;
  onMappingChange: (mapping: PrefillMapping) => void;
}

/**
 * Prefill config panel for a selected form.
 * Shows each field, its current prefill (if any), clear button, and add button.
 */
export function PrefillConfig({ form, graph, mapping, onMappingChange }: PrefillConfigProps) {
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);

  function handleSelectOption(option: PrefillOption) {
    if (!activeFieldId) return;
    onMappingChange({ ...mapping, [activeFieldId]: option.id });
    setActiveFieldId(null);
  }

  function handleClearField(fieldId: string) {
    onMappingChange({ ...mapping, [fieldId]: null });
  }

  const activeField = form.fields.find((f) => f.id === activeFieldId);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{form.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Prefill configuration</p>
      </div>
      <div className="space-y-2">
        {form.fields.map((field) => {
          const prefillId = mapping[field.id];
          return (
            <div key={field.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-800 truncate">{field.label}</span>
                {prefillId ? (
                  <span className="inline-flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{prefillId}</span>
                ) : (
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2"
                    onClick={() => setActiveFieldId(field.id)}
                  >+ Add prefill</button>
                )}
              </div>
              {prefillId && (
                <button
                  className="ml-3 text-gray-400 hover:text-red-500 font-bold text-base"
                  onClick={() => handleClearField(field.id)}
                  aria-label="Clear prefill"
                >\u00d7</button>
              )}
            </div>
          );
        })}
      </div>
      {activeField && (
        <PrefillSourceModal
          formId={form.id}
          fieldLabel={activeField.label}
          graph={graph}
          onSelect={handleSelectOption}
          onClose={() => setActiveFieldId(null)}
        />
      )}
    </div>
  );
}
