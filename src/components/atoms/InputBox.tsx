import { Card, CardContent, Badge, IconButton, Fab, Button } from 'ui-neumorphism';
import Image from 'next/image';

import { TypeOfIngredient } from '@/models/TypeOfIngredient';
import pic from '../../assets/image_png.png';
import sendIcon from '../../assets/send-icon.svg';

export default function InputBox() {
  // グローバルに定義されたingredientsから値を取得
  // ***** mock data
  const ingredient: TypeOfIngredient = {
    name: 'チキン',
    url: pic,
    description:
      'おいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニクおいしいトリニク',
  };

  const handleSend = () => {
    console.log('the ingredients are sent!');
    return null;
  };

  return (
    <>
      <div className='w-full fixed bottom-5 left-0 right-0 flex justify-center items-center'>
        <Card
          elevation={3}
          style={{
            width: '70%',
            borderRadius: '50px',
            paddingTop: '10px',
            paddingRight: '30px',
            paddingBottom: '10px',
            paddingLeft: '30px',
            backgroundColor: '#EF9090',
            marginRight: '1%',
          }}
        >
          <Card
            elevation={3}
            inset
            style={{
              display: 'inline-block',
              width: '7%',
              aspectRatio: '1/1',
              borderRadius: '50%',
              position: 'relative',
              marginRight: '2%',
              backgroundColor: 'white',
            }}
          >
            <Image src={ingredient.url} alt='Picture of the author' layout='fill' objectFit='contain' />
            <IconButton
              rounded
              size='small'
              text={false}
              color='#5E5E5E'
              bgColor='#E4EBF5'
              className='absolute'
              style={{ top: '-7px', right: '-13px' }}
            >
              <span style={{ fontSize: '18px', margin: '1px 0px 0px 1px', fontWeight: 'bold' }}>&times;</span>
            </IconButton>
          </Card>
        </Card>
        <Button
          class='send_button'
          onClick={handleSend}
          bgColor='#EF9090'
          style={{ position: 'relative', width: '6%', height: '10%', aspectRatio: '1/1', borderRadius: '25px' }}
        >
          <Image src={sendIcon} alt='' layout='fill' objectFit='contain' className='p-5' />
        </Button>
      </div>
    </>
  );
}
