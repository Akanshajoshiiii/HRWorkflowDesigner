import type { WorkflowNodeData, WorkflowNodeType } from '../types/workflow'

export function createDefaultNodeData(type: WorkflowNodeType): WorkflowNodeData {
  switch (type) {
    case 'start':
      return { type, title: 'Start workflow', metadata: {} }
    case 'task':
      return {
        type,
        title: 'Collect documents',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: {},
      }
    case 'approval':
      return {
        type,
        title: 'Manager approval',
        approverRole: 'Manager',
        autoApproveThreshold: 0,
      }
    case 'automated':
      return {
        type,
        title: 'Send email',
        actionId: '',
        actionLabel: '',
        actionParams: {},
      }
    case 'end':
      return {
        type,
        title: 'End',
        endMessage: 'Workflow complete',
        summaryFlag: true,
      }
  }
}