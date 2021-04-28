export interface FullScreenLoaderProps {}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-3xl font-semibold text-gray-700">:)</div>
    </div>
  );
};

export default FullScreenLoader;
