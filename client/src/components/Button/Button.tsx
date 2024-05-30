import { FC, MouseEventHandler } from 'react';
import { Loader } from '../Loader';

export interface IButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const Button: FC<IButtonProps> = ({
  type,
  title,
  onClick,
  isLoading,
  isDisabled,
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      data-variant={variant}
      data-size={size}
    >
      {isLoading ? <Loader color="white" /> : title}
    </button>
  );
};
