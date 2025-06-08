
# PDF Generation Guide

## Manual Generation Process

Since this is the initial setup, PDF generation is currently manual. This document outlines the process for creating versioned PDFs from the PROJECT_KNOWLEDGE.md file.

### Tools Recommended

1. **Pandoc** (Recommended for automation)
```bash
pandoc PROJECT_KNOWLEDGE.md -o docs/pdfs/project-knowledge-v1.0.0.pdf --pdf-engine=wkhtmltopdf
```

2. **Online Markdown to PDF Converters**
   - GitPrint.com
   - Markdown PDF (VS Code extension)
   - Typora export

3. **Browser Print to PDF**
   - Open PROJECT_KNOWLEDGE.md in GitHub
   - Use browser's "Print to PDF" feature
   - Save with proper naming convention

### Version Management

1. **Before generating new PDF:**
   - Update version number in PROJECT_KNOWLEDGE.md
   - Update "Last Updated" badge
   - Add changelog entry

2. **After generating new PDF:**
   - Save as `project-knowledge-v{major}.{minor}.{patch}.pdf`
   - Move previous version to archive/ if keeping more than 3 versions
   - Update this README with new version info

### Metadata to Include

When generating PDFs, ensure the following metadata is included:
- Title: "GoCarbonTracker - Project Knowledge Base"
- Version: Current version number
- Generated: Current timestamp
- Author: Development Team

### Future Automation

This process is structured for future GitHub Actions automation:

```yaml
# Future workflow example
name: Generate Documentation PDF
on:
  push:
    paths:
      - 'PROJECT_KNOWLEDGE.md'
jobs:
  generate-pdf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate PDF
        run: |
          pandoc PROJECT_KNOWLEDGE.md -o docs/pdfs/project-knowledge-v$VERSION.pdf
```
