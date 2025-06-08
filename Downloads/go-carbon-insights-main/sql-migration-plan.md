
# SQL Migration Plan for GoCarbonTracker

## Overview
This document outlines the SQL schema and migration strategy for the GoCarbonTracker platform using Supabase PostgreSQL.

## Core Schema Design

### 1. Companies Table
```sql
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    industry TEXT NOT NULL,
    sector TEXT,
    description TEXT,
    headquarters_country TEXT,
    headquarters_city TEXT,
    employee_count INTEGER,
    revenue_usd BIGINT,
    website_url TEXT,
    logo_url TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_name ON companies(name);
```

### 2. Emissions Data Table
```sql
CREATE TABLE public.emissions_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    reporting_year INTEGER NOT NULL,
    scope1_emissions DECIMAL(12,2) NOT NULL DEFAULT 0,
    scope2_emissions DECIMAL(12,2) NOT NULL DEFAULT 0,
    scope3_emissions DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_emissions DECIMAL(12,2) GENERATED ALWAYS AS (scope1_emissions + scope2_emissions + scope3_emissions) STORED,
    energy_consumption_mwh DECIMAL(12,2),
    renewable_energy_percentage DECIMAL(5,2),
    waste_generated_tons DECIMAL(10,2),
    water_consumption_m3 DECIMAL(12,2),
    methodology_notes TEXT,
    verification_status TEXT CHECK (verification_status IN ('verified', 'self-reported', 'estimated')),
    data_quality_score INTEGER CHECK (data_quality_score >= 1 AND data_quality_score <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    UNIQUE(company_id, reporting_year)
);

-- Indexes
CREATE INDEX idx_emissions_company_year ON emissions_data(company_id, reporting_year);
CREATE INDEX idx_emissions_year ON emissions_data(reporting_year);
```

### 3. Science-Based Targets Table
```sql
CREATE TABLE public.sbti_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('near-term', 'long-term', 'net-zero')),
    scope TEXT NOT NULL CHECK (scope IN ('scope1', 'scope2', 'scope1+2', 'scope3', 'all')),
    baseline_year INTEGER NOT NULL,
    target_year INTEGER NOT NULL,
    reduction_percentage DECIMAL(5,2) NOT NULL,
    target_description TEXT NOT NULL,
    commitment_date DATE,
    validation_status TEXT CHECK (validation_status IN ('approved', 'committed', 'targets-set')),
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    last_progress_update DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX idx_sbti_company ON sbti_targets(company_id);
CREATE INDEX idx_sbti_target_year ON sbti_targets(target_year);
```

### 4. Framework Compliance Table
```sql
CREATE TABLE public.framework_compliance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    framework_name TEXT NOT NULL CHECK (framework_name IN ('SBTI', 'CSRD', 'CDP', 'UNGC', 'SDG', 'TCFD', 'GRI')),
    compliance_status BOOLEAN NOT NULL DEFAULT false,
    participation_level TEXT, -- e.g., 'A-List', 'Management', 'Disclosure'
    score_value DECIMAL(5,2),
    score_scale TEXT, -- e.g., 'A-D', '0-100', '1-5'
    certification_date DATE,
    expiry_date DATE,
    certificate_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    UNIQUE(company_id, framework_name)
);

-- Indexes
CREATE INDEX idx_framework_company ON framework_compliance(company_id);
CREATE INDEX idx_framework_name ON framework_compliance(framework_name);
```

### 5. Emission Sources Table (Scope 1, 2, 3 breakdown)
```sql
CREATE TABLE public.emission_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    reporting_year INTEGER NOT NULL,
    emission_scope INTEGER NOT NULL CHECK (emission_scope IN (1, 2, 3)),
    source_category TEXT NOT NULL,
    source_subcategory TEXT,
    emissions_tco2e DECIMAL(12,2) NOT NULL,
    percentage_of_scope DECIMAL(5,2),
    calculation_method TEXT,
    activity_data JSONB, -- Flexible storage for different activity data types
    emission_factor DECIMAL(10,6),
    emission_factor_unit TEXT,
    emission_factor_source TEXT,
    location TEXT, -- For Scope 2 location-based vs market-based
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX idx_emission_sources_company_year ON emission_sources(company_id, reporting_year);
CREATE INDEX idx_emission_sources_scope ON emission_sources(emission_scope);
```

### 6. Benchmark Data Table
```sql
CREATE TABLE public.industry_benchmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    industry TEXT NOT NULL,
    region TEXT NOT NULL DEFAULT 'global',
    benchmark_year INTEGER NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(12,2) NOT NULL,
    metric_unit TEXT NOT NULL,
    percentile_25 DECIMAL(12,2),
    percentile_50 DECIMAL(12,2),
    percentile_75 DECIMAL(12,2),
    percentile_90 DECIMAL(12,2),
    data_source TEXT,
    methodology_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    UNIQUE(industry, region, benchmark_year, metric_name)
);

-- Indexes
CREATE INDEX idx_benchmarks_industry ON industry_benchmarks(industry);
CREATE INDEX idx_benchmarks_year ON industry_benchmarks(benchmark_year);
```

### 7. Emission Factors Table
```sql
CREATE TABLE public.emission_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factor_type TEXT NOT NULL, -- 'electricity', 'fuel', 'transport', etc.
    region_country TEXT NOT NULL,
    activity_unit TEXT NOT NULL, -- 'kWh', 'liter', 'km', etc.
    co2_factor DECIMAL(10,6) NOT NULL,
    ch4_factor DECIMAL(10,6) DEFAULT 0,
    n2o_factor DECIMAL(10,6) DEFAULT 0,
    total_co2e_factor DECIMAL(10,6) NOT NULL,
    source_organization TEXT NOT NULL,
    source_document TEXT,
    valid_from DATE NOT NULL,
    valid_to DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX idx_emission_factors_type_region ON emission_factors(factor_type, region_country);
CREATE INDEX idx_emission_factors_valid_period ON emission_factors(valid_from, valid_to);
```

### 8. User Management Tables
```sql
-- User profiles (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'analyst', 'admin', 'super_admin')),
    company_id UUID REFERENCES companies(id),
    department TEXT,
    job_title TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Company-User associations for multi-company access
CREATE TABLE public.user_company_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    access_level TEXT NOT NULL CHECK (access_level IN ('read', 'write', 'admin')),
    granted_by UUID REFERENCES user_profiles(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(user_id, company_id)
);
```

## Row Level Security (RLS) Policies

### Companies Table Policies
```sql
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to public companies
CREATE POLICY "Public companies are viewable by everyone" 
    ON companies FOR SELECT 
    USING (is_public = true);

-- Allow authenticated users to view companies they have access to
CREATE POLICY "Users can view accessible companies" 
    ON companies FOR SELECT 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_company_access 
            WHERE company_id = companies.id
        )
    );
```

### Emissions Data Policies
```sql
ALTER TABLE emissions_data ENABLE ROW LEVEL SECURITY;

-- Users can view emissions data for companies they have access to
CREATE POLICY "Users can view company emissions data" 
    ON emissions_data FOR SELECT 
    USING (
        company_id IN (
            SELECT company_id FROM user_company_access 
            WHERE user_id = auth.uid()
        )
    );

-- Users with write access can insert/update emissions data
CREATE POLICY "Users can modify company emissions data" 
    ON emissions_data FOR ALL 
    USING (
        company_id IN (
            SELECT company_id FROM user_company_access 
            WHERE user_id = auth.uid() AND access_level IN ('write', 'admin')
        )
    );
```

## Database Functions and Triggers

### Automatic Timestamp Updates
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_companies_updated_at 
    BEFORE UPDATE ON companies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emissions_data_updated_at 
    BEFORE UPDATE ON emissions_data 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Data Validation Functions
```sql
-- Validate emissions data consistency
CREATE OR REPLACE FUNCTION validate_emissions_data()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure emissions values are non-negative
    IF NEW.scope1_emissions < 0 OR NEW.scope2_emissions < 0 OR NEW.scope3_emissions < 0 THEN
        RAISE EXCEPTION 'Emissions values cannot be negative';
    END IF;
    
    -- Ensure reporting year is reasonable
    IF NEW.reporting_year < 1990 OR NEW.reporting_year > EXTRACT(YEAR FROM CURRENT_DATE) + 1 THEN
        RAISE EXCEPTION 'Reporting year must be between 1990 and next year';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER validate_emissions_before_insert_update 
    BEFORE INSERT OR UPDATE ON emissions_data 
    FOR EACH ROW EXECUTE FUNCTION validate_emissions_data();
```

## Views for Common Queries

### Company Summary View
```sql
CREATE VIEW company_summary AS
SELECT 
    c.id,
    c.name,
    c.industry,
    c.sector,
    c.description,
    COALESCE(latest_emissions.total_emissions, 0) as latest_total_emissions,
    latest_emissions.reporting_year as latest_reporting_year,
    sbti.has_sbti_target,
    frameworks.framework_count
FROM companies c
LEFT JOIN (
    SELECT DISTINCT ON (company_id) 
        company_id, total_emissions, reporting_year
    FROM emissions_data 
    ORDER BY company_id, reporting_year DESC
) latest_emissions ON c.id = latest_emissions.company_id
LEFT JOIN (
    SELECT company_id, count(*) > 0 as has_sbti_target
    FROM sbti_targets 
    GROUP BY company_id
) sbti ON c.id = sbti.company_id
LEFT JOIN (
    SELECT company_id, count(*) as framework_count
    FROM framework_compliance 
    WHERE compliance_status = true
    GROUP BY company_id
) frameworks ON c.id = frameworks.company_id;
```

## Migration Execution Plan

### Phase 1: Core Structure
```sql
-- 1. Create core tables
-- 2. Set up basic RLS policies
-- 3. Create essential indexes
-- 4. Add basic validation triggers
```

### Phase 2: Data Population
```sql
-- 1. Create staging tables for data import
-- 2. Import seed data for companies
-- 3. Import historical emissions data
-- 4. Import framework compliance data
-- 5. Validate data integrity
```

### Phase 3: Advanced Features
```sql
-- 1. Create benchmark tables
-- 2. Add emission factor tables
-- 3. Create user management tables
-- 4. Set up comprehensive RLS
-- 5. Add real-time subscriptions
```

## Backup and Recovery Strategy

### Daily Backups
- Automated daily database backups
- Point-in-time recovery capability
- Cross-region backup replication

### Migration Rollback Plan
- Version-controlled migration scripts
- Rollback procedures for each migration
- Data validation checkpoints

## Performance Optimization

### Indexing Strategy
- Primary key indexes (automatic)
- Foreign key indexes
- Query-specific composite indexes
- Partial indexes for filtered queries

### Query Optimization
- Materialized views for complex aggregations
- Query plan analysis and optimization
- Connection pooling configuration

---

*This SQL migration plan provides the foundation for a robust, scalable database schema supporting the GoCarbonTracker platform.*
