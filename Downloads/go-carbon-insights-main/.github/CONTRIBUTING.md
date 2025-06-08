
# Contributing to GoCarbonTracker

## Documentation Updates

When contributing to the project, please ensure documentation stays current:

### Updating Project Knowledge

1. **For new features:**
   - Add component documentation to PROJECT_KNOWLEDGE.md
   - Update the changelog section
   - Increment version number appropriately

2. **For bug fixes:**
   - Update known issues section if resolving listed issues
   - Add changelog entry
   - Increment patch version

3. **For architectural changes:**
   - Update technical architecture section
   - Revise component documentation
   - Update API reference if needed
   - Increment minor or major version

### Version Numbering

- **Major (x.0.0)**: Breaking changes, major new features
- **Minor (x.y.0)**: New features, non-breaking changes
- **Patch (x.y.z)**: Bug fixes, documentation updates

### Documentation Standards

- Use GitHub Flavored Markdown
- Include code examples where helpful
- Keep table of contents updated
- Use relative links for internal navigation
- Add timestamps to changelog entries

### PDF Generation

After significant documentation updates:
1. Generate new PDF version using docs/scripts/pdf-generator.md
2. Archive previous version if needed
3. Update version references in README files

## Code Contributions

- Follow TypeScript best practices
- Use existing component patterns
- Update component documentation for new features
- Include proper error handling
- Test authentication flows thoroughly

## Security Considerations

- Never commit sensitive information
- Update security documentation for new features
- Review authentication flows for vulnerabilities
- Document any new security considerations
