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
    availabilityForServices: ['BROWSE', 'PARTICIPATE'],
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
    availabilityForServices: ['PARTICIPATE'],
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
    availabilityForServices: ['PARTICIPATE'],
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
    availabilityForServices: ['BROWSE'],
    proForServices: ['BROWSE'],
  },
  {
    name: 'EXPORT',
    description: '',
    isActive: true,
    isPro: false,
    isNew: false,
    type: 'ACTION',
    availabilityForEditors: ['figma', 'dev', 'figjam', 'penpot'],
    availabilityForServices: ['BROWSE', 'PARTICIPATE'],
    proForServices: [],
  },
  {
    name: 'IMPORT',
    description: '',
    isActive: true,
    isPro: true,
    isNew: true,
    limit: 5,
    type: 'ACTION',
    availabilityForEditors: ['figma', 'dev'],
    availabilityForServices: ['PARTICIPATE'],
    proForServices: ['PARTICIPATE'],
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

  describe('EXPORT feature', () => {
    it('should be available for both services and not be pro', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isPro()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(false)
    })

    it('should not be available in unsupported editors', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'slides',
        }).isActive()
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'sketch',
        }).isActive()
      ).toBe(false)
    })
  })

  describe('IMPORT feature', () => {
    it('should be pro and have limit restrictions', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isPro()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isNew()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isBlocked()
      ).toBe(false)
    })

    it('should respect limit when unpaid', () => {
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(3)
      ).toBe(false)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(5)
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isReached(10)
      ).toBe(false)
    })
  })

  describe('Service availability combinations', () => {
    it('should handle features available for multiple services', () => {
      // BROWSE feature is available for both BROWSE and PARTICIPATE services
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
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      // EXPORT feature is also available for both services
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'UNPAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPORT',
          planStatus: 'UNPAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)
    })

    it('should return false for isActive when currentService is not in availabilityForServices', () => {
      // PARTICIPATE feature is only available for PARTICIPATE service
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
          featureName: 'PARTICIPATE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(false)

      // ADD feature is only available for PARTICIPATE service
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'ADD',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(false)

      // EXPLORE feature is only available for BROWSE service
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'EXPLORE',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(false)

      // IMPORT feature is only available for PARTICIPATE service
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'BROWSE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(false)
    })
  })

  describe('Editor and service combination restrictions', () => {
    it('should respect both editor and service availability', () => {
      // IMPORT is only available for PARTICIPATE service and figma/dev editors
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figma',
        }).isActive()
      ).toBe(true)

      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'dev',
        }).isActive()
      ).toBe(true)

      // Should be false for unsupported editor
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'figjam',
        }).isActive()
      ).toBe(false)

      // Should be false for unsupported editor even if service is right
      expect(
        new FeatureStatus({
          features: features,
          featureName: 'IMPORT',
          planStatus: 'PAID',
          currentService: 'PARTICIPATE',
          currentEditor: 'penpot',
        }).isActive()
      ).toBe(false)
    })
  })
})
