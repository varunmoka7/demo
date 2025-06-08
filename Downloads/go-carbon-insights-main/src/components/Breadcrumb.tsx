
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNames: Record<string, string> = {
    dashboard: 'Dashboard',
    tracking: 'Emissions Tracking',
    scope1: 'Scope 1 Emissions',
    scope2: 'Scope 2 Emissions',
    scope3: 'Scope 3 Emissions',
    decarbonization: 'Decarbonization',
    reports: 'Reports',
    analysis: 'Analysis',
    methodology: 'Methodology',
    reference: 'Reference',
    profile: 'Profile'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      
      {pathnames.map((pathname, index) => {
        const isLast = index === pathnames.length - 1;
        const to = '/' + pathnames.slice(0, index + 1).join('/');
        const displayName = breadcrumbNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

        return (
          <React.Fragment key={pathname}>
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-foreground font-medium">{displayName}</span>
            ) : (
              <Link to={to} className="hover:text-foreground transition-colors">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
