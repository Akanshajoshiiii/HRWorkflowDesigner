import { Handle, Position } from '@xyflow/react'
import type { ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  selected?: boolean
  showTop?: boolean
  showBottom?: boolean
  accent: string
  children?: ReactNode
}

export function NodeShell({
  title,
  subtitle,
  selected,
  showTop = true,
  showBottom = true,
  accent,
  children,
}: Props) {
  return (
    <div
      className={`min-w-[180px] rounded-2xl border bg-white p-3 shadow-sm transition ${
        selected ? 'ring-2 ring-slate-900' : ''
      } ${accent}`}
    >
      {showTop ? <Handle type="target" position={Position.Top} className="!h-3 !w-3 !border-2" /> : null}
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      {subtitle ? <div className="mt-1 text-xs text-slate-500">{subtitle}</div> : null}
      {children ? <div className="mt-2 text-xs text-slate-600">{children}</div> : null}
      {showBottom ? <Handle type="source" position={Position.Bottom} className="!h-3 !w-3 !border-2" /> : null}
    </div>
  )
}