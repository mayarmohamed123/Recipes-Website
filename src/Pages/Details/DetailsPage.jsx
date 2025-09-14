import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, ChefHat } from "lucide-react";

export default function DetailsPage() {
  const { id } = useParams();

  function getMealData() {
    return axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["MealData", id],
    queryFn: getMealData,
    select: (data) => data.data.meals[0],
  });

  const meal = useMemo(() => {
    if (!data) return null;
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const name = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];
      if (name && name.trim() !== "") {
        ingredients.push({ name, measure });
      }
    }

    return {
      image: data.strMealThumb,
      name: data.strMeal,
      category: data.strCategory,
      area: data.strArea,
      instructions: data.strInstructions,
      ingredients,
    };
  }, [data]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!meal) return <div className="p-6">Meal not found</div>;

  return (
    <div className="flex-1">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to All Meals
        </Link>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <span className="px-3 py-1 bg-red-500 rounded-full text-sm font-semibold mb-2 inline-block">
              {meal.category}
            </span>
            <h1 className="text-4xl font-bold mb-2">{meal.name}</h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{meal.area}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>45 mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>4 servings</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold">Ingredients</h2>
              </div>
              <ul className="space-y-3">
                {meal.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-red-500 font-semibold">
                      {ingredient.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Cooking Instructions
              </h2>
              <div className="space-y-4">
                {meal.instructions.split(".").map((sentence, index) => {
                  if (sentence.trim() === "") return null;
                  return (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-red-200">
                      <p className="text-gray-800 leading-relaxed">
                        <span className="font-semibold text-red-500 mr-2">
                          {index + 1}.
                        </span>
                        {sentence.trim()}.
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
