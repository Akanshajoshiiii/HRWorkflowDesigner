type Props = {
    label: string
    value: Record<string, string>
    onChange: (next: Record<string, string>) => void
  }
  
  export function KeyValueEditor({ label, value, onChange }: Props) {
    const entries = Object.entries(value ?? {})
  
    const update = (index: number, key: string, nextValue: string) => {
      const nextEntries = [...entries]
      nextEntries[index] = [key, nextValue]
      onChange(Object.fromEntries(nextEntries.filter(([k]) => k.trim() !== '')))
    }
  
    const addRow = () => {
      onChange({ ...value, '': '' })
    }
  
    const removeRow = (index: number) => {
      const nextEntries = entries.filter((_, i) => i !== index)
      onChange(Object.fromEntries(nextEntries))
    }
  
    return (
      <div className="mt-3">
        <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
        <div className="space-y-2">
          {entries.map(([key, val], index) => (
            <div key={`${key}-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                placeholder="key"
                value={key}
                onChange={(e) => update(index, e.target.value, val)}
              />
              <input
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                placeholder="value"
                value={val}
                onChange={(e) => update(index, key, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-2 rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          Add row
        </button>
      </div>
    )
  }