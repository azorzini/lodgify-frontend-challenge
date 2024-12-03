import React, { createContext, useState, useEffect } from "react";
import { ProgressItem } from "../types";

interface ProgressContextType {
  progressData: ProgressItem[];
  setProgressData: React.Dispatch<React.SetStateAction<ProgressItem[]>>;
  totalValue: number;
  checkedValue: number;
  calculateTotals: () => void;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                            children,
                                                                          }) => {
  const [progressData, setProgressData] = useState<ProgressItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const calculateTotals = () => {
    let total = 0;
    let checked = 0;

    progressData.forEach((section) => {
      section.tasks.forEach((task) => {
        total += task.value;
        if (task.checked) {
          checked += task.value;
        }
      });
    });

    setTotalValue(total);
    setCheckedValue(checked);
  };

  useEffect(() => {
    calculateTotals();
  }, [progressData]);

  return (
    <ProgressContext.Provider
      value={{
        progressData,
        setProgressData,
        totalValue,
        checkedValue,
        calculateTotals,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};