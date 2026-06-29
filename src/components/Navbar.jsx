import { Link, useLocation } from "react-router-dom";
import { Search, FolderKanban, Sparkles, Info, Download } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";

export default function Navbar() {
  const location = useLocation();
  const { isInstallable, installApp } = usePWAInstall();

  const links = [
    { name: "Generate", path: "/", icon: Sparkles },
    { name: "Explorer", path: "/folder", icon: FolderKanban },
    { name: "Search", path: "/search", icon: Search },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              <Link to="/">THIRDEYE Prep</Link>
            </div>

            <div className="flex items-center space-x-8">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center space-x-2 text-sm font-medium transition-all ${
                      isActive ? "text-indigo-600" : "text-slate-500 hover:text-indigo-500"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              {isInstallable && (
                <button
                  onClick={installApp}
                  className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (Native App Feel) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? "text-indigo-600" : "text-slate-400"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "fill-indigo-50" : ""}`} />
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Mobile Install Banner (Optional, sits at top) */}
      {isInstallable && (
        <div className="md:hidden bg-indigo-600 text-white px-4 py-3 flex justify-between items-center text-sm shadow-md">
          <span className="font-medium">Get the native app experience</span>
          <button onClick={installApp} className="bg-white text-indigo-600 px-3 py-1 rounded-full font-bold">
            Install
          </button>
        </div>
      )}
    </>
  );
}