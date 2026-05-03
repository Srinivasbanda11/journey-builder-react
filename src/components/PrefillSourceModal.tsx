import React from 'react';
import { BlueprintGraph } from '../types';
import { PrefillOption } from '../dataSources/types';
import { DATA_SOURCES } from '../dataSources';

interface PrefillSourceModalProps {
  formId: string;
  fieldLabel: string;
  graph: BlueprintGraph;
  onSelect: (option: PrefillOption) => void;
  onClose: () => void;
}

/**
 * Modal listing all prefill sources. Each DataSource in dataSources/index.ts
 * is rendered automatically as a section - no changes needed here when adding sources.
 */
export function PrefillSourceModal({ formId, fieldLabel, graph, onSelect, onClose }: PrefillSourceModalProps) {
  const sections = DATA_SOURCES.map((source) => ({
    source,
    options: source.getOptions(formId, graph),
  })).filter((s) => s.options.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Prefill</p>
            <h2 className="text-base font-semibold text-gray-900">{fieldLabel}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold" aria-label="Close">\u00d7</button>
        </div>
        <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
          {sections.length === 0 && (
            <p className="px-6 py-8 text-sm text-gray-500 text-center">No prefill options available.</p>
          )}
          {sections.map(({ source, options }) => (
            <div key={source.id} className="px-6 py-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{source.label}</h3>
              <ul className="space-y-1">
                {options.map((option) => (
                  <li key={option.id}>
                    <button
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={() => onSelect(option)}
                    >{option.label}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
