import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import QuestionOne from "./components/QuestionOne";
import QuestionTwo from "./components/QuestionTwo";
import QuestionThree from "./components/QuestionThree";
import Results from "./components/Results";
import LinkPage from "./components/LinkPage";
import PollingPage from "./components/PollingPage";
import PollingResults from "./components/PollingResults";
import "./App.css";

function App() {

  const [answers, setAnswers] = useState({
    answerOne: "",
    answerTwo: [],
    answerThree: [],
  });

  const setAnswerOne = (answerOne) => setAnswers({ ...answers, answerOne });
  const setAnswerTwo = (answerTwo) => setAnswers({ ...answers, answerTwo });
  const setAnswerThree = (answerThree) =>
    setAnswers({ ...answers, answerThree });

  return (
      <div className="background">
        <Nav />
        <Routes>
          <Route
            exact
            path="/"
            element={<QuestionOne clickHandler={setAnswerOne} />}
          />
          <Route
            path="/questiontwo"
            element={<QuestionTwo clickHandler={setAnswerTwo} />}
          />
          <Route
            path="/questionthree"
            element={
              <QuestionThree clickHandler={setAnswerThree}/>}
          />
          <Route
            path="/results"
            element={<Results answers={answers}/>}
          />
          <Route path="/linkpage" element={<LinkPage />} />
          <Route path="/poll/:alpha_numeric_id/results" element={<PollingResults />} />
          <Route path="/poll/:alpha_numeric_id" element={<PollingPage />} />
        </Routes>
        <Footer />
      </div>
  );
}
export default App;
