
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle, Lock } from 'lucide-react';
import { SecurityAlert as SecurityAlertType } from '@/hooks/useSecurityValidation';

interface SecurityAlertProps {
  alert: SecurityAlertType;
  onDismiss?: () => void;
}

export const SecurityAlert: React.FC<SecurityAlertProps> = ({ alert, onDismiss }) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'rate_limit':
        return <AlertTriangle className="h-4 w-4" />;
      case 'suspicious_activity':
        return <Shield className="h-4 w-4" />;
      case 'unauthorized_access':
        return <Lock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (alert.severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Alert variant={getVariant()} className="mb-4">
      {getIcon()}
      <AlertTitle>Security Alert</AlertTitle>
      <AlertDescription>
        {alert.message}
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="ml-2 text-sm underline hover:no-underline"
          >
            Dismiss
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
};
