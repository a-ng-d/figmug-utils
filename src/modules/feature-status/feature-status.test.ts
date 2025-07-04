import { describe, it, expect } from 'vitest'
import { Feature } from '@tps/feature.types'
import FeatureStatus from './feature-status'

const features: Array<Feature<'BROWSE' | 'PARTICIPATE'>> = [
  {
    name: 'BROWSE',
    description: '',
    isActive: true,
    isPro: false,
    isNew: false,
    limit: 2,
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
          currentService: 'BROWSE',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
        }).isReached(3)
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
          currentService: 'PARTICIPATE',
        }).isPro()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
        }).isBlocked()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
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
          currentService: 'BROWSE',
        }).isNew()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
        }).isNew()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
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
          currentService: 'PARTICIPATE',
        }).isReached(8)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
        }).isReached(8)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
        }).isReached(10)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
        }).isReached(10)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
        }).isReached(12)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
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
          currentService: 'BROWSE',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
        }).isPro()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
        }).isNew()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
        }).isBlocked()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
        }).isReached(3)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          suggestion: 'You can remove this feature',
        }).isAvailableAndBlocked()
      ).toBe(null)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          suggestion: 'You can remove this feature',
        }).isAvailableAndBlocked()
      ).toBe(null)
    })
  })

  describe('Service name not in feature', () => {
    it('should return false for isBlocked and isReached when currentService is not in feature service list', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
        }).isReached(12)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
        }).isReached(3)
      ).toBe(false)
    })
  })
})
