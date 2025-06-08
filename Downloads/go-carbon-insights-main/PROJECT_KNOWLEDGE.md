
# GoCarbonTracker - Project Knowledge Base

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Last Updated](https://img.shields.io/badge/last%20updated-2025--01--01-green.svg)
![Documentation Status](https://img.shields.io/badge/docs-comprehensive-brightgreen.svg)

## Table of Contents

- [Executive Summary](#executive-summary)
- [Project Metadata](#project-metadata)
- [Technical Architecture](#technical-architecture)
- [Component Documentation](#component-documentation)
- [API Reference](#api-reference)
- [Development Timeline](#development-timeline)
- [Configuration Guide](#configuration-guide)
- [Known Issues & Roadmap](#known-issues--roadmap)
- [Changelog](#changelog)

---

## Executive Summary

GoCarbonTracker is a comprehensive carbon emissions tracking and management platform designed to help organizations monitor, analyze, and reduce their environmental impact. The platform provides real-time emissions monitoring, industry benchmarking, and actionable insights for sustainability initiatives.

### Key Features
- **Multi-Scope Emissions Tracking**: Monitor Scope 1, 2, and 3 emissions with detailed breakdowns
- **Company Comparison**: Benchmark performance against industry peers
- **Science-Based Targets**: Set and track SBTi-aligned reduction targets
- **Decarbonization Planning**: Strategic planning tools for emission reduction
- **Comprehensive Reporting**: Automated compliance and progress reporting
- **Real-time Analytics**: Interactive dashboards and trend analysis

### Target Audience
- Sustainability professionals
- ESG managers
- Environmental compliance teams
- Corporate executives
- Industry analysts

---

## Project Metadata

| Property | Value |
|----------|-------|
| **Project Name** | GoCarbonTracker |
| **Version** | 1.0.0 |
| **Last Updated** | January 1, 2025 |
| **Repository** | [GitHub Repository](https://github.com/user/gocarbon-tracker) |
| **Live Demo** | [lovable.app deployment](https://lovable.dev/projects/6fcef7a7-25cd-4c8d-b7e1-5fdfbaf9a17b) |
| **License** | Proprietary |
| **Contributors** | Development Team |
| **Documentation Status** | Comprehensive |

---

## Technical Architecture

### Technology Stack

#### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x with tailwindcss-animate
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.26.2
- **State Management**: React Context + TanStack Query
- **Charts**: Recharts 2.12.7
- **Icons**: Lucide React 0.462.0

#### Backend & Database
- **Backend-as-a-Service**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage

#### Development & Deployment
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **Deployment**: Lovable Platform
- **Version Control**: Git with GitHub integration

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Supabase      │    │   External      │
│   (React)       │◄──►│   Backend       │◄──►│   APIs          │
│                 │    │                 │    │                 │
│ • Auth Pages    │    │ • PostgreSQL    │    │ • Industry Data │
│ • Dashboards    │    │ • Auth System   │    │ • Benchmarks    │
│ • Analytics     │    │ • Real-time     │    │ • Compliance    │
│ • Reports       │    │ • Storage       │    │   Frameworks    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Design Patterns

1. **Component Architecture**: Atomic design with reusable UI components
2. **State Management**: Context providers for global state, TanStack Query for server state
3. **Data Fetching**: Custom hooks with fallback to mock data
4. **Authentication**: Protected routes with context-based session management
5. **Responsive Design**: Mobile-first approach with Tailwind breakpoints

---

## Component Documentation

### Core Pages

#### Authentication System
- **Path**: `/auth`
- **Components**: `src/pages/Auth.tsx`
- **Features**: 
  - Email/username + password authentication
  - Sign up and sign in flows
  - Form validation and error handling
  - Automatic redirection after authentication

#### Dashboard
- **Path**: `/dashboard`
- **Components**: `src/pages/Dashboard.tsx`
- **Features**:
  - Overview of key emissions metrics
  - Company performance comparisons
  - Interactive charts and trends
  - Quick access to detailed analytics

#### Scope-Specific Pages
- **Scope 1**: `/scope1` - Direct emissions tracking
- **Scope 2**: `/scope2` - Energy-related emissions
- **Scope 3**: `/scope3` - Value chain emissions

#### Analysis & Reporting
- **Analysis**: `/analysis` - Deep-dive analytics
- **Reports**: `/reports` - Compliance and progress reports
- **Decarbonization**: `/decarbonization` - Strategic planning

### Key Components

#### Layout System
- **Layout.tsx**: Main application shell with navigation
- **ProtectedRoute.tsx**: Route protection for authenticated users
- **Breadcrumb.tsx**: Navigation breadcrumbs

#### Authentication
- **AuthContext.tsx**: Global authentication state management
- **LogoutButton.tsx**: User sign-out functionality

#### Data Visualization
- **EmissionChart.tsx**: Emissions trend visualization
- **InteractiveChart.tsx**: Interactive data exploration
- **MetricCard.tsx**: Key performance indicators

### Custom Hooks

#### Data Management
- **useCompanies.ts**: Company data with Supabase fallback
- **useScope1Data.ts**: Scope 1 emissions data
- **useScope2Data.ts**: Scope 2 emissions data
- **useScope3Data.ts**: Scope 3 emissions data
- **useSBTITargets.ts**: Science-based targets data

#### Supabase Integration
- **useSupabaseCompanies.ts**: Direct Supabase company queries
- **useSupabaseScope1.ts**: Scope 1 database queries
- **useSupabaseScope2.ts**: Scope 2 database queries
- **useSupabaseScope3.ts**: Scope 3 database queries
- **useSupabaseSBTI.ts**: SBTi targets and pathway data

---

## API Reference

### Database Schema

#### Core Tables

**companies**
```sql
- id (text, primary key)
- name (text, not null)
- industry (text)
- sector (text)
- carbon_footprint (integer)
- energy_consumption (integer)
- renewable_energy_percentage (integer)
- waste_generated (integer)
- description (text)
- top_carbon_footprints (array)
- created_at (timestamp)
- updated_at (timestamp)
```

**emissions_data**
```sql
- id (uuid, primary key)
- company_id (text, foreign key)
- year (integer, not null)
- scope1 (integer, not null)
- scope2 (integer, not null)
- scope3 (integer, not null)
- created_at (timestamp)
```

**sbti_targets**
```sql
- id (uuid, primary key)
- company_id (text, foreign key)
- baseline_year (integer)
- target_year (integer)
- near_term_target (text)
- long_term_target (text)
- near_term_2030_scope1_2 (integer)
- near_term_2030_scope3 (integer)
- current_progress_scope1_2 (integer)
- current_progress_scope3 (integer)
- progress_percentage (integer)
- status (text, default: 'committed')
- description (text)
- created_at (timestamp)
```

#### Scope-Specific Tables

**scope1_emissions**
```sql
- id (uuid, primary key)
- company_id (text, foreign key)
- year (integer, not null)
- source (text, not null)
- total_emissions (integer, not null)
- emissions_by_source (integer, not null)
- created_at (timestamp)
```

**scope2_emissions**
```sql
- id (uuid, primary key)
- company_id (text, foreign key)
- year (integer, not null)
- source (text, not null)
- total_emissions (integer, not null)
- emissions_by_source (integer, not null)
- location (text)
- percentage (text)
- created_at (timestamp)
```

**scope3_emissions**
```sql
- id (uuid, primary key)
- company_id (text, foreign key)
- year (integer, not null)
- category (text, not null)
- total_emissions (integer, not null)
- emissions_by_category (integer, not null)
- influence_factors (text)
- insights (text)
- created_at (timestamp)
```

### Authentication API

The application uses Supabase Auth with the following flows:

#### Sign Up
```typescript
const { error } = await supabase.auth.signUp({
  email: string,
  password: string,
  options: {
    data: {
      username: string,
      display_name: string
    }
  }
});
```

#### Sign In
```typescript
const { error } = await supabase.auth.signInWithPassword({
  email: string, // or username
  password: string
});
```

#### Sign Out
```typescript
await supabase.auth.signOut();
```

---

## Development Timeline

### Version 1.0.0 - Foundation (Current)
**Release Date**: January 1, 2025

#### Key Milestones
- ✅ **Project Setup**: React + TypeScript + Vite foundation
- ✅ **UI Framework**: shadcn/ui component library integration
- ✅ **Authentication**: Supabase Auth with email/username support
- ✅ **Database Schema**: Complete emissions tracking data model
- ✅ **Core Pages**: Dashboard, Scope tracking, Analysis pages
- ✅ **Data Visualization**: Recharts integration with interactive charts
- ✅ **Responsive Design**: Mobile-first responsive layouts
- ✅ **Mock Data**: Comprehensive fallback data system
- ✅ **Supabase Integration**: Database queries with fallback mechanisms

#### Features Delivered
- Multi-scope emissions tracking (Scope 1, 2, 3)
- Company comparison and benchmarking
- Science-based targets (SBTi) tracking
- Interactive dashboards and analytics
- Decarbonization strategy planning
- Comprehensive reporting system
- User authentication and session management
- Real-time data updates

### Planned Releases

#### Version 1.1.0 - Security Enhancement (Q1 2025)
- Row-Level Security (RLS) implementation
- User profile management
- Enhanced authentication security
- Data access controls

#### Version 1.2.0 - Advanced Analytics (Q2 2025)
- Predictive modeling
- AI-powered insights
- Advanced benchmarking
- Custom report builder

#### Version 2.0.0 - Enterprise Features (Q3 2025)
- Multi-tenant architecture
- API rate limiting
- Advanced integrations
- Workflow automation

---

## Configuration Guide

### Environment Setup

#### Prerequisites
- Node.js 18+ and npm
- Git for version control
- Modern web browser

#### Local Development Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd gocarbon-tracker
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
Supabase configuration is handled through the integrated client in `src/integrations/supabase/client.ts`.

4. **Start Development Server**
```bash
npm run dev
```

### Key Dependencies

#### Core Dependencies
- `react`: ^18.3.1 - UI framework
- `react-router-dom`: ^6.26.2 - Client-side routing
- `@supabase/supabase-js`: ^2.49.8 - Backend integration
- `@tanstack/react-query`: ^5.56.2 - Server state management

#### UI & Styling
- `tailwindcss`: Latest - Utility-first CSS framework
- `@radix-ui/*`: Various - Accessible UI primitives
- `lucide-react`: ^0.462.0 - Icon library
- `recharts`: ^2.12.7 - Data visualization

#### Development Tools
- `typescript`: Latest - Type safety
- `vite`: Latest - Build tool and dev server
- `eslint`: Latest - Code linting

### Build Configuration

The project uses Vite with the following key configurations:
- TypeScript compilation with strict mode
- Tailwind CSS processing
- Path aliases for clean imports (`@/` maps to `src/`)
- Hot module replacement for development

---

## Known Issues & Roadmap

### Current Limitations

#### Security Issues (CRITICAL)
- **Database Security**: No Row-Level Security (RLS) policies implemented
  - All authenticated users can access all company data
  - No user-company relationship enforcement
  - **Impact**: Data privacy and security compliance risk

- **Authentication Vulnerabilities**
  - Username authentication not fully functional
  - No user profile table for username-email mapping
  - Sensitive authentication events logged to console

#### Functional Limitations
- **Mock Data Dependency**: Heavy reliance on fallback mock data
- **Limited User Management**: No user profile or role management
- **No Data Validation**: Missing input sanitization and validation
- **Performance**: No caching strategy for frequently accessed data

### Immediate Priorities (Q1 2025)

1. **Security Hardening**
   - Implement comprehensive RLS policies
   - Create user profiles table with proper relationships
   - Fix username authentication flow
   - Add input validation and sanitization

2. **Data Management**
   - Reduce dependency on mock data
   - Implement proper error handling
   - Add data validation schemas
   - Optimize database queries

3. **User Experience**
   - Enhanced error messaging
   - Loading state improvements
   - Mobile experience optimization
   - Accessibility improvements

### Medium-term Roadmap (Q2-Q3 2025)

1. **Advanced Features**
   - Predictive emissions modeling
   - AI-powered reduction recommendations
   - Advanced benchmarking algorithms
   - Custom dashboard builder

2. **Integration Capabilities**
   - Third-party data sources
   - ERP system integrations
   - Automated data imports
   - API rate limiting and monitoring

3. **Enterprise Features**
   - Multi-tenant architecture
   - Advanced user roles and permissions
   - Audit logging and compliance
   - White-label customization

### Long-term Vision (2025+)

1. **Platform Evolution**
   - Marketplace for carbon solutions
   - Supply chain emissions tracking
   - Regulatory compliance automation
   - Carbon trading integration

2. **Technology Advancement**
   - Machine learning insights
   - Blockchain verification
   - IoT sensor integration
   - Real-time emissions monitoring

---

## Changelog

### Version 1.0.0 (January 1, 2025)
**Initial Release - Foundation**

#### 🎉 New Features
- **Complete Application Framework**
  - React 18 + TypeScript + Vite setup
  - shadcn/ui component library integration
  - Tailwind CSS responsive design system
  - React Router DOM navigation

- **Authentication System**
  - Supabase Auth integration
  - Email and username support
  - Sign up and sign in flows
  - Protected route implementation
  - Session management with AuthContext

- **Database Architecture**
  - Comprehensive PostgreSQL schema
  - Multi-scope emissions tracking tables
  - Company and user data models
  - Science-based targets (SBTi) support
  - Emissions source categorization

- **Core Application Pages**
  - Landing page with marketing content
  - Dashboard with key metrics overview
  - Scope 1, 2, 3 emissions tracking pages
  - Analysis and reporting interfaces
  - Decarbonization strategy planning
  - User profile management

- **Data Visualization**
  - Recharts integration for interactive charts
  - Emissions trend analysis
  - Company comparison visualizations
  - Progress tracking charts
  - Responsive chart components

- **Supabase Integration**
  - Real-time database queries
  - Custom hooks for data fetching
  - Mock data fallback system
  - TanStack Query for server state

#### 🔧 Technical Implementation
- **Component Architecture**: Modular, reusable components
- **State Management**: Context API + TanStack Query
- **Type Safety**: Comprehensive TypeScript coverage
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized bundle with Vite
- **Code Quality**: ESLint configuration

#### 📦 Dependencies Added
- Core: React, TypeScript, Vite
- UI: shadcn/ui, Tailwind CSS, Lucide icons
- Data: Supabase, TanStack Query, Recharts
- Routing: React Router DOM
- Forms: React Hook Form, Zod validation

#### 🐛 Known Issues
- RLS policies not implemented (security risk)
- Username authentication incomplete
- Heavy reliance on mock data
- Console logging of sensitive auth events
- No input validation or sanitization

---

*This document is automatically updated with each release. For the most current information, always refer to the latest version in the repository.*

---

**Document Metadata**
- Generated: January 1, 2025
- Version: 1.0.0
- Format: GitHub Flavored Markdown
- Automation Ready: Yes
- Last Validation: January 1, 2025
