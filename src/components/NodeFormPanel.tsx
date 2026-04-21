import { getAutomations } from '../api/mockApi'
import { useWorkflowStore } from '../store/workflowStore'
import { KeyValueEditor } from './KeyValueEditor'
import { useEffect } from 'react'

export function NodeFormPanel() {
  const {
    nodes,
    selectedNodeId,
    updateNodeData,
    automations,
    setAutomations,
  } = useWorkflowStore()

  const node = nodes.find((n) => n.id === selectedNodeId)

  useEffect(() => {
    if (automations.length === 0) {
      getAutomations().then(setAutomations)
    }
  }, [automations.length, setAutomations])

  if (!node) {
    return (
      <div className="rounded-2xl border bg-white p-4">
        <div className="text-lg font-semibold text-slate-900">Node form</div>
        <p className="mt-2 text-sm text-slate-500">Select a node to edit it.</p>
      </div>
    )
  }

  const data = node.data

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-lg font-semibold text-slate-900">Node form</div>
      <div className="mt-1 text-sm text-slate-500">{data.type.toUpperCase()}</div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Title</div>
          <input
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
            value={data.title ?? ''}
            onChange={(e) => updateNodeData(node.id, { title: e.target.value })}
          />
        </label>

        {data.type === 'start' && (
          <KeyValueEditor
            label="Metadata"
            value={data.metadata ?? {}}
            onChange={(metadata) => updateNodeData(node.id, { metadata })}
          />
        )}

        {data.type === 'task' && (
          <>
            <label className="block">
              <div className="mb-1 text-sm font-medium text-slate-700">Description</div>
              <textarea
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={data.description ?? ''}
                onChange={(e) => updateNodeData(node.id, { description: e.target.value })}
              />
            </label>
            <label className="block">
              <div className="mb-1 text-sm font-medium text-slate-700">Assignee</div>
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={data.assignee ?? ''}
                onChange={(e) => updateNodeData(node.id, { assignee: e.target.value })}
              />
            </label>
            <label className="block">
              <div className="mb-1 text-sm font-medium text-slate-700">Due date</div>
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={data.dueDate ?? ''}
                onChange={(e) => updateNodeData(node.id, { dueDate: e.target.value })}
              />
            </label>
            <KeyValueEditor
              label="Custom fields"
              value={data.customFields ?? {}}
              onChange={(customFields) => updateNodeData(node.id, { customFields })}
            />
          </>
        )}

        {data.type === 'approval' && (
          <>
            <label className="block">
              <div className="mb-1 text-sm font-medium text-slate-700">Approver role</div>
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={data.approverRole ?? ''}
                onChange={(e) => updateNodeData(node.id, { approverRole: e.target.value })}
              />
            </label>
            <label className="block">
              <div className="mb-1 text-sm font-medium text-slate-700">Auto-approve threshold</div>
              <input
                type="number"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={data.autoApproveThreshold ?? 0}
                onChange={(e) => updateNodeData(node.id, { autoApproveThreshold: Number(e.target.value) })}
              />
            </label>
          </>
        )}

        {data.type === 'automated' && (
          <>
            <label className="block">
              <div className="mb-1 text-sm font-medium text-slate-700">Action</div>
              <select
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={data.actionId ?? ''}
                onChange={(e) => {
                  const action = automations.find((a) => a.id === e.target.value)
                  updateNodeData(node.id, {
                    actionId: action?.id ?? '',
                    actionLabel: action?.label ?? '',
                    actionParams: {},
                  })
                }}
              >
                <option value="">Select an action</option>
                {automations.map((action) => (
                  <option key={action.id} value={action.id}>
                    {action.label}
                  </option>
                ))}
              </select>
            </label>

            {automations
              .find((a) => a.id === data.actionId)
              ?.params.map((param) => (
                <label className="block" key={param}>
                  <div className="mb-1 text-sm font-medium text-slate-700">{param}</div>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                    value={data.actionParams?.[param] ?? ''}
                    onChange={(e) =>
                      updateNodeData(node.id, {
                        actionParams: { ...(data.actionParams ?? {}), [param]: e.target.value },
                      })
                    }
                  />
                </label>
              ))}
          </>
        )}

        {data.type === 'end' && (
          <>
            <label className="block">
              <div className="mb-1 text-sm font-medium text-slate-700">End message</div>
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={data.endMessage ?? ''}
                onChange={(e) => updateNodeData(node.id, { endMessage: e.target.value })}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!!data.summaryFlag}
                onChange={(e) => updateNodeData(node.id, { summaryFlag: e.target.checked })}
              />
              Summary flag
            </label>
          </>
        )}
      </div>
    </div>
  )
}