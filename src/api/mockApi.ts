import type { Edge, Node } from '@xyflow/react'
import { automationActions } from '../mock/automations'
import type { SimulationResult, WorkflowNodeData } from '../types/workflow'
import { buildStepText, validateWorkflow } from '../utils/workflow'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAutomations() {
  await delay(200)
  return automationActions
}

export async function simulateWorkflow(payload: {
  nodes: Node<WorkflowNodeData>[]
  edges: Edge[]
}): Promise<SimulationResult> {
  await delay(400)

  const { nodes, edges } = payload
  const serialized = JSON.stringify(payload, null, 2)
  const { errors, order } = validateWorkflow(nodes, edges)

  if (errors.length > 0) {
    return { ok: false, errors, steps: [], serialized }
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const steps = order.map((id, index) => {
    const node = nodeMap.get(id)!
    return `${index + 1}. ${buildStepText(node)}`
  })

  return { ok: true, errors: [], steps, serialized }
}