import { describe, it, expect } from 'vitest'
import { FeatureStatus } from './feature-status'
import { Feature } from 'src/types/feature.types'

const features: Array<Feature<'BROWSE' | 'PARTICIPATE'>> = [
  {
    name: 'BROWSE',
    description: '',
    isActive: true,
    isPro: false,
    isNew: false,
    type: 'SERVICE',
    service: ['BROWSE'],
  },
  {
    name: 'PARTICIPATE',
    description: '',
    isActive: true,
    isPro: true,
    isNew: false,
    type: 'SERVICE',
    service: ['PARTICIPATE'],
  },
  {
    name: 'ADD',
    description: '',
    isActive: true,
    isPro: true,
    isNew: false,
    limit: 10,
    type: 'SERVICE',
    service: ['PARTICIPATE'],
  },
  {
    name: 'EXPLORE',
    description: '',
    isActive: true,
    isPro: true,
    isNew: true,
    type: 'CONTEXT',
    service: ['BROWSE'],
  },
]

describe('FeatureStatus', () => {
  describe('BROWSE feature', () => {
    it('should be available and unblocked whether paid or not', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'PAID',
        }).isBlocked()
      ).toBe(false)
    })
  })

  describe('PARTICIPATE feature', () => {
    it('should be blocked when unpaid and unblocked when paid', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
        }).isPro()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'UNPAID',
        }).isBlocked()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          suggestion: 'You can participate',
        }).isAvailableAndBlocked()
      ).toBe('You can participate')
    })
  })

  describe('EXPLORE feature', () => {
    it('should be new whether paid or unpaid', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'UNPAID',
        }).isNew()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'PAID',
        }).isNew()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'UNPAID',
        }).isReached(8)
      ).toBe(false)
    })
  })

  describe('ADD feature', () => {
    it('should be blocked when limit is reached and unblocked when paid', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
        }).isReached(8)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
        }).isReached(8)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
        }).isReached(10)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
        }).isReached(10)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
        }).isReached(12)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
        }).isReached(12)
      ).toBe(false)
    })
  })

  describe('REMOVE feature', () => {
    it('should be undefined but is blocked whether paid or not', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
        }).isPro()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
        }).isNew()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
        }).isBlocked()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
        }).isReached(3)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          suggestion: 'You can remove this feature',
        }).isAvailableAndBlocked()
      ).toBe(null)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          suggestion: 'You can remove this feature',
        }).isAvailableAndBlocked()
      ).toBe(null)
    })
  })
})
