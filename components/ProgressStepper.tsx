import { Stepper, Step, StepLabel, Box, Tooltip } from "@mui/material";
import { Check, Close, Circle, FiberManualRecord } from "@mui/icons-material";
import { useState } from "react";
import { answerType } from "@/pages";

interface ProgressStepperProps {
  currentIndex: number;
  total: number;
  answers: (answerType)[];
  onStepClick: (step: number) => void;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentIndex,
  total,
  answers,
  onStepClick,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
      <Stepper
        alternativeLabel
        sx={{
          width: "90%",
          "& .MuiStepConnector-root": { display: "none" },
        }}
      >
        {[...Array(total)].map((_, i) => {
          const isHovered = hoverIndex === i;
          const isCurrent = i === currentIndex;
          const isAnswered = answers[i] !== null;
          const isAccepted = answers[i] === "yes";
          const isRejected = answers[i] === "no";
          

          const icon = isHovered ? (
            isAccepted ? (
              <Check sx={{ color: "white", fontSize: "1.8rem", fontWeight: "bold" }} />
            ) : isRejected ? (
              <Close sx={{ color: "white", fontSize: "1.8rem", fontWeight: "bold" }} />
            ) : (
              <Circle sx={{ color: "white", fontSize: "1.8rem" }} />
            )
          ) : isAccepted ? (
            <Check sx={{ color: "white", fontSize: "1.5rem" }} />
          ) : isRejected ? (
            <Close sx={{ color: "white", fontSize: "1.5rem" }} />
          ) : isCurrent ? (
            <Circle sx={{ color: "white", fontSize: "1.8rem" }} />
          ) : (
            <FiberManualRecord sx={{transform: "translateY(10px);",  color: "gray", fontSize: "0.7rem" }} />
          );

          return (
            <Step
              key={i}
              completed={isAnswered}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Tooltip title={`These ${i + 1}`} arrow>
                <Box onClick={() => onStepClick(i)} sx={{ cursor: "pointer" }}>
                  <StepLabel
                    icon={icon}
                    sx={{
                      "& .MuiStepLabel-label": { display: "none" },
                    }}
                  />
                </Box>
              </Tooltip>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default ProgressStepper;
