import React, { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';

const ProgressBar: React.FC = () => {
  const { totalValue, checkedValue } = useContext(ProgressContext)!;

  const percentage = totalValue ? (checkedValue / totalValue) * 100 : 0;

  return (
    <div className="mt-4">
      <div className="w-full bg-[#E6FDF9] rounded-full h-6">
        {
          percentage >= 1 ? (
            <div
              className={"flex items-center justify-end bg-[#02BC9C] h-6 rounded-full"}
              style={{width: `${percentage}%`, minWidth: "35px", paddingRight: percentage >= 10 ? '16px' : '0'}}
            >
              <span className="text-base font-medium text-[#F2FBFA] px-1">
                {percentage.toFixed(0)}%
              </span>
            </div>
          ) : null
        }

      </div>
    </div>
  );
};

export default ProgressBar;