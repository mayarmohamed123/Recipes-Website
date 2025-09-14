import React from "react";
import AllCategories from "../../Components/AllCategories";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import MealCard from "../../Components/MealCrad";

export default function HomePage() {
  let [serchParam] = useSearchParams();
  let category = serchParam.get("c");
  category = category ? category : "Beef";

  function getAllMeals() {
    return axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
  }

  const { data } = useQuery({
    queryKey: ["AllMeals", category],
    queryFn: getAllMeals,
    select: (data) => data.data.meals,
  });
  console.log(data);
  return (
    <div>
      <div
        className="my-12 text-center"
        style={{
          animation: "fade-in 0.6s ease-out both",
        }}>
        <h1
          className="text-5xl font-bold bg-clip-text text-transparent mb-4"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(14 100% 57%) 0%, hsl(0 73% 60%) 100%)",
          }}>
          Learn, Cook, Eat Your Food
        </h1>
        <p
          className="text-xl max-w-2xl mx-auto"
          style={{
            color: "hsl(0 0% 45%)",
          }}>
          Discover amazing recipes from around the world with detailed
          instructions and fresh ingredients
        </p>
      </div>
      <AllCategories />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}
