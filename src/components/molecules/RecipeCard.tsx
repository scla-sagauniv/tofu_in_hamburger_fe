import { Card, CardHeader, H6, Subtitle2, CardContent, CardAction, Button } from 'ui-neumorphism';
import Image from 'next/image';
import { Recipe } from '@/gen/ingredientRain_pb';

export default function RecipeCard(props: { recipe: Recipe }) {
  const openRecipe = (url: string) => {
    window.open(url, '_blank');
    console.log(url);
  };

  return (
    <>
      {/* @ts-ignore */}
      <Card className='p-3' key={props.recipe.id}>
        {/* @ts-ignore */}
        <CardHeader
          title={
            //@ts-ignore
            <H6>{props.recipe.title}</H6>
          }
          subtitle={
            //@ts-ignore
            <Subtitle2 secondary>{props.recipe.nickName}</Subtitle2>
          }
        />
        <div style={{ minHeight: '200px', position: 'relative' }}>
          <Image src={props.recipe.imageUrl} alt='' layout='fill' objectFit='contain' />
        </div>
        {/* @ts-ignore */}
        <CardContent className='h-1/3 overflow-y-auto'>
          <h2 className='text-thick'>おもな材料: {props.recipe.materials}</h2>
          <h2 className='text-thick'>費用目安: {props.recipe.recipeCost}</h2>
          <h2 className='text-thick'>調理時間: {props.recipe.recipeIndication}</h2>
          {/* <h2 className='text-thick'>詳細: </h2>
          <p className='text-thick text-xs'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque architecto reprehenderit magnam esse est id
            ipsum ut delectus. Consequuntur suscipit hic eum ea adipisci, illum sed iure saepe aperiam quia!
          </p> */}
        </CardContent>
        {/* @ts-ignore */}
        <CardAction className='flex justify-start p'>
          {/* @ts-ignore */}
          <Button onClick={() => openRecipe(props.recipe.recipeUrl)} rounded text color='#A492F9'>
            レシピを見る
          </Button>
          {/* @ts-ignore */}
          <Button rounded text color='#A492F9'>
            Bookmark
          </Button>
        </CardAction>
      </Card>
    </>
  );
}
