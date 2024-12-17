import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { RadioGroup } from "@headlessui/react";
import Link from "next/link";

export interface Question {
  name: string;
  description: string;
  difficulty: string;
  category:string;
  question:string
}

interface StepOneProps {
  questions: Question[];
  selected: Question;
  setSelected: (value: Question) => void;
  setStep: (step: number) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const StepOne: React.FC<StepOneProps> = ({ questions, selected, setSelected, setStep }) => {
  
  useEffect(() => {
    if (selected) {
      console.log("Selected question:", selected);
      localStorage.setItem("selectedQuestion", JSON.stringify(selected));
    }
  }, [selected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-1"
      transition={{
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="max-w-lg mx-auto px-4 lg:px-0"
    >
      <h2 className="text-4xl font-bold text-[#1E2B3A]">Select a question type</h2>
      <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
        We have hundreds of questions from top tech companies. Choose a type to get started.
      </p>
      <div>
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Select a question</RadioGroup.Label>
          <div className="space-y-4">
            {questions.map((question) => (
              <RadioGroup.Option
                key={question.name}
                value={question}
                className={({ checked, active }) =>
                  classNames(
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "border-blue-500 ring-2 ring-blue-200" : "",
                    "relative cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none flex justify-between"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className="flex items-center">
                      <span className="flex flex-col text-sm">
                        <RadioGroup.Label as="span" className="font-medium text-gray-900">
                          {question.category}
                        </RadioGroup.Label>
                        <RadioGroup.Description as="span" className="text-gray-500">
                          <span className="block">{question.description}</span>
                        </RadioGroup.Description>
                      </span>
                    </span>
                    <RadioGroup.Description
                      as="span"
                      className="flex text-sm ml-4 mt-0 flex-col text-right items-center justify-center"
                    >
                      <span className="text-gray-500">
                        {question.difficulty === "Easy" ? "✔️" : "🔒"}
                      </span>
                      <span className="font-medium text-gray-900">{question.difficulty}</span>
                    </RadioGroup.Description>
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-blue-500" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="flex gap-[15px] justify-end mt-8">
        <div>
          <Link
            href="/"
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            Back to home
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              setStep(2);
            }}
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:bg-opacity-80 no-underline flex gap-x-2 active:scale-95 scale-100 duration-75"
            style={{
              boxShadow:
                "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
            }}
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StepOne;