import type { Edge, Node } from '@xyflow/react'
import type { WorkflowNodeData } from '../types/workflow'

function getOutgoing(edges: Edge[]) {
  const map = new Map<string, string[]>()
  for (const edge of edges) {
    const list = map.get(edge.source) ?? []
    list.push(edge.target)
    map.set(edge.source, list)
  }
  return map
}

export function validateWorkflow(nodes: Node<WorkflowNodeData>[], edges: Edge[]) {
  const errors: string[] = []
  const startNodes = nodes.filter((n) => n.data.type === 'start')

  if (startNodes.length !== 1) {
    errors.push('Exactly one Start node is required.')
  }

  const startNode = startNodes[0]
  const incomingToStart = edges.filter((e) => e.target === startNode?.id)

  if (startNode && incomingToStart.length > 0) {
    errors.push('Start node must not have incoming edges.')
  }

  if (!startNode) {
    return { errors, order: [] as string[] }
  }

  const outgoing = getOutgoing(edges)
  const visited = new Set<string>()
  const inStack = new Set<string>()
  const order: string[] = []
  let hasCycle = false

  const dfs = (id: string) => {
    if (inStack.has(id)) {
      hasCycle = true
      return
    }
    if (visited.has(id)) return

    visited.add(id)
    inStack.add(id)
    order.push(id)

    for (const next of outgoing.get(id) ?? []) {
      dfs(next)
    }

    inStack.delete(id)
  }

  dfs(startNode.id)

  if (hasCycle) {
    errors.push('Workflow contains a cycle.')
  }

  const unreachable = nodes.filter((n) => !visited.has(n.id)).map((n) => n.data.title || n.id)
  if (unreachable.length > 0) {
    errors.push(`Disconnected nodes: ${unreachable.join(', ')}`)
  }

  const endNodes = nodes.filter((n) => n.data.type === 'end')
  const visitedEnd = endNodes.some((n) => visited.has(n.id))
  if (endNodes.length > 0 && !visitedEnd) {
    errors.push('End node is not reachable from Start.')
  }

  return { errors, order }
}

export function buildStepText(node: Node<WorkflowNodeData>) {
  const d = node.data

  switch (d.type) {
    case 'start':
      return `Start: ${d.title}`
    case 'task':
      return `Task: ${d.title}${d.assignee ? ` • Assignee: ${d.assignee}` : ''}`
    case 'approval':
      return `Approval: ${d.title}${d.approverRole ? ` • Role: ${d.approverRole}` : ''}`
    case 'automated':
      return `Automated: ${d.title}${d.actionLabel ? ` • Action: ${d.actionLabel}` : ''}`
    case 'end':
      return `End: ${d.endMessage ?? d.title}`
  }
}