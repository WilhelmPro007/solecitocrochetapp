'use client';

export default function ProductSkeleton() {
  return (
    <div className="bg-white flex flex-col h-full animate-pulse border border-transparent">
      {/* Image Placeholder */}
      <div className="relative aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="w-20 h-20 bg-gray-200 rounded-full opacity-50" />
      </div>

      {/* Info Placeholder */}
      <div className="p-3 flex flex-col flex-1 gap-3">
        <div className="h-3 bg-gray-100 w-3/4 rounded" />
        <div className="h-3 bg-gray-50 w-1/2 rounded mb-2" />
        
        {/* Bottom Bar Placeholder */}
        <div className="mt-auto border border-gray-100 flex h-9 overflow-hidden">
           <div className="flex-1 bg-gray-50 border-r border-gray-100" />
           <div className="flex-1 bg-gray-100 border-r border-gray-100" />
           <div className="flex-1 bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
