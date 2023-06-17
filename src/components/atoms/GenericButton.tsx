import { Button } from 'ui-neumorphism';

export default function GenericButton(props: { label: string; func: () => void; colour: string }) {
  return (
    <>
      {/* @ts-ignore */}
      <Button
        rounded
        onClick={props.func}
        bgColor={props.colour}
        size='large'
        style={{ paddingRight: '20px', paddingLeft: '20px', paddingTop: '15px', paddingBottom: '15px' }}
      >
        <span className='md:text-xl text-thick'>{props.label}</span>
      </Button>
    </>
  );
}
