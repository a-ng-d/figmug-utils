import { Feature, PlanStatus } from '@tps/feature.types'

export default class FeatureStatus<T> {
  features: Array<Feature<T>>
  featureName: string
  planStatus: PlanStatus
  suggestion?: string
  result?: Feature<T>
  limit?: number

  constructor(data: {
    features: Array<Feature<T>>
    featureName: string
    planStatus: PlanStatus
    suggestion?: string
  }) {
    this.features = data.features
    this.featureName = data.featureName
    this.planStatus = data.planStatus
    this.suggestion = data.suggestion
    this.result = this.getFeature()
    this.limit = this.result === undefined ? 42 : this.result.limit
  }

  getFeature(): Feature<T> | undefined {
    return this.features.find((feature) => feature.name === this.featureName)
  }

  isActive(): boolean {
    if (this.result === undefined) return true
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

    if (match !== undefined)
      if (match.isPro && this.planStatus === 'PAID') return false
      else if (!match.isPro && this.planStatus === 'PAID') return false
      else if (!match.isPro && this.planStatus === 'UNPAID') return false
      else return true
    else return true
  }

  isReached(current: number): boolean {
    const match = this.result

    if (match !== undefined && match.limit !== undefined) {
      if (match.isPro)
        if (this.planStatus === 'UNPAID')
          return current >= (match.limit as number) ? true : false
        else return false
      else return false
    } else if (match !== undefined && match.limit === undefined) return false
    else return true
  }

  isAvailableAndBlocked(): string | null | undefined {
    if (!this.isBlocked()) return this.suggestion
    else return null
  }
}
