import { BlueprintGraph, FormNode } from '../types';

function buildPredecessorMap(graph: BlueprintGraph): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const form of graph.forms) map.set(form.id, []);
  for (const edge of graph.edges) {
    const list = map.get(edge.to) ?? [];
    list.push(edge.from);
    map.set(edge.to, list);
  }
  return map;
}

export function getUpstreamForms(
  formId: string,
  graph: BlueprintGraph
): { form: FormNode; isDirect: boolean }[] {
  const predecessorMap = buildPredecessorMap(graph);
  const formById = new Map(graph.forms.map((f) => [f.id, f]));
  const result: { form: FormNode; isDirect: boolean }[] = [];
  const visited = new Set<string>();
  const queue: [string, boolean][] = (
    predecessorMap.get(formId) ?? []
  ).map((id): [string, boolean] => [id, true]);

  while (queue.length > 0) {
    const [currentId, isDirect] = queue.shift()!;
    if (visited.has(currentId)) continue;
    visited.add(currentId);
    const form = formById.get(currentId);
    if (form) result.push({ form, isDirect });
    for (const parentId of predecessorMap.get(currentId) ?? []) {
      if (!visited.has(parentId)) queue.push([parentId, false]);
    }
  }
  return result;
}

export function getDirectDependencies(
  formId: string,
  graph: BlueprintGraph
): string[] {
  return graph.edges.filter((e) => e.to === formId).map((e) => e.from);
}
