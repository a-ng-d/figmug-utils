export interface Feature<T> {
  name: string
  description: string
  isActive: boolean
  isPro: boolean
  isNew: boolean
  limit?: number
  availabilityForEditors: Array<
    | 'figma'
    | 'dev'
    | 'dev_vscode'
    | 'figjam'
    | 'slides'
    | 'penpot'
    | 'sketch'
    | 'framer'
    | 'webflow'
  >
  proForServices: Array<T>
  type: 'SERVICE' | 'DIVISION' | 'ACTION' | 'CONTEXT'
}

export type PlanStatus = 'UNPAID' | 'PAID' | 'NOT_SUPPORTED'
