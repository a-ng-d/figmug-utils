export interface Feature<T> {
  name: string
  description: string
  isActive: boolean
  isPro: boolean
  isNew: boolean
  limit?: number
  availabilityForServices: Array<T>
  availabilityForEditors: Array<Editor>
  proForServices: Array<T>
  type: 'SERVICE' | 'DIVISION' | 'ACTION' | 'CONTEXT'
}

export type PlanStatus = 'UNPAID' | 'PAID' | 'NOT_SUPPORTED'

export type Editor =
  | 'figma'
  | 'dev'
  | 'dev_vscode'
  | 'figjam'
  | 'slides'
  | 'penpot'
  | 'sketch'
  | 'framer'
  | 'webflow'
