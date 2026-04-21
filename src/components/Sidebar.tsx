import type { WorkflowNodeType } from '../types/workflow'

const items: { type: WorkflowNodeType; label: string; hint: string }[] = [
  { type: 'start', label: 'Start', hint: 'Entry point' },
  { type: 'task', label: 'Task', hint: 'Human action' },
  { type: 'approval', label: 'Approval', hint: 'Manager / HR approval' },
  { type: 'automated', label: 'Automated', hint: 'API action' },
  { type: 'end', label: 'End', hint: 'Completion' },
]

export function Sidebar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, type: WorkflowNodeType) => {
    event.dataTransfer.setData('application/reactflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-64 border-r bg-white p-4">
      <div className="text-lg font-semibold text-slate-900">Nodes</div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            className="cursor-grab rounded-2xl border border-slate-200 bg-slate-50 p-3 active:cursor-grabbing"
          >
            <div className="font-medium text-slate-900">{item.label}</div>
            <div className="text-xs text-slate-500">{item.hint}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">Drag a node into the canvas.</p>
    </aside>
  )
}