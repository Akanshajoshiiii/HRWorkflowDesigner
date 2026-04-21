import type { Edge, Node } from '@xyflow/react'

export type WorkflowNodeType = 'start' | 'task' | 'approval' | 'automated' | 'end'

export type AutomationAction = {
  id: string
  label: string
  params: string[]
}

export type WorkflowNodeData = {
  type: WorkflowNodeType
  title: string
  description?: string
  assignee?: string
  dueDate?: string
  metadata?: Record<string, string>
  customFields?: Record<string, string>
  approverRole?: string
  autoApproveThreshold?: number
  actionId?: string
  actionLabel?: string
  actionParams?: Record<string, string>
  endMessage?: string
  summaryFlag?: boolean
}

export type WorkflowNode = Node<WorkflowNodeData>
export type WorkflowEdge = Edge

export type SimulationResult = {
  ok: boolean
  errors: string[]
  steps: string[]
  serialized: string
}