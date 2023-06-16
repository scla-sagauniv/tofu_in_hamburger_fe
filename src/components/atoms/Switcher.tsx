import Link from 'next/link';
export default function Switcher(props: { isSend: boolean }) {
  return (
    <>
      <p className='w-1/3 md:text-base text-xs text-neutral text-center'>
        <Link href='/send' className={props.isSend ? 'text-primary' : 'text-neutral hover:text-primary'}>
          送信側
        </Link>
        |
        <Link href='/receive' className={!props.isSend ? 'text-primary' : 'text-neutral hover:text-primary'}>
          受信側
        </Link>
      </p>
    </>
  );
}
