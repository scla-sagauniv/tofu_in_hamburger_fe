'use client';
import panImage from '@/assets/panImage.svg';
import GenericButton from '@/components/atoms/GenericButton';
import Header from '@/components/molecules/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Confirmation() {
  const router = useRouter();
  const handleSend = () => {
    console.log('the ingredients are sent!');
    // TODO: 自動的にreceive pageに遷移する？
    return null;
  };

  const handleDeleteIngredients = () => {
    console.log("Ingredients are deleted. The user'll be sent back to the send page.");
    router.push('/send');
    return null;
  };
  return (
    <>
      <div className='flex flex-col  min-h-screen min-w-screen md:justify-center items-center px-10 justify-start'>
        <Header title='' isSend={true} />
        <div className='w-full h-full flex md:flex-row flex-col grow md:items-end justify-center items-center md:px-10 relative'>
          <Image src={panImage} alt='' layout='full' objectFit='contain' className='w-5/6' />
          <div className='flex md:flex-col md:justify-start flex-row justify-center md:mt-0 mt-20'>
            <GenericButton label='蓋を閉じる' func={handleSend} colour='#FEF4EF' />
            <br className='md:block hidden'></br>
            <GenericButton label='鍋を空にする' func={handleDeleteIngredients} colour='#FEF4EF' />
            <br className='md:block hidden'></br>
          </div>
        </div>
      </div>
    </>
  );
}
