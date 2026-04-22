# HR Workflow Designer

A React + TypeScript prototype for designing internal HR workflows visually using **React Flow**.  
This project was built as part of the **Tredence Studio Full Stack Engineering Intern case study**, which requires a workflow canvas, custom nodes, editable node forms, mock API integration, and a simulation sandbox. :contentReference[oaicite:0]{index=0}

## Features

- Drag-and-drop workflow builder
- Custom nodes for:
  - Start
  - Task
  - Approval
  - Automated Step
  - End
- Editable configuration panel for selected nodes
- Mock API layer for automation actions
- Workflow simulation sandbox
- Basic validation for graph structure
- JSON serialization of the workflow

## Tech Stack

- React
- TypeScript
- Vite
- React Flow (`@xyflow/react`)
- Zustand
- Tailwind CSS

## Project Structure

```txt
src/
  api/
    mockApi.ts
  components/
    FlowCanvas.tsx
    KeyValueEditor.tsx
    NodeFormPanel.tsx
    Sidebar.tsx
    SimulationPanel.tsx
    nodes/
      CustomNodes.tsx
      NodeShell.tsx
  mock/
    automations.ts
  store/
    workflowStore.ts
  types/
    workflow.ts
  utils/
    defaultNodeData.ts
    workflow.ts
  App.tsx
  main.tsx
  index.css

## How to Run

# install dependencies
npm install

# start dev server
npm run dev

