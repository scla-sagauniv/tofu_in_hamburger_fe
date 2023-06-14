import { Button } from 'ui-neumorphism';

export default function GenericButton(props: { label: string; func: () => void }) {
  return (
    <>
      <Button rounded onClick={props.func}>
        {props.label}
      </Button>
    </>
  );
}
