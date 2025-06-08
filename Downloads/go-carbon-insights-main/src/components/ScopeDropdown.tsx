
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Factory, Zap, Truck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const ScopeDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-teal-600">
          <span>Scope</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/scope1" className="flex items-center space-x-2 w-full">
            <Factory className="h-4 w-4 text-red-600" />
            <div>
              <div className="font-medium">Scope 1</div>
              <div className="text-xs text-gray-500">Direct Emissions</div>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/scope2" className="flex items-center space-x-2 w-full">
            <Zap className="h-4 w-4 text-orange-600" />
            <div>
              <div className="font-medium">Scope 2</div>
              <div className="text-xs text-gray-500">Purchased Energy</div>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/scope3" className="flex items-center space-x-2 w-full">
            <Truck className="h-4 w-4 text-teal-600" />
            <div>
              <div className="font-medium">Scope 3</div>
              <div className="text-xs text-gray-500">Value Chain</div>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ScopeDropdown;
