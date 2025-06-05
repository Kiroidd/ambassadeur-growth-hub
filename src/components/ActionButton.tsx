
import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  gradient: string;
  onClick: () => void;
}

const ActionButton = ({ icon, title, gradient, onClick }: ActionButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className={`${gradient} text-white border-0 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2 w-full`}
    >
      {icon}
      <span>{title}</span>
    </Button>
  );
};

export default ActionButton;
