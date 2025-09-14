import { Link } from "react-router";
import { Eye } from "lucide-react";

export default function MealCard({ meal }) {
  return (
    <div
      className="p-5 bg-white rounded-xl overflow-hidden border border-gray-200 
                 shadow-md hover:shadow-xl transition-all duration-300 
                 hover:-translate-y-1 hover:scale-[1.02] group">
      {/* Image with overlay */}
      <div className="relative overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Title */}
      <h3
        className="font-bold text-lg mb-3 text-gray-800 text-center mt-2
                     group-hover:text-orange-500 transition-colors duration-200">
        {meal.strMeal}
      </h3>

      {/* View Button */}
      <Link
        to={`/meal/${meal.idMeal}`}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 
                     rounded-xl font-semibold text-sm text-white 
                     bg-gradient-to-r from-orange-500 to-red-500 
                     hover:scale-105 active:scale-95 transition-transform duration-300">
        <Eye className="w-4 h-4" />
        View Details
      </Link>
    </div>
  );
}
