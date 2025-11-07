export default function Loading() {
  return (
    <div className="h-screen bg-[#F5F7FA] pb-20">
      <header className="bg-linear-to-r from-[#A3D8C6] to-[#4A90E2] text-white p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white bg-opacity-20 rounded w-32 mb-2"></div>
          <div className="h-4 bg-white bg-opacity-20 rounded w-48"></div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="flex">
              <div className="w-48 h-32 bg-gray-200 rounded-lg mr-6"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
