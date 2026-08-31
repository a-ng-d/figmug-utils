# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-08-31

### Added

- Added `AllOr<T>` type (`Array<T> | 'all'`) so `availabilityForServices`, `availabilityForEditors`, `proForServices`, and `proForEditors` can be set to `'all'` instead of enumerating every possible value
- Added optional `proForEditors` field to `Feature<T>`, gating `isBlocked`/`isReached` by editor the same way `availabilityForEditors` gates `isActive`
- Extended `Editor` type with `chrome` and `web`
- Exported `AllOr`, `Editor`, and `PlanStatus` types from the package entry point

### Changed

- Updated Node version to 22 in the npm publish workflow and added an `npm` self-update step
- Reorganized `.gitignore` for clarity and consistency

### Removed

- Removed committed coverage report artifacts from version control

## [0.8.2] - 2026-03-06

### Changed

- Updated repository references from `a-ng-d` to `yelbolt` in `package.json`, `README.md`, and `CHANGELOG.md`

## [0.8.1] - 2026-02-26

### Changed

- Bumped version from `0.8.0` to `0.8.1`

## [0.8.0] - 2026-02-26

### Changed

- Renamed package from `@figmug/utils` to `@unoff/utils`
- Renamed repository from `figmug-utils` to `unoff-utils`
- Updated all internal references, README, and `package.json` accordingly
- Updated npm publish workflow to trigger on pull request closure

## [0.7.3] - 2026-02-26

### Changed

- Extended `Editor` type with additional platform values: `make`, `buzz`, `sites`, `penpot`, `sketch`, `framer`, `webflow`

## [0.7.2] - 2026-02-26

### Added

- Added `proForServices` support in `FeatureStatus` to restrict pro access to specific services

### Fixed

- Corrected `repository` field format in `package.json` to use a plain string

## [0.7.1] - 2026-02-26

### Changed

- Refactored `currentEditor` and `availabilityForEditors` to use the `Editor` union type instead of plain strings

## [0.7.0] - 2026-02-26

### Changed

- Expanded `availabilityForEditors` to support a broader set of editor values

## [0.6.0] - 2026-02-26

### Added

- Added `dev_vscode` as a valid value for `currentEditor` and `availabilityForEditors` in `FeatureStatus`

## [0.5.0] - 2026-02-26

### Added

- Initial release of `FeatureStatus` module with cross-platform editor and service availability control
- Added `doScale` module with easing support (`LINEAR`, `EASEIN/EASEOUT/EASEINOUT` variants for `SINE`, `QUAD`, and `CUBIC`)
- Added `doClassnames` module for conditional CSS class name concatenation
- Added `Case` module with `doSnakeCase`, `doCamelCase`, `doPascalCase`, and `doKebabCase` transformers
- Added `doMap` module for numeric range remapping
- Exported `Feature` and `Easing` TypeScript types

[0.9.0]: https://github.com/yelbolt/unoff-utils/compare/v0.8.2...v0.9.0
[0.8.2]: https://github.com/yelbolt/unoff-utils/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/yelbolt/unoff-utils/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/yelbolt/unoff-utils/compare/v0.7.3...v0.8.0
[0.7.3]: https://github.com/yelbolt/unoff-utils/compare/v0.7.2...v0.7.3
[0.7.2]: https://github.com/yelbolt/unoff-utils/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/yelbolt/unoff-utils/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/yelbolt/unoff-utils/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/yelbolt/unoff-utils/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/yelbolt/unoff-utils/releases/tag/v0.5.0
