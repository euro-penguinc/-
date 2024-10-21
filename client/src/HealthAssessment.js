// src/HealthAssessment.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@mui/material";

export default function HealthAssessment() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState("");

  const questions = [
    { id: 1, text: "최근 한 달 동안 식사를 거른 적이 있나요?", options: ["예", "아니오"] },
    { id: 2, text: "하루에 8시간 이상 수면을 취하고 있나요?", options: ["예", "아니오"] },
    { id: 3, text: "일주일에 3번 이상 운동을 하고 있나요?", options: ["예", "아니오"] },
    { id: 4, text: "스트레스를 많이 받고 있다고 느끼나요?", options: ["예", "아니오"] },
    { id: 5, text: "정기적으로 건강 검진을 받고 있나요?", options: ["예", "아니오"] },
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [step]: value });
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/assessment', {
        answers,
        additionalInfo,
      });
      console.log("AI Response:", response.data);
      alert("응답이 제출되었습니다!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const currentQuestion = questions[step - 1];

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold text-yellow-400">건강 자가 진단</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {step <= questions.length ? (
              <div>
                <label className="text-lg font-medium">{currentQuestion.text}</label>
                {currentQuestion.options.map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      value={option}
                      checked={answers[step] === option}
                      onChange={() => handleAnswer(option)}
                    />
                    {option}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <label>추가 정보</label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="건강에 관해 추가로 알려주고 싶은 정보가 있다면 여기에 작성해주세요."
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-4">
          {step < questions.length ? (
            <Button onClick={() => setStep(step + 1)} disabled={!answers[step]}>
              다음
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              제출
            </Button>
          )}
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)}>
              이전
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
