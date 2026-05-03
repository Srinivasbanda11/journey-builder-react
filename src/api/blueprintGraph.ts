import { BlueprintGraph } from '../types';

const API_BASE = 'http://localhost:3001';

export async function fetchBlueprintGraph(
  blueprintId: string
): Promise<BlueprintGraph> {
  const url = API_BASE + '/api/v1/actions/blueprints/' + blueprintId + '/graph';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch blueprint graph: ' + response.status);
  }
  return response.json() as Promise<BlueprintGraph>;
}
