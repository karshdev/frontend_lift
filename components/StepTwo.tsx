import { motion } from "framer-motion";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { useRouter } from "next/router"; // Import useRouter from Next.js

interface Question {
  id: number;
  question: string;
  videoUrl?: string;
}

export interface Interviewer {
  name: string;
  questions: Question[];
}

interface StepTwoProps {
  selectedInterviewer: Interviewer | null;
  setSelectedInterviewer: (interviewer: Interviewer) => void;
  setStep: (step: number) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  selectedInterviewer,
  setSelectedInterviewer,
  setStep,
}) => {
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const storedData = localStorage.getItem("selectedQuestion");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.interviewers) {
        setInterviewers(parsedData.interviewers);
      }
    }
  }, []);

  const handleInterviewerSelection = (interviewer: Interviewer) => {
    setSelectedInterviewer(interviewer);

    const questionsData = interviewer.questions.map((q) => ({
      question: q.question,
      videoUrl: q.videoUrl,
    }));
    localStorage.setItem(
      "selectedInterviewerQuestions",
      JSON.stringify(questionsData)
    );
  };

  const handleContinue = () => {
    const selectedQuestions = localStorage.getItem("selectedInterviewerQuestions");
    if (selectedQuestions) {
      Cookies.set("selectedInterviewerQuestions", selectedQuestions, { expires: 7 });
    }

    // Store the next step in localStorage or cookies before refreshing
    localStorage.setItem("currentStep", "3");

    // Redirect to /demo after handling the data
    router.push("/demo"); // Use the router.push method to navigate to /demo
  };

  // useEffect(() => {
  //   // Check if the page was refreshed and step info exists
  //   const currentStep = localStorage.getItem("currentStep");
  //   if (currentStep === "3") {
  //     setStep(3); // Navigate to Step 3
  //   }
  // }, [setStep]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-2"
      transition={{
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="max-w-lg mx-auto px-4 lg:px-0"
    >
      <h2 className="text-4xl font-bold text-[#1E2B3A]">And an interviewer</h2>
      <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
        Choose whoever makes you feel comfortable. You can always try again with
        another one.
      </p>
      <div>
        <RadioGroup
          value={selectedInterviewer}
          onChange={handleInterviewerSelection}
        >
          <RadioGroup.Label className="sr-only">
            Choose an interviewer
          </RadioGroup.Label>
          <div className="space-y-4">
            {interviewers.map((interviewer) => (
              <RadioGroup.Option
                key={interviewer.name}
                value={interviewer}
                className={({ checked, active }) =>
                  [
                    "relative cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm flex justify-between",
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "border-blue-500 ring-2 ring-blue-200" : "",
                  ].join(" ")
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center">
                      <div className="flex flex-col text-sm">
                        <RadioGroup.Label
                          as="span"
                          className="font-medium text-gray-900"
                        >
                          {interviewer.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="text-gray-500"
                        >
                          {interviewer.questions.length} Questions Available
                        </RadioGroup.Description>
                      </div>
                    </div>
                    <span
                      className={[ 
                        "pointer-events-none absolute -inset-px rounded-lg", 
                        active ? "border" : "border-2", 
                        checked ? "border-blue-500" : "border-transparent"
                      ].join(" ")}
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
        <button
          onClick={() => {
            localStorage.removeItem("selectedInterviewerQuestions");
            setStep(1);
          }}
          className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] active:scale-95 scale-100 duration-75"
          style={{
            boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
          }}
        >
          Previous step
        </button>

        <button
          onClick={handleContinue}
          className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] active:scale-95 scale-100 duration-75"
          style={{
            boxShadow:
              "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
          }}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default StepTwo;
