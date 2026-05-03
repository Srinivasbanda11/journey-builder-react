import React from 'react';
import { FormNode } from '../types';

interface FormListProps {
  forms: FormNode[];
  selectedFormId: string | null;
  onSelectForm: (formId: string) => void;
}

export function FormList({ forms, selectedFormId, onSelectForm }: FormListProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Forms</h2>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {forms.map((form) => (
          <li key={form.id}>
            <button
              className={
                'w-full text-left px-4 py-3 text-sm transition-colors ' +
                (selectedFormId === form.id
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent')
              }
              onClick={() => onSelectForm(form.id)}
            >
              {form.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
