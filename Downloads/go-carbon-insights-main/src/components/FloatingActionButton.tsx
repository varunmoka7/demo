
import React, { useState } from 'react';
import { Plus, FileText, BarChart3, Target, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      icon: FileText,
      label: 'Generate Report',
      action: () => navigate('/reports'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: BarChart3,
      label: 'Add Data Entry',
      action: () => navigate('/tracking'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Target,
      label: 'Set Target',
      action: () => navigate('/decarbonization'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Upload,
      label: 'Import Data',
      action: () => navigate('/tracking'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <Card className="mb-4 shadow-xl">
          <CardContent className="p-2 space-y-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start gap-3 ${action.color} text-white hover:text-white`}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
      
      <Button
        size="lg"
        className={`h-14 w-14 rounded-full shadow-lg transition-transform ${
          isOpen ? 'rotate-45' : 'hover:scale-105'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Quick actions"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FloatingActionButton;
