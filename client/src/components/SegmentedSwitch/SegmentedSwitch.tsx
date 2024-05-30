import { FC, ReactNode } from 'react';

export interface ISegmentedSwitchProps {
  children: ReactNode;
}

export const SegmentedSwitch: FC<ISegmentedSwitchProps> = ({ children }) => {
  return <div className="flex flex-row space-x-4">{children}</div>;
};
