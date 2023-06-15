import Title from '../atoms/Title';
import Switcher from '../atoms/Switcher';
import GenericButton from '../atoms/GenericButton';
export default function Header(props: { title: string; isSend: boolean }) {
  const openLid = () => {
    console.log('Open the lid');
    return null;
  };
  return (
    <>
      <div className='w-full pt-10 pb-20 flex justify-end'>
        {!props.isSend ? (
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
