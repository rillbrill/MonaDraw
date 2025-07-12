interface EmptyPageProps {
  label: string;
}

const EmptyPage = ({ label }: EmptyPageProps) => {
  return (
    <div className="flex flex-1 items-center justify-center text-3xl text-neutral-600">
      {label} (준비중)
    </div>
  );
};

export default EmptyPage; 