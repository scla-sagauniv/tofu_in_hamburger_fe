import { TypeOfIngredient } from './TypeOfIngredient.model';

export interface Recipe {
  recipe_title: string;
  recipe_url: string;
  foodImage_url: string;
  pickup: boolean;
  nickName: string;
  recipe_ingredients: Array<TypeOfIngredient>;
  recipe_publication_day: Date;
  rank: number;
  recipe_description: string;
  recipe_cost: number;
}
