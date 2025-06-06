
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

const MetricCard = ({ title, value, subtitle, icon, gradient }: MetricCardProps) => {
  return (
    <div className={`${gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium opacity-90 mb-1">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="opacity-80">
          {icon}
        </div>
      </div>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
  );
};

export default MetricCard;
