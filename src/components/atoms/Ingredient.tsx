import { Card } from 'ui-neumorphism';
import Image from 'next/image';
import pic from '../../assets/image_png.png';
export default function Ingredient() {
  return (
    <>
      <Card elevation={3} style={{ width: '80%', aspectRatio: '1/1', borderRadius: '50%', position: 'relative' }}>
        <Image src={pic} alt='Picture of the author' layout='fill' />
      </Card>
    </>
  );
}
