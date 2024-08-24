import { twMerge } from 'tailwind-merge';

export const Button = ({
  className,
  children,
  disabled,
  name,
  ...props
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        `w-full flex justify-center py-2 px-4 border border-transparent
         rounded-md shadow-sm text-sm font-medium text-white bg-orange-600
          hover:bg-orange-800 focus:outline-none focus:ring-2
           focus:ring-offset-2 focus:ring-orange-500`,
        className,
      )}
      name={name}
      {...props}
    >
      {children}
    </button>
  );
};

interface Props extends React.DOMAttributes<HTMLButtonElement> {
  name?: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}
