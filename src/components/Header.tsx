
import { User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold">A</span>
          </div>
          <h1 className="text-xl font-semibold">Airlogis</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
            <Settings className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm">François X</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
