import { useRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import parties from "../data/parties.json";

interface PartyProps {
  party_id: string;
  party_name: string;
  questions: { [key: string]: string };
  description: string;
  description_title: string;
}

function Results() {
  const router = useRouter();
  const rawAnswers = router.query.answers;

  const userAnswers: string[] = useMemo(() => {
    if (!rawAnswers) return [];
    try {
      return JSON.parse(decodeURIComponent(rawAnswers as string));
    } catch {
      return [];
    }
  }, [rawAnswers]);

  const results = useMemo(() => {
    if (userAnswers.length === 0) return [];
    return parties
      .map((party: PartyProps) => {
        const partyAnswers = Object.values(party.questions);
        const score = partyAnswers.reduce((acc, partyAnswer, index) => {
          return acc + (partyAnswer === userAnswers[index] ? 1 : 0);
        }, 0);
        return { party: party.party_name, description_title: party.description_title, description: party.description, score, questions: party.questions };
      })
      .sort((a, b) => b.score - a.score); // Sortiert nach höchstem Score
  }, [userAnswers]);

  const maxScore = userAnswers.length || 1; // Verhindert Division durch 0
  const getPercentage = (score: number) => ((score / maxScore) * 100).toFixed(1);

  const [progressValues, setProgressValues] = useState<number[]>(new Array(parties.length).fill(0));

  useEffect(() => {
    if (results.length === 0) return;

    const intervals = results.map((result, i) => {
      const percentage = parseFloat(getPercentage(result.score));
      return setInterval(() => {
        setProgressValues((prev) => {
          const newProgress = [...prev];
          if (newProgress[i] < percentage) {
            newProgress[i] += 1;
          } else {
            clearInterval(intervals[i]);
          }
          return newProgress;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, [results]);

  if (userAnswers.length === 0 || results.length === 0) {
    return <Typography align="center">Lade Ergebnisse...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2, color: "white" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Wahlergebnis
      </Typography>
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Accordion sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography variant="h6">{result.party}</Typography>
                <Typography variant="h6">
                  <CountUp start={0} end={parseFloat(getPercentage(result.score))} duration={2.5} decimals={1} />%
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                sx={{
                    fontWeight: "bold",
                    mb: 1,
                    textAlign: "left",
                }}
                variant="body1" 
                gutterBottom>
                    {result.description_title}
                </Typography>
                <div 
                style={{
                    color: "white",
                    textAlign: "left",
                }}>
                    {result.description}
                </div>
            </AccordionDetails>
          </Accordion>

          <LinearProgress
            variant="determinate"
            value={progressValues[index]}
            sx={{
              height: 12,
              borderRadius: 0,
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Leicht grauer Hintergrund für Kontrast
              "& .MuiLinearProgress-bar": {
                backgroundColor: "white",
              },
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
}

export default Results;
