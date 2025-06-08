
# Documentation Directory

This directory contains all project documentation and generated assets.

## Structure

```
docs/
├── README.md                    # This file
├── assets/                      # Images, diagrams, screenshots
├── pdfs/                        # Generated PDF documentation
│   ├── project-knowledge-v1.0.0.pdf
│   └── archive/                 # Previous versions
├── templates/                   # Documentation templates
└── scripts/                     # PDF generation scripts
```

## PDF Versioning

PDFs are generated with semantic versioning: `project-knowledge-v{major}.{minor}.{patch}.pdf`

### Current Versions
- **v1.0.0** - Initial comprehensive documentation (January 1, 2025)

### Archive Policy
- Keep latest 3 PDF versions in repository
- Older versions moved to archive/ directory
- Generation timestamp included in PDF metadata

## Update Process

1. Update PROJECT_KNOWLEDGE.md in repository root
2. Increment version number in metadata section
3. Update changelog with new information
4. Generate new PDF version
5. Archive previous version if needed

## Automation Ready

This documentation structure is prepared for CI/CD integration:
- Metadata headers for GitHub Actions parsing
- Consistent file naming for automated processing
- Version tracking for automated PDF generation
