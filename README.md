![GitHub package.json version](https://img.shields.io/github/package-json/v/a-ng-d/figmug-utils?color=informational) ![GitHub last commit](https://img.shields.io/github/last-commit/a-ng-d/figmug-utils?color=informational) ![GitHub](https://img.shields.io/github/license/a-ng-d/figmug-utils?color=informational)

# Figmug Utils

A collection of lightweight, platform-agnostic utility modules designed to accelerate plugin development. These modules provide common functionalities that can be used across any JavaScript/TypeScript project, making them perfect for plugins, extensions, or any web application.

## Installation

```bash
npm install figmug-utils
# or
yarn add figmug-utils
```

## Available Modules

### Case Transformer

Convert strings between different case formats:

```typescript
import { Case } from 'figmug-utils'

const text = new Case('Hello World Example')
text.doSnakeCase() // 'hello_world_example'
text.doCamelCase() // 'helloWorldExample'
text.doPascalCase() // 'HelloWorldExample'
text.doKebabCase() // 'hello-world-example'
```

### Feature Status

Manage feature flags, access control, and cross-platform availability:

```typescript
import { FeatureStatus } from 'figmug-utils'

// Define your features with editor and service availability
const features = [
  {
    name: 'PREMIUM_EXPORT',
    description: 'Export to premium formats',
    isActive: true,
    isPro: true,
    isNew: false,
    limit: 10,
    type: 'ACTION',
    availabilityForEditors: ['figma', 'dev', 'figjam'],
    availabilityForServices: ['BROWSE', 'PARTICIPATE'],
    proForServices: ['PARTICIPATE']
  }
]

const feature = new FeatureStatus({
  features: features,
  featureName: 'PREMIUM_EXPORT',
  planStatus: 'UNPAID',
  currentService: 'PARTICIPATE',
  currentEditor: 'figma',
  suggestion: 'Upgrade to access premium export features'
})

// Check feature availability and restrictions
console.log(feature.isActive())    // true (feature is active and available for figma)
console.log(feature.isPro())       // true
console.log(feature.isBlocked())   // true (unpaid plan for pro feature)
console.log(feature.isReached(5))  // false (under limit)
console.log(feature.isReached(10)) // true (at limit for unpaid)

// Get suggestion when blocked
if (feature.isBlocked()) {
  console.log(feature.isAvailableAndBlocked()) // 'Upgrade to access premium export features'
}
```

**Key Features:**
- ✅ Cross-platform editor support (Figma, Dev Mode, FigJam, Slides, Penpot, etc.)
- 🎯 Service-specific availability control
- 💰 Pro/freemium plan management
- 📊 Usage limits and quota tracking
- 🚀 New feature flagging

### Class Names Utility

Clean conditional class name concatenation:

```typescript
import { doClassnames } from 'figmug-utils'

const classes = doClassnames([
  'button',
  isActive && 'active',
  isPrimary && 'primary',
  undefined,
  null,
]) // Returns: 'button active primary'
```

### Map Utilities

Transform and manipulate data structures:

```typescript
import { doMap } from 'figmug-utils'

// Transform arrays with conditional logic
const items = doMap([1, 2, 3, 4], (item) => 
  item % 2 === 0 ? item * 2 : null
) // Returns: [4, 8] (filtered out odd numbers)
```

### Scale Utilities

Handle scaling operations for design tools:

```typescript
import { doScale } from 'figmug-utils'

// Scale values with different algorithms
const scaled = doScale(100, 1.5, 'linear') // Returns: 150
```

## TypeScript Support

All modules come with comprehensive TypeScript definitions:

```typescript
// Feature types
interface Feature<T> {
  name: string
  description: string
  isActive: boolean
  isPro: boolean
  isNew: boolean
  limit?: number
  availabilityForEditors: Array<Editor>
  availabilityForServices: Array<T>
  proForServices: Array<T>
  type: 'SERVICE' | 'DIVISION' | 'ACTION' | 'CONTEXT'
}

type PlanStatus = 'UNPAID' | 'PAID' | 'NOT_SUPPORTED'

type Editor = 'figma' | 'dev' | 'dev_vscode' | 'figjam' | 'slides' | 'penpot' | 'sketch' | 'framer' | 'webflow'
```

## Why Figmug Utils?

- 🎯 **Platform Agnostic**: Works across all major design tools and development environments
- 🪶 **Lightweight**: Each module can be imported independently
- 📦 **Zero Dependencies**: Pure JavaScript implementations
- 🔒 **Type-Safe**: Written in TypeScript with full type definitions
- 🧪 **Well Tested**: Comprehensive test coverage with 100% statement coverage
- 🌐 **Cross-Platform**: Support for Figma, Dev Mode, FigJam, Slides, Penpot, Sketch, and more
- 🚀 **Feature Management**: Built-in support for feature flags, pro plans, and usage limits

## Advanced Usage Examples

### Cross-Platform Feature Management

```typescript
import { FeatureStatus } from 'figmug-utils'

// Define features for a multi-platform plugin
const pluginFeatures = [
  {
    name: 'AI_GENERATION',
    description: 'AI-powered content generation',
    isActive: true,
    isPro: true,
    isNew: true,
    limit: 5,
    type: 'SERVICE',
    availabilityForEditors: ['figma', 'figjam', 'penpot'],
    availabilityForServices: ['DESIGN', 'PROTOTYPE'],
    proForServices: ['DESIGN']
  }
]

// Check availability across different contexts
const checkFeature = (editor, service, plan) => {
  const feature = new FeatureStatus({
    features: pluginFeatures,
    featureName: 'AI_GENERATION',
    planStatus: plan,
    currentService: service,
    currentEditor: editor
  })
  
  return {
    available: feature.isActive(),
    blocked: feature.isBlocked(),
    isNew: feature.isNew(),
    limitReached: feature.isReached(3)
  }
}

// Usage examples
console.log(checkFeature('figma', 'DESIGN', 'UNPAID'))
// { available: true, blocked: true, isNew: true, limitReached: false }

console.log(checkFeature('sketch', 'DESIGN', 'PAID'))
// { available: false, blocked: false, isNew: true, limitReached: false }
```

### Combining Multiple Utilities

```typescript
import { Case, doClassnames, FeatureStatus } from 'figmug-utils'

// Transform feature names and create CSS classes
const createFeatureClasses = (featureName, status) => {
  const caseTransformer = new Case(featureName)
  const baseClass = caseTransformer.doKebabCase()
  
  return doClassnames([
    `feature-${baseClass}`,
    status.isActive() && 'active',
    status.isPro() && 'pro',
    status.isNew() && 'new',
    status.isBlocked() && 'blocked'
  ])
}
```

## Test Coverage

File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
All files           |     100 |    98.61 |     100 |     100
 case               |     100 |      100 |     100 |     100
  case.ts           |     100 |      100 |     100 |     100
 do-classnames      |     100 |      100 |     100 |     100
  do-classnames.ts  |     100 |      100 |     100 |     100
 do-map             |     100 |      100 |     100 |     100
  do-map.ts         |     100 |      100 |     100 |     100
 do-scale           |     100 |    95.45 |     100 |     100
  do-scale.ts       |     100 |    95.45 |     100 |     100
 feature-status     |     100 |      100 |     100 |     100
  feature-status.ts |     100 |      100 |     100 |     100

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build
```

## Contributing

We welcome contributions! Please see our contributing guidelines for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
