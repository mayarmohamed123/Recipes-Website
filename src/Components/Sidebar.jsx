import React from "react";
import { Home, ChefHat } from "lucide-react";
import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div
      className="fixed left-0 top-0 h-full w-64 border-r shadow-[0_10px_40px_-10px_hsla(0,0%,0%,0.1)]"
      style={{
        backgroundColor: "hsl(222 47% 11%)",
        borderColor: "hsl(222 47% 20%)",
        color: "hsl(0 0% 95%)",
      }}>
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, hsl(14 100% 57%), hsl(24 100% 65%))",
            }}>
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">RecipeHub</h1>
            <p className="text-xs opacity-60">Culinary Excellence</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: "hsl(14 100% 57%)",
              color: "white",
              boxShadow: "0 4px 12px -3px hsl(14 100% 57% / 0.3)",
            }}>
            <Home className="w-5 h-5" />
            <span className="font-medium">All Meals</span>
          </Link>
        </nav>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-center text-xs opacity-40">
          <p>Discover amazing recipes</p>
          <p>from around the world</p>
        </div>
      </div>
    </div>
  );
}
