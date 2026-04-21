import { ReactFlowProvider } from '@xyflow/react'
import { Sidebar } from './components/Sidebar'
import { FlowCanvas } from './components/FlowCanvas'
import { NodeFormPanel } from './components/NodeFormPanel'
import { SimulationPanel } from './components/SimulationPanel'
import { useWorkflowStore } from './store/workflowStore'

function MainLayout() {
  const { deleteSelectedNode } = useWorkflowStore()

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b bg-white px-4 py-3">
          <div>
            <div className="text-lg font-semibold text-slate-900">HR Workflow Designer</div>
            <div className="text-sm text-slate-500">React Flow prototype for onboarding / approvals / automation</div>
          </div>
          <button
            onClick={deleteSelectedNode}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            Delete selected node
          </button>
        </div>
        <div className="grid flex-1 grid-cols-[1fr_360px] gap-4 p-4">
          <div className="overflow-hidden rounded-2xl border bg-white">
            <FlowCanvas />
          </div>
          <div className="space-y-4 overflow-auto">
            <NodeFormPanel />
            <SimulationPanel />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ReactFlowProvider>
      <MainLayout />
    </ReactFlowProvider>
  )
}