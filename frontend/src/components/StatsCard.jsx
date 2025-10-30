

export const StatsCard = ({ icon, label, value, change, color = "blue" }) => {
  const IconComponent = icon;
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    teal: "bg-teal-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <span>↑</span> {change}
            </p>
          )}
        </div>
        <div className={`${colors[color] ?? colors.blue} rounded-lg p-3`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};