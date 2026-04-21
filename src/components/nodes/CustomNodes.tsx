import type { NodeProps } from '@xyflow/react'
import type { WorkflowNodeData } from '../../types/workflow'
import { NodeShell } from './NodeShell'

export function StartNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  const metaCount = Object.keys(data.metadata ?? {}).length
  return (
    <NodeShell
      title={data.title || 'Start'}
      subtitle="Workflow entry"
      selected={selected}
      showTop={false}
      accent="border-emerald-500"
    >
      {metaCount > 0 ? `Metadata: ${metaCount} item(s)` : 'No metadata'}
    </NodeShell>
  )
}

export function TaskNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <NodeShell title={data.title || 'Task'} subtitle="Human task" selected={selected} accent="border-sky-500">
      {data.assignee ? `Assignee: ${data.assignee}` : 'No assignee'}
      <br />
      {data.dueDate ? `Due: ${data.dueDate}` : 'No due date'}
    </NodeShell>
  )
}

export function ApprovalNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <NodeShell title={data.title || 'Approval'} subtitle="Approval step" selected={selected} accent="border-amber-500">
      {data.approverRole ? `Role: ${data.approverRole}` : 'No role'}
      <br />
      Threshold: {data.autoApproveThreshold ?? 0}
    </NodeShell>
  )
}

export function AutomatedNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  const paramCount = Object.keys(data.actionParams ?? {}).length
  return (
    <NodeShell title={data.title || 'Automated'} subtitle="System action" selected={selected} accent="border-violet-500">
      {data.actionLabel ? `Action: ${data.actionLabel}` : 'No action selected'}
      <br />
      Params: {paramCount}
    </NodeShell>
  )
}

export function EndNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <NodeShell
      title={data.title || 'End'}
      subtitle="Completion"
      selected={selected}
      showBottom={false}
      accent="border-rose-500"
    >
      {data.endMessage || 'No message'}
      <br />
      Summary: {data.summaryFlag ? 'On' : 'Off'}
    </NodeShell>
  )
}

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
}