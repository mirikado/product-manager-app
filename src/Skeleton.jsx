export default function SkeletonItem() {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl animate-pulse">
      <div className="w-16 h-16 bg-gray-300 rounded-xl" />

      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  );
}