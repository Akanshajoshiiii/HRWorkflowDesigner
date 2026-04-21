import { simulateWorkflow } from '../api/mockApi'
import { useWorkflowStore } from '../store/workflowStore'

export function SimulationPanel() {
  const { nodes, edges, simulation, setSimulation, validationErrors, setValidationErrors } = useWorkflowStore()

  const run = async () => {
    const result = await simulateWorkflow({ nodes, edges })
    setSimulation(result)
    setValidationErrors(result.errors)
  }

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900">Sandbox</div>
          <div className="text-sm text-slate-500">Serialize and simulate the workflow.</div>
        </div>
        <button
          onClick={run}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Run
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Validation</div>
        {validationErrors.length === 0 ? (
          <div className="text-sm text-emerald-600">No validation errors.</div>
        ) : (
          <ul className="space-y-1 text-sm text-rose-600">
            {validationErrors.map((err) => (
              <li key={err}>• {err}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Execution log</div>
        <div className="max-h-56 overflow-auto rounded-xl border bg-slate-50 p-3 text-sm">
          {simulation ? (
            simulation.ok ? (
              simulation.steps.length > 0 ? (
                simulation.steps.map((step) => <div key={step}>{step}</div>)
              ) : (
                <div>No steps.</div>
              )
            ) : (
              simulation.errors.map((err) => <div key={err} className="text-rose-600">• {err}</div>)
            )
          ) : (
            <div className="text-slate-500">Run the workflow to see results.</div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Serialized JSON</div>
        <pre className="max-h-56 overflow-auto rounded-xl border bg-slate-50 p-3 text-[11px]">
          {JSON.stringify({ nodes, edges }, null, 2)}
        </pre>
      </div>
    </div>
  )
}