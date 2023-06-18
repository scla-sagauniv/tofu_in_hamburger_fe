export interface TypeOfRecipe {
  title: string;
  recipeUrl: string;
  imageUrl: string;
  foodImage_url: string;
  pickup: boolean;
  nickName: string;
  materials: string;
  materialIds: Array<number>;
  publishday: Date;
  rank: number;
  recipeIndication: string;
  recipeCost: string;
}
