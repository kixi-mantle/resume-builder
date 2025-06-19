import Image from "next/image";


export default function Navbar(){

    return (<nav className="fixed h-[4rem] top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b shadow-lg border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo on the left */}
      <div className="flex-shrink-0 flex items-center">
        <Image
        width={18}
        height={18}
          className="h-8 w-auto"
          src="/logo.png"
          alt="Logo"
        />
      </div>

      {/* User icon on the right */}
      <div className="flex items-center">
        <button className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300">
          <Image
           width={18}
        height={18}
            className="h-8 w-8 rounded-full"
            src="/logo.png" // Replace with user avatar
            alt="User"
          />
        </button>
      </div>
    </div>
  </div>
</nav>)
}