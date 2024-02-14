import spinner from '@/assets/image/loading.gif';

const Spinner = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-50 flex flex-col items-center justify-center bg-white/20 gap-5 ">
      <img src={spinner} className="w-10" />
    </div>
  );
};

export default Spinner;
