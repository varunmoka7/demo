
import React, { useState, useEffect } from 'react';
import { Search, Building2, BarChart3, FileText, Target, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCompanies } from '@/hooks/useCompanies';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'company' | 'page' | 'metric' | 'report';
  path: string;
  icon: LucideIcon;
}

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { data: companies } = useCompanies();
  const navigate = useNavigate();

  const searchableItems: SearchResult[] = [
    // Pages
    { id: 'dashboard', title: 'Dashboard', description: 'Overview of emissions data', type: 'page', path: '/dashboard', icon: BarChart3 },
    { id: 'tracking', title: 'Emissions Tracking', description: 'Track and monitor emissions', type: 'page', path: '/tracking', icon: Target },
    { id: 'scope1', title: 'Scope 1 Emissions', description: 'Direct emissions reporting', type: 'page', path: '/scope1', icon: BarChart3 },
    { id: 'scope2', title: 'Scope 2 Emissions', description: 'Indirect energy emissions', type: 'page', path: '/scope2', icon: BarChart3 },
    { id: 'scope3', title: 'Scope 3 Emissions', description: 'Value chain emissions', type: 'page', path: '/scope3', icon: BarChart3 },
    { id: 'decarbonization', title: 'Decarbonization', description: 'Carbon reduction strategies', type: 'page', path: '/decarbonization', icon: Target },
    { id: 'reports', title: 'Reports', description: 'Generate and view reports', type: 'page', path: '/reports', icon: FileText },
    // Companies
    ...(companies?.map(company => ({
      id: company.id,
      title: company.name,
      description: `${company.industry} - ${company.sector}`,
      type: 'company' as const,
      path: `/dashboard?company=${company.id}`,
      icon: Building2
    })) || [])
  ];

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const filtered = searchableItems.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setResults(filtered);
  }, [query, companies]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <Button
        variant="outline"
        className="hidden lg:flex items-center gap-2 w-64 justify-start text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-4 w-4" />
        Search...
        <Badge variant="secondary" className="ml-auto">⌘K</Badge>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
          <Card className="w-full max-w-2xl mx-4">
            <CardContent className="p-0">
              <div className="border-b p-4">
                <Input
                  placeholder="Search companies, pages, metrics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-lg"
                  autoFocus
                />
              </div>
              
              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.map((result) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={result.id}
                        className="w-full p-4 hover:bg-muted text-left border-b last:border-0 flex items-center gap-3"
                        onClick={() => handleResultClick(result)}
                      >
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{result.title}</div>
                          <div className="text-sm text-muted-foreground truncate">{result.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {result.type}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              )}

              {query.length >= 2 && results.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No results found for "{query}"
                </div>
              )}

              <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground">
                Press <span className="px-1 py-0.5 bg-background rounded border text-xs font-mono">ESC</span> to close
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default GlobalSearch;
