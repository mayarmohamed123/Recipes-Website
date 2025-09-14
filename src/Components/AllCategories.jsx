import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";

export default function AllCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  function getAllCategories() {
    return axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  }

  const { data = [] } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    select: (res) => res.data.meals.map((meal) => meal.strCategory),
  });

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {data.map((category) => (
        <Link
          to={`?c=${category}`}
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300
            bg-[hsl(0_0%_95%)] text-[hsl(0_0%_8%)]
            hover:bg-[hsl(14_100%_57%)] hover:text-white hover:scale-105 active:scale-95
            ${
              selectedCategory === category
                ? "bg-gradient-to-r from-[hsl(14_100%_57%)] to-[hsl(0_73%_60%)] text-white"
                : ""
            }
          `}
          style={{
            boxShadow:
              selectedCategory === category
                ? "0 8px 30px -4px hsl(14 100% 57% / 0.3)"
                : undefined,
          }}>
          {category}
        </Link>
      ))}
    </div>
  );
}
