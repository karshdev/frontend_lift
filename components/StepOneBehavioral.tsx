import React from 'react';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: string;
  statusBgColor: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: 'Why this company?',
    description: 'Why do you want to work for Google?',
    tags: ['Product Management'],
    status: 'Completed',
    statusBgColor: '#F3FAF1',
  },
  {
    id: 2,
    title: 'What are you most proud of?',
    description: 'Tell me about the thing you are most proud of. Why is it so important to you?',
    tags: ['General'],
    status: 'Completed',
    statusBgColor: '#F3FAF1',
  },
  {
    id: 3,
    title: 'Tell me about yourself',
    description: 'Walk me through your resume, projects, and anything you feel is relevant to your story.',
    tags: ['Product Management'],
    status: 'Completed',
    statusBgColor: '#F3FAF1',
  },
  {
    id: 4,
    title: 'What are your strengths?',
    description: 'Tell me about your strengths and why you would make a strong candidate.',
    tags: ['Software Engineering'],
    status: 'Completed',
    statusBgColor: '#F3FAF1',
  },
  {
    id: 5,
    title: 'What are your weaknesses?',
    description: 'Tell me about your weaknesses, and how that has impacted your previous work.',
    tags: ['Product Management'],
    status: 'Completed',
    statusBgColor: '#F3FAF1',
  },
];

const StepOneBehavioral: React.FC = () => {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="mt-3 grid grid-cols-3 xl:grid-cols-3 gap-2"
    >
      {questions.map((question) => (
        <li
          key={question.id}
          className="list-none relative flex items-stretch text-left"
        >
          <div className="group relative w-full">
            <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
              <div className="relative flex h-full flex-col overflow-hidden">
                <div className="flex items-center text-left text-[#1a2b3b]">
                  <p>{question.title}</p>
                </div>
                <p className="text-wrap grow font-normal text-[7px]">
                  {question.description}
                </p>
                <div className="flex flex-row space-x-1">
                  {question.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50"
                    >
                      {tag}
                    </p>
                  ))}
                  <p
                    className={`inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[${question.statusBgColor}] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]`}
                  >
                    {question.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </motion.ul>
  );
};

export default StepOneBehavioral;
