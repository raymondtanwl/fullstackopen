import { useState } from "react";

const roundToOneDecimal = (num) => {
  return Math.round(num * 10) / 10;
};

// Define the statistics portion
const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = all > 0 ? roundToOneDecimal((good - bad) / all) : 0;
  const positivePct = all > 0 ? roundToOneDecimal((good / all) * 100) : 0;

  return (
    <div>
      <h1>statistics</h1>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={good}></StatisticLine>
              <StatisticLine text="neutral" value={neutral}></StatisticLine>
              <StatisticLine text="bad" value={bad}></StatisticLine>
              <StatisticLine text="all" value={all}></StatisticLine>
              <StatisticLine text="average" value={average}></StatisticLine>
              <StatisticLine
                text="positive"
                value={positivePct + " %"}
              ></StatisticLine>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
