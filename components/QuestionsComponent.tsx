import { useEffect, useState } from "react";

interface Question {
  id: number;
  category: string;
  interviewer: string;
  question: string;
}

const QuestionsComponent = ({ selected, selectedInterviewer }: any) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [displayedQuestion, setDisplayedQuestion] = useState<string>("");



  useEffect(() => {
    // Update the displayed question based on `selected` and `selectedInterviewer`
    const matchedQuestion =
    questions.find(
        (q) => q?.category === selected.name || q?.interviewer === selectedInterviewer.name
      ) || {
        question: "Default fallback question.",
      };

    setDisplayedQuestion(matchedQuestion.question);
  }, [selected, selectedInterviewer, questions]);

  return (
    <h2 className="text-lg font-semibold">
      {displayedQuestion}
    </h2>
  );
};

export default QuestionsComponent;
