import { create } from 'zustand'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from '@xyflow/react'
import type { AutomationAction, SimulationResult, WorkflowNodeData, WorkflowNodeType } from '../types/workflow'
import { createDefaultNodeData } from '../utils/defaultNodeData'

type Point = { x: number; y: number }

type WorkflowState = {
  nodes: Node<WorkflowNodeData>[]
  edges: Edge[]
  selectedNodeId: string | null
  automations: AutomationAction[]
  simulation: SimulationResult | null
  validationErrors: string[]
  setAutomations: (actions: AutomationAction[]) => void
  setSimulation: (result: SimulationResult | null) => void
  setValidationErrors: (errors: string[]) => void
  selectNode: (id: string | null) => void
  addNode: (type: WorkflowNodeType, position: Point) => void
  updateNodeData: (id: string, patch: Partial<WorkflowNodeData>) => void
  deleteSelectedNode: () => void
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [
    {
      id: 'start-1',
      type: 'start',
      position: { x: 80, y: 100 },
      data: { type: 'start', title: 'Start workflow', metadata: {} },
    },
    {
      id: 'task-1',
      type: 'task',
      position: { x: 340, y: 100 },
      data: {
        type: 'task',
        title: 'Collect documents',
        description: '',
        assignee: 'HR',
        dueDate: '',
        customFields: {},
      },
    },
    {
      id: 'end-1',
      type: 'end',
      position: { x: 620, y: 100 },
      data: { type: 'end', title: 'End', endMessage: 'Done', summaryFlag: true },
    },
  ],
  edges: [
    { id: 'e-start-1-task-1', source: 'start-1', target: 'task-1', animated: true },
    { id: 'e-task-1-end-1', source: 'task-1', target: 'end-1', animated: true },
  ],
  selectedNodeId: null,
  automations: [],
  simulation: null,
  validationErrors: [],
  setAutomations: (actions) => set({ automations: actions }),
  setSimulation: (result) => set({ simulation: result }),
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  selectNode: (id) => set({ selectedNodeId: id }),
  addNode: (type, position) =>
    set((state) => {
      const id = crypto.randomUUID()
      return {
        nodes: [
          ...state.nodes,
          {
            id,
            type,
            position,
            data: createDefaultNodeData(type),
          },
        ],
        selectedNodeId: id,
      }
    }),
  updateNodeData: (id, patch) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...patch,
              },
            }
          : node
      ),
    })),
  deleteSelectedNode: () =>
    set((state) => {
      if (!state.selectedNodeId) return state
      return {
        nodes: state.nodes.filter((node) => node.id !== state.selectedNodeId),
        edges: state.edges.filter(
          (edge) => edge.source !== state.selectedNodeId && edge.target !== state.selectedNodeId
        ),
        selectedNodeId: null,
      }
    }),
  onNodesChange: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
  onEdgesChange: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),
  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, animated: true }, state.edges),
    })),
}))