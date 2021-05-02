export interface DeployNotificationProps {}

const DeployNotification: React.FC<DeployNotificationProps> = () => {
  return (
    <div className="animate-notification fixed bottom-5 right-5 bg-gray-800 rounded text-gray-100 font-medium h-16 w-44 flex flex-row items-center justify-items-center px-4 py-2 shadow-lg">
      <div className="flex">Deployment running</div>
      <div className="animate-pulse w-8 h-8 bg-yellow-300 rounded-full flex-shrink-0 ml-3"></div>
    </div>
  );
};

export default DeployNotification;
