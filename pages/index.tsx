import { useState } from "react";
import QuestionBox from "../components/QuestionBox";
import ProgressStepper from "../components/ProgressStepper";
import { Box } from "@mui/material";
import Header from "@/components/Header";

import questions from "../data/questions.json";
import { useRouter } from "next/router";

export type answerType = "yes" | "no" | "neutral" | null;

const Home = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(answerType)[]>(new Array(questions.length).fill(null));

  const handleAnswer = (answer: answerType) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push({
        pathname: "/results",
        query: { answers: JSON.stringify(answers) },
      });
    }

  };

  const handleStepClick = (step: number) => {
    setCurrentQuestion(step);
  };

  const containerWidth = 1000;
  const cardWidth = 800;
  const offset = (containerWidth - cardWidth) / 2 - currentQuestion * cardWidth;

  return (
    <>
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
        }}
      >

        <Header />

        <Box sx={{ width: containerWidth, overflow: "hidden", position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              transition: "transform 0.5s ease",
              transform: `translateX(${offset}px)`,
            }}
          >
            {questions.map((q, i) => (
              <QuestionBox
                key={i}
                questionIndex={i}
                questionText={q.description}
                questionTitle={q.title}
                onNext={handleAnswer}
                active={i === currentQuestion}
                maxQuestions={questions.length}
              />
            ))}
          </Box>
        </Box>

        <ProgressStepper
          currentIndex={currentQuestion}
          total={questions.length}
          answers={answers}
          onStepClick={handleStepClick}
        />
      </Box>
    </>
  );
};

export default Home;
