# Journey Builder React

A React + TypeScript app implementing a DAG-based form prefill UI for the Avantos Journey Builder coding challenge.

## Features

- Fetches a blueprint graph from a mock REST API
- Renders a list of forms from the DAG
- Prefill mapping panel: view/edit which upstream fields pre-populate each downstream form field
- Clear a prefill mapping with the X button
- Pick a new prefill source from a modal showing direct deps, transitive deps, and global data
- Extensible DataSource plugin architecture — add new data sources with zero changes to existing code

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- json-server (mock API)
- Vitest + React Testing Library

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the mock API server

```bash
npm run mock-server
```

Runs on http://localhost:3001

Endpoint: GET /api/v1/actions/blueprints/:blueprintId/graph

### 3. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173

### 4. Run tests

```bash
npm test
```

## Project Structure

src/
  api/                        API fetch helpers
  components/
    FormList.tsx              List of all forms in the graph
    PrefillConfig.tsx         Prefill mapping panel for a selected form
    PrefillSourceModal.tsx    Modal to pick a new prefill source
  dataSources/
    types.ts                  DataSource interface + PrefillOption type
    formFieldsDataSource.ts   Upstream form fields (direct + transitive)
    globalDataSource.ts       Global / tenant-level properties
    index.ts                  Registry - add new sources here
  hooks/
    useBlueprintGraph.ts      Fetches + normalizes the blueprint graph
  utils/
    dagUtils.ts               BFS/DFS over the DAG
  types.ts                    Shared domain types
  App.tsx
mock/
  db.json                     Sample blueprint graph data

## How to Add a New Data Source

1. Create src/dataSources/myDataSource.ts implementing the DataSource interface
2. Register it in src/dataSources/index.ts

That is all - no other code changes needed.
