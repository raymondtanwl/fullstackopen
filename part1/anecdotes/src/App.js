import { useState } from "react";

const AnecdoteAndVote = ({ anecdote, votes }) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const MostVotes = ({ anecdotes, votes }) => {
  // console.log("MostVotes", anecdotes, votes);
  const maxVotes = Math.max(...votes);
  // get highest vote index
  const highestVoteIndex = votes.indexOf(maxVotes);
  // select by index
  const mostVotedAnecdote = anecdotes[highestVoteIndex];
  // console.log("MostVoted", mostVotedAnecdote, maxVotes);

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <AnecdoteAndVote
        anecdote={mostVotedAnecdote}
        votes={maxVotes}
      ></AnecdoteAndVote>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const scores = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState([...scores]);

  const randomise = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote = () => {
    votes[selected] += 1;
    setVotes([...votes]);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteAndVote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      ></AnecdoteAndVote>
      <button onClick={vote}>vote</button>
      <button onClick={randomise}>next anecdote</button>

      <MostVotes anecdotes={anecdotes} votes={votes}></MostVotes>
    </div>
  );
};

export default App;
