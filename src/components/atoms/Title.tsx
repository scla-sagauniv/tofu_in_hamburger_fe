export default function Title(props: { title: string }) {
  return (
    <>
      <h1 className='w-1/3 text-center text-3xl antialiased text-primary'>{props.title}</h1>
    </>
  );
}
