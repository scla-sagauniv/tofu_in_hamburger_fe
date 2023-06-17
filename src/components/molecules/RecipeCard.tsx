import {
  Card,
  CardHeader,
  H6,
  Subtitle2,
  IconButton,
  CardMedia,
  CardContent,
  Body2,
  CardAction,
  Button,
} from 'ui-neumorphism';
import Image from 'next/image';

export default function RecipeCard() {
  return (
    <>
      {/* @ts-ignore */}
      <Card className='p-3'>
        <CardHeader
          title={
            //@ts-ignore
            <H6>トマト鍋</H6>
          }
          subtitle={
            //@ts-ignore
            <Subtitle2 secondary>tomato-nabe</Subtitle2>
          }
          //   action={
          //     <IconButton>
          //       <Icon path={mdiDotsVertical} size={1}></Icon>
          //     </IconButton>
          //   }
        />
        <div style={{ minHeight: '200px', position: 'relative' }}>
          <Image src='/tomato_nabe.png' alt='' layout='fill' objectFit='contain' />
        </div>
        {/* @ts-ignore */}
        <CardContent className='h-1/3 overflow-y-auto'>
          <h2 className='text-thick'>調理時間: 約15分</h2>
          <h2 className='text-thick'>費用目安: 500円前後</h2>
          <h2 className='text-thick'>カロリー: 300 kcal</h2>
          <h2 className='text-thick'>詳細: </h2>
          <p className='text-thick text-xs'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque architecto reprehenderit magnam esse est id
            ipsum ut delectus. Consequuntur suscipit hic eum ea adipisci, illum sed iure saepe aperiam quia!
          </p>
        </CardContent>
        {/* @ts-ignore */}
        <CardAction className='flex justify-start p'>
          {/* @ts-ignore */}
          <Button rounded text color='#A492F9'>
            レシピを見る
          </Button>
          {/* @ts-ignore */}
          <Button rounded text color='#A492F9'>
            Bookmark
          </Button>
          {/* <Spacer />
          <IconButton>
            <Icon path={mdiHeart} size={1}></Icon>
          </IconButton> */}
          {/* <IconButton>
            <Icon path={mdiShareVariant} size={1}></Icon>
          </IconButton> */}
        </CardAction>
      </Card>
    </>
  );
}
