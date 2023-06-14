import Title from '../atoms/Title';
import Switcher from '../atoms/Switcher';
export default function Header(props: { title: string; isSend: boolean }) {
  return (
    <>
      <div className='w-full pt-10 pb-20 flex justify-end'>
        <Title title={props.title} />
        <Switcher isSend={props.isSend} />
      </div>
    </>
  );
}
