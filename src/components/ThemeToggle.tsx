
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-accent"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
      )}
    </Button>
  );
};

export default ThemeToggle;
