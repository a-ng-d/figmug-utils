import { Feature, PlanStatus } from '@tps/feature.types'

export default class FeatureStatus<T> {
  features: Array<Feature<T>>
  featureName: string
  planStatus: PlanStatus
  currentService: T
  currentEditor: 'figma' | 'dev' | 'dev_vscode' | 'figjam' | 'slides' | 'penpot'
  suggestion?: string
  result?: Feature<T>
  limit?: number

  constructor(data: {
    features: Array<Feature<T>>
    featureName: string
    planStatus: PlanStatus
    currentService: T
    currentEditor:
      | 'figma'
      | 'dev'
      | 'dev_vscode'
      | 'figjam'
      | 'slides'
      | 'penpot'
    suggestion?: string
  }) {
    this.features = data.features
    this.featureName = data.featureName
    this.planStatus = data.planStatus
    this.currentService = data.currentService
    this.currentEditor = data.currentEditor
    this.suggestion = data.suggestion
    this.result = this.getFeature()
    this.limit = this.result === undefined ? 42 : this.result.limit
  }

  getFeature(): Feature<T> | undefined {
    return this.features.find((feature) => feature.name === this.featureName)
  }

  isActive(): boolean {
    if (this.result === undefined) return true
    if (!this.result.availabilityForEditors.includes(this.currentEditor))
      return false
    else return this.result.isActive
  }

  isPro(): boolean {
    if (this.result === undefined) return false
    else return this.result.isPro
  }

  isNew(): boolean {
    if (this.result === undefined) return false
    else return this.result.isNew
  }

  isBlocked(): boolean {
    const match = this.result

    if (match === undefined) return true

    if (!match.proForServices.includes(this.currentService)) return false

    if (match.isPro && this.planStatus === 'PAID') return false
    if (!match.isPro && this.planStatus === 'PAID') return false
    if (!match.isPro && this.planStatus === 'UNPAID') return false

    return true
  }

  isReached(current: number): boolean {
    const match = this.result

    if (match === undefined) return true

    if (!match.proForServices.includes(this.currentService)) return false

    if (match.limit !== undefined) {
      if (match.isPro) {
        if (this.planStatus === 'UNPAID') {
          return current >= (match.limit as number)
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }

  isAvailableAndBlocked(): string | null | undefined {
    if (!this.isBlocked()) return this.suggestion
    else return null
  }
}
