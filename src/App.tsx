import React, { useState } from 'react';
import { useBlueprintGraph } from './hooks/useBlueprintGraph';
import { FormList } from './components/FormList';
import { PrefillConfig } from './components/PrefillConfig';
import { PrefillMapping } from './types';

const BLUEPRINT_ID = 'bp_01';

export default function App() {
  const { graph, loading, error } = useBlueprintGraph(BLUEPRINT_ID);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [mappings, setMappings] = useState<Record<string, PrefillMapping>>({});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading blueprint graph...</p>
      </div>
    );
  }

  if (error || !graph) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-700 font-semibold mb-2">Failed to load graph</h2>
          <p className="text-red-600 text-sm">{error ?? 'Unknown error'}</p>
          <p className="text-red-500 text-xs mt-2">Make sure mock server is running: npm run mock-server</p>
        </div>
      </div>
    );
  }

  const selectedForm = graph.forms.find((f) => f.id === selectedFormId) ?? null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <FormList forms={graph.forms} selectedFormId={selectedFormId} onSelectForm={setSelectedFormId} />
      <main className="flex-1 flex flex-col">
        {selectedForm ? (
          <PrefillConfig
            form={selectedForm}
            graph={graph}
            mapping={mappings[selectedForm.id] ?? {}}
            onMappingChange={(m) => setMappings((prev) => ({ ...prev, [selectedForm.id]: m }))}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-sm">Select a form to configure prefill</p>
          </div>
        )}
      </main>
    </div>
  );
}
