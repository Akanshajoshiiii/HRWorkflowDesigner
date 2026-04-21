import type { AutomationAction } from '../types/workflow'

export const automationActions: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'create_ticket', label: 'Create Ticket', params: ['project', 'priority'] },
]