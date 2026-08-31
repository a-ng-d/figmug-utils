export type AllOr<T> = Array<T> | 'all'

export interface Feature<T> {
  name: string
  description: string
  isActive: boolean
  isPro: boolean
  isNew: boolean
  limit?: number
  availabilityForServices: AllOr<T>
  availabilityForEditors: AllOr<Editor>
  proForServices: AllOr<T>
  proForEditors?: AllOr<Editor>
  type: 'SERVICE' | 'DIVISION' | 'ACTION' | 'CONTEXT'
}

export type PlanStatus = 'UNPAID' | 'PAID' | 'NOT_SUPPORTED'

export type Editor =
  | 'figma'
  | 'dev'
  | 'dev_vscode'
  | 'figjam'
  | 'slides'
  | 'make'
  | 'buzz'
  | 'sites'
  | 'penpot'
  | 'sketch'
  | 'framer'
  | 'chrome'
  | 'web'
