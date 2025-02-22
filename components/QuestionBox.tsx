import React from "react";
import { Box, Typography, Card, CardContent, Button, Stack } from "@mui/material";
import { answerType } from "@/pages";

interface QuestionBoxProps {
  questionIndex: number;
  questionText: string;
  questionTitle: string;
  onNext: (answer: answerType) => void;
  active?: boolean;
  maxQuestions?: number;
  selectedAnswer?: boolean | null;

}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  maxQuestions,
  questionIndex,
  questionText,
  questionTitle,
  onNext,
  active = false,
  selectedAnswer,
}) => {
  const defaultSx = {
    borderColor: "white",
    color: "white",
    "&:hover": { bgcolor: "white", color: "black" },
    fontSize: "1rem",
    px: 2,
  };

  const activeStyle = {
    bgcolor: "white",
    color: "black",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        minWidth: "800px",
        maxWidth: "800px",
        flexShrink: 0,
      }}
    >
      <Card
        sx={{
          minWidth: "800px",
          maxWidth: "800px",
          bgcolor: "black",
          color: "white",
          border: "2px solid white",
          textAlign: "left",
          p: 2,
          position: "relative",
          overflow: "visible",
        }}
      >
        <CardContent sx={{ minWidth: "100%" }}>
          <Typography variant="body1" fontWeight="bold">
            {questionIndex + 1}
            {maxQuestions == undefined ? "" : "/" + maxQuestions}{" " + questionTitle}
          </Typography>
          <Typography variant="h5" mt={2} mb={3}>
            {questionText}
          </Typography>
          {active && (
            <>
              <Stack direction="row" justifyContent="left" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{ ...defaultSx, ...(selectedAnswer === true && activeStyle) }}
                  onClick={() => onNext("yes")}
                >
                  Stimme zu
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ...defaultSx, ...(selectedAnswer === null && activeStyle) }}
                  onClick={() => onNext("neutral")}
                >
                  Neutral
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ...defaultSx, ...(selectedAnswer === false && activeStyle) }}
                  onClick={() => onNext("no")}
                >
                  Stimme nicht zu
                </Button>
              </Stack>
              <Stack direction="row" justifyContent="right">
                <Button
                  sx={{
                    color: "white",
                    textTransform: "none",
                    mt: 2,
                    "&:hover": { color: "white" },
                    justifyContent: "right",
                  }}
                  onClick={() => onNext(null)}
                >
                  These überspringen →
                </Button>
              </Stack>
            </>
          )}
        </CardContent>
        <Box
          sx={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "10px solid white",
          }}
        />
      </Card>
    </Box>
  );
};

export default QuestionBox;
