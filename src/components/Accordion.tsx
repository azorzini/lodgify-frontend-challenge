/// <reference types="vite-plugin-svgr/client" />

import React, { useState } from 'react';
import ChevronDownIcon from '../assets/chevron-down.svg?react';
import TaskIcon from '../assets/task.svg?react';
import TaskCompletedIcon from '../assets/task-completed.svg?react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isCompleted: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, isCompleted }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => setIsOpen((prevState) => !prevState);

  return (
    <div className="border-b border-gray-200">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          {
            isCompleted ? <TaskCompletedIcon className="w-4 h-4" /> : <TaskIcon className="w-4 h-4" />
          }
          <h2 id={`accordion-title-${title}`} className={`text-lg font-normal ${isCompleted && 'text-[#02BC9C]'}`}>
            {title}
          </h2>
        </div>

        <button
          onClick={toggleAccordion}
          className="flex items-center gap-2 focus:outline-none"
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${title}`}
        >
          <span className="text-base text-[#999999]">{isOpen ? 'Hide' : 'Show'}</span>
          <ChevronDownIcon
            className={`w-3 h-5 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          id={`accordion-content-${title}`}
          className="px-4 pb-4 text-gray-700"
          aria-labelledby={`accordion-title-${title}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;