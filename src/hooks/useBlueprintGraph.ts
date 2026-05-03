import { useEffect, useState } from 'react';
import { BlueprintGraph } from '../types';
import { fetchBlueprintGraph } from '../api/blueprintGraph';

interface UseBlueprintGraphResult {
  graph: BlueprintGraph | null;
  loading: boolean;
  error: string | null;
}

export function useBlueprintGraph(blueprintId: string): UseBlueprintGraphResult {
  const [graph, setGraph] = useState<BlueprintGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchBlueprintGraph(blueprintId)
      .then((data) => { if (!cancelled) { setGraph(data); setLoading(false); } })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [blueprintId]);

  return { graph, loading, error };
}
