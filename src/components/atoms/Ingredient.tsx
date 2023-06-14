import { Card } from 'ui-neumorphism';
import Image from 'next/image';
import pic from '../../assets/image_png.png';
export default function Ingredient() {
  return (
    <>
      <Card elevation={3} style={{ width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}>
        <Image src={pic} alt='Picture of the author' layout='responsive' />
      </Card>
    </>
  );
}
