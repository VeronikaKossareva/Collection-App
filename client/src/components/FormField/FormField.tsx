import { FC, ReactNode } from 'react';

export interface IFormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  label,
  children,
  errorMessage,
}) => {
  return (
    <label className="flex flex-col">
      <span className="text-gray-700">{label}</span>

      {children}

      {errorMessage && (
        <span className="form-field__error">{errorMessage}</span>
      )}
    </label>
  );
};
