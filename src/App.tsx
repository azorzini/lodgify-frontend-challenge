import React, { useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Accordion from './components/Accordion';
import TaskItem from './components/TaskItem';
import { ProgressContext } from './context/ProgressContext';
import { ProgressItem } from './types';
import ProgressBar from './components/ProgressBar';

const fetchProgressData = async (): Promise<ProgressItem[]> => {
  const response = await fetch(
    'https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress'
  );
  if (!response.ok) {
    throw new Error('There was an issue fetching progress data');
  }
  return response.json();
};

const App: React.FC = () => {
  const { progressData, setProgressData } = useContext(ProgressContext)!;
  const { data, isLoading, error } = useQuery<ProgressItem[], Error>({
    queryKey: ['fetchProgress'],
    queryFn: fetchProgressData,
  });

  useEffect(() => {
    if (data) {
      const dataWithIds = data.map((section, sectionIndex) => ({
        ...section,
        id: `section-${sectionIndex}`,
        tasks: section.tasks.map((task, taskIndex) => ({
          ...task,
          id: `section-${sectionIndex}-task-${taskIndex}`,
        })),
      }));
      setProgressData(dataWithIds);
    }
  }, [data, setProgressData]);

  const handleCheckboxChange = (taskId: string) => {
    setProgressData((prevData) =>
      prevData.map((section) => ({
        ...section,
        tasks: section.tasks.map((task) =>
          task.id === taskId ? { ...task, checked: !task.checked } : task
        ),
      }))
    );
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="flex justify-center bg-[#EEEEEE] min-h-screen py-8">
      <div className="w-full max-w-[820px] p-4 border h-full rounded-lg bg-white">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold mb-4 text-[#333333]">
            Lodgify Grouped Tasks
          </h1>
          <ProgressBar />
        </div>
        <div className="flex flex-col border rounded-lg bg-white">
          {progressData.map((section) => {
            const allTasksCompleted = section.tasks.every(
              (task) => task.checked
            );

            return (
              <Accordion
                key={section.id}
                title={section.name}
                isCompleted={allTasksCompleted}
              >
                <ul>
                  {section.tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                  ))}
                </ul>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;