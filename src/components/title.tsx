export const TitleComponent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="text-4xl w-full justify-center flex my-8">{title}</div>
  );
};
