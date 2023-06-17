export default function Title(props: { title: string }) {
  return (
    <>
      <h1 className='md:w-1/3 w-full text-center md:text-3xl text-xl antialiased text-primary'>{props.title}</h1>
    </>
  );
}
