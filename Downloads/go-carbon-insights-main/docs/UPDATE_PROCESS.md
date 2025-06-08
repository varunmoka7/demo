
# Documentation Update Process

## Overview

This document outlines the process for maintaining and updating the GoCarbonTracker project knowledge base.

## When to Update Documentation

### Immediate Updates Required
- New features or components added
- Breaking changes to existing functionality
- Security fixes or architectural changes
- API changes or new database schema
- Major bug fixes that affect documented behavior

### Regular Updates
- Version releases
- Performance improvements
- UI/UX changes
- Configuration updates
- Dependency updates

## Update Workflow

### 1. Content Updates

**For Feature Additions:**
```markdown
## [Feature Name] - [Date Added]

### Overview
Brief description of the new feature.

### Implementation
- Files modified/added
- Dependencies updated
- Configuration changes

### Usage
How to use the new feature.
```

**For Bug Fixes:**
```markdown
## [Issue Description] - [Date Resolved]

### Problem
Description of the issue that was resolved.

### Solution
How the issue was fixed.

### Files Changed
- List of modified files
```

### 2. Version Management

**Version Increment Rules:**
- **Patch (x.y.Z)**: Bug fixes, documentation updates, minor improvements
- **Minor (x.Y.0)**: New features, non-breaking changes, significant updates
- **Major (X.0.0)**: Breaking changes, major architectural changes

**Update Process:**
1. Increment version in PROJECT_KNOWLEDGE.md metadata table
2. Update "Last Updated" badge with current date
3. Add detailed changelog entry with date and changes
4. Generate new PDF if changes are significant

### 3. Changelog Format

```markdown
### Version X.Y.Z (Month Day, Year)
**Release Type - Brief Description**

#### 🎉 New Features
- Feature 1 description
- Feature 2 description

#### 🔧 Improvements
- Improvement 1
- Improvement 2

#### 🐛 Bug Fixes
- Fix 1 description
- Fix 2 description

#### ⚠️ Breaking Changes
- Breaking change 1
- Breaking change 2

#### 📦 Dependencies
- Added: package-name@version
- Updated: package-name@old-version → new-version
- Removed: package-name

#### 🔒 Security
- Security fix 1
- Security improvement 2
```

### 4. PDF Generation Process

**When to Generate New PDF:**
- Major version releases (X.0.0)
- Minor releases with significant changes (x.Y.0)
- Monthly for active development periods
- Before important milestones or reviews

**Steps:**
1. Ensure PROJECT_KNOWLEDGE.md is fully updated
2. Verify all links and formatting
3. Generate PDF using preferred method (see docs/scripts/pdf-generator.md)
4. Name file: `project-knowledge-v{version}.pdf`
5. Move previous PDF to archive if keeping >3 versions
6. Update docs/pdfs/README.md with new version info

### 5. Quality Assurance

**Before Publishing Updates:**
- [ ] All internal links work correctly
- [ ] Table of contents is updated
- [ ] Version numbers are consistent throughout
- [ ] Changelog entry is complete and dated
- [ ] Code examples are tested and accurate
- [ ] Screenshots/diagrams are current
- [ ] Grammar and spelling checked

**Review Checklist:**
- [ ] Technical accuracy verified
- [ ] No sensitive information included
- [ ] Formatting is consistent
- [ ] All sections are logically organized
- [ ] Cross-references are accurate

### 6. Automation Preparation

**GitHub Actions Ready Elements:**
```yaml
# Metadata that can be parsed by automation
name: "GoCarbonTracker"
version: "1.0.0"
last_updated: "2025-01-01"
documentation_status: "comprehensive"
```

**Structured Data for Parsing:**
- Consistent header formatting
- Standardized version strings
- Predictable changelog format
- Metadata in YAML frontmatter (future)

## Templates and Standards

### Component Documentation Template
```markdown
#### [Component Name]
- **Path**: `/path/to/component`
- **Purpose**: Brief description
- **Dependencies**: List of key dependencies
- **Props/Options**: Key configuration options
- **Usage Example**: Code snippet
- **Related Components**: Cross-references
```

### API Documentation Template
```markdown
#### [API Endpoint/Function]
**Purpose**: What this does
**Parameters**: 
- param1 (type): description
- param2 (type): description

**Returns**: Return type and description
**Example**:
```typescript
// Example usage
```
**Notes**: Any special considerations
```

## Collaboration Guidelines

### Multiple Contributors
- Use clear commit messages referencing documentation sections
- Coordinate major updates to avoid conflicts
- Use pull requests for significant documentation changes
- Tag documentation-related commits with [docs] prefix

### Review Process
- Technical accuracy review by development team
- Content review for clarity and completeness
- Final review before PDF generation
- Stakeholder review for major version releases

## Maintenance Schedule

### Weekly
- Review and update known issues
- Check for broken links
- Update progress on roadmap items

### Monthly
- Comprehensive review of all sections
- Generate new PDF if significant changes
- Archive old PDFs if needed
- Review and update contribution guidelines

### Quarterly
- Major version review
- Architecture documentation update
- Roadmap revision
- Process improvement review

---

**Process Version**: 1.0
**Last Updated**: January 1, 2025
**Next Review**: April 1, 2025
