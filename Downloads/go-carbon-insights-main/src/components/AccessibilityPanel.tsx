
import React, { useState } from 'react';
import { Settings, Sun, Moon, Eye, Type, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode, isHighContrast, toggleHighContrast, textScale, setTextScale } = useTheme();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open accessibility settings"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 z-50 w-80 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Accessibility Settings
            </CardTitle>
            <CardDescription>
              Customize your viewing experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span>Dark Mode</span>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>High Contrast</span>
              </div>
              <Switch checked={isHighContrast} onCheckedChange={toggleHighContrast} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Text Size</span>
                <span className="text-sm text-muted-foreground">({Math.round(textScale * 100)}%)</span>
              </div>
              <Slider
                value={[textScale]}
                onValueChange={(value) => setTextScale(value[0])}
                min={0.8}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <Keyboard className="h-3 w-3" />
                <span>Keyboard shortcuts:</span>
              </div>
              <div className="ml-5 space-y-1">
                <div>Alt + D: Toggle dark mode</div>
                <div>Alt + H: Toggle high contrast</div>
                <div>Alt + S: Open search</div>
                <div>Tab: Navigate elements</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AccessibilityPanel;
