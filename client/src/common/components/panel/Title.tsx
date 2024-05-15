const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between sticky top-0 bg-primary p-5 rounded-lg z-10 w-full">
      <h1 className="text-primary text-lg lg:text-3xl">{title}</h1>
    </div>
  );
};

export default Title;
