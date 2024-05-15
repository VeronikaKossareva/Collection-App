import { FC, MouseEventHandler } from 'react';

import './SegmentedSwitchOption.css';

export interface ISegmentedSwitchOptionProps {
  isActive: boolean;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SegmentedSwitchOption: FC<ISegmentedSwitchOptionProps> = ({
  isActive,
  title,
  onClick,
}) => {
  return (
    <button
      className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
      data-active={isActive}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
