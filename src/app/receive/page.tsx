'use client';
import Header from '@/components/molecules/Header';
import RecipeCard from '@/components/molecules/RecipeCard';
import { useAppSelector } from '@/state/hooks/hooks';
import { selectGetIngredients } from '@/state/slices/ingredientSlice';
import { useClient } from '@/hooks/Client';
import { RecipeService } from '@/gen/ingredientRain_connect';
import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import { TypeOfRecipe } from '@/models/TypeOfRecipe.model';
import { useEffect, useState } from 'react';
import { Recipe, SearchRecipesByIngredientsRequest } from '@/gen/ingredientRain_pb';

export default function Receive() {
  const clientForRecipe = useClient(RecipeService);
  const ingredients = useAppSelector(selectGetIngredients);
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const result: Array<JSX.Element> = [];

  for (const el of recipes) {
    result.push(<RecipeCard recipe={el} />);
  }
  useEffect(() => {
    async (ingredients: Array<TypeOfIngredient>) => {
      const res = await clientForRecipe.searchRecipesByIngredients(
        new SearchRecipesByIngredientsRequest({
          ingredients: ingredients,
        }),
      );
      setRecipes(res.recipes);
    };
  }, []);

  return (
    <>
      <div className='flex flex-col min-h-screen min-w-screen md:justify-center items-center px-10 justify-start'>
        <Header title='提案されたレシピたちです♪' isSend={false} isReceive={true} />
        <div className='w-full h-full flex flex-col justify-center items-center lg:px-10'>
          <div className='lg:w-5/6 w-full h-full grid lg:grid-cols-3 lg:gap-10 md:grid-cols-2 grid-cols-1 gap-5'>
            {result}
          </div>
        </div>
      </div>
    </>
  );
}
