import { describe, it, expect } from 'vitest';
import { getUpstreamForms, getDirectDependencies } from '../dagUtils';
import { BlueprintGraph } from '../../types';

// Graph: A -> B -> D, A -> C -> D
const graph: BlueprintGraph = {
  blueprint_id: 'test',
  forms: [
    { id: 'A', name: 'Form A', fields: [{ id: 'A.email', name: 'email', label: 'Email' }] },
    { id: 'B', name: 'Form B', fields: [{ id: 'B.company', name: 'company', label: 'Company' }] },
    { id: 'C', name: 'Form C', fields: [{ id: 'C.address', name: 'address', label: 'Address' }] },
    { id: 'D', name: 'Form D', fields: [{ id: 'D.notes', name: 'notes', label: 'Notes' }] },
  ],
  edges: [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'D' },
  ],
};

describe('getDirectDependencies', () => {
  it('returns direct parents', () => {
    const deps = getDirectDependencies('D', graph);
    expect(deps).toEqual(expect.arrayContaining(['B', 'C']));
    expect(deps).toHaveLength(2);
  });
  it('returns empty for root node', () => {
    expect(getDirectDependencies('A', graph)).toHaveLength(0);
  });
});

describe('getUpstreamForms', () => {
  it('marks direct parents as isDirect=true', () => {
    const upstream = getUpstreamForms('D', graph);
    const directIds = upstream.filter((u) => u.isDirect).map((u) => u.form.id);
    expect(directIds).toEqual(expect.arrayContaining(['B', 'C']));
  });
  it('marks transitive parents as isDirect=false', () => {
    const upstream = getUpstreamForms('D', graph);
    const transitive = upstream.filter((u) => !u.isDirect).map((u) => u.form.id);
    expect(transitive).toContain('A');
  });
  it('returns empty for root node', () => {
    expect(getUpstreamForms('A', graph)).toHaveLength(0);
  });
  it('has no duplicates', () => {
    const upstream = getUpstreamForms('D', graph);
    const ids = upstream.map((u) => u.form.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
