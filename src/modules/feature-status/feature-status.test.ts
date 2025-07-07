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
    availabilityForEditors: ['figma', 'dev', 'figjam', 'slides', 'penpot'],
    proForServices: ['BROWSE'],
  },
  {
    name: 'PARTICIPATE',
    description: '',
    isActive: true,
    isPro: true,
    isNew: false,
    type: 'SERVICE',
    availabilityForEditors: ['figma', 'figjam'],
    proForServices: ['PARTICIPATE'],
  },
  {
    name: 'ADD',
    description: '',
    isActive: true,
    isPro: true,
    isNew: false,
    limit: 10,
    type: 'SERVICE',
    availabilityForEditors: ['figma', 'dev', 'figjam'],
    proForServices: ['PARTICIPATE'],
  },
  {
    name: 'EXPLORE',
    description: '',
    isActive: true,
    isPro: true,
    isNew: true,
    type: 'CONTEXT',
    availabilityForEditors: ['figma', 'dev'],
    proForServices: ['BROWSE'],
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
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
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
          currentEditor: 'figma',
        }).isPro()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
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
          currentEditor: 'dev',
        }).isNew()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'dev',
        }).isNew()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'dev',
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
          currentEditor: 'figma',
        }).isReached(8)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(8)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(10)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(10)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(12)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
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
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isPro()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isNew()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isReached(3)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
          suggestion: 'You can remove this feature',
        }).isAvailableAndBlocked()
      ).toBe(null)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'REMOVE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
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
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isReached(12)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'BROWSE',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(3)
      ).toBe(false)
    })
  })

  describe('Editor not in availabilityForEditors', () => {
    it('should return false for isActive when currentEditor is not in availabilityForEditors list', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'penpot',
        }).isActive()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figjam',
        }).isActive()
      ).toBe(false)
    })

    it('should return true for isActive when currentEditor is in availabilityForEditors list', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'dev',
        }).isActive()
      ).toBe(true)
    })
  })
})
