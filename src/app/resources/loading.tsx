export default function Loading() {
  return (
    <div className="h-screen bg-[#F5F7FA] pb-20">
      <header className="bg-linear-to-r from-[#4A90E2] to-[#A3D8C6] text-white p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white bg-opacity-20 rounded w-48 mb-2"></div>
          <div className="h-4 bg-white bg-opacity-10 rounded w-64"></div>
        </div>
      </header>
      
      <main className="p-6 space-y-6">
        <div className="card h-32 bg-white animate-pulse"></div>
        <div className="card h-24 bg-white animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card h-48 bg-white animate-pulse"></div>
          <div className="card h-48 bg-white animate-pulse"></div>
        </div>
      </main>
    </div>
  );
}
