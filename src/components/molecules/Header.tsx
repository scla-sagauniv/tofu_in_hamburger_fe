import Title from '../atoms/Title';
import Switcher from '../atoms/Switcher';
import GenericButton from '../atoms/GenericButton';
import { useRouter } from 'next/navigation';
export default function Header(props: { title: string; isSend: boolean; isReceive: boolean }) {
  const route = useRouter();
  const openLid = () => {
    console.log('Open the lid');
    route.push('/confirmation');
  };
  return (
    <>
      <div className='w-full pt-10 md:pb-20 pb-10 flex md:justify-end md:flex-row flex-col-reverse items-center'>
        {props.isReceive ? (
          <div className='w-1/3 flex justify-start'>
            <GenericButton label='<蓋を開ける' func={openLid} colour='#FEF4EF' />
          </div>
        ) : (
          ''
        )}
        <Title title={props.title} />
        <Switcher isSend={props.isSend} />
      </div>
    </>
  );
}
