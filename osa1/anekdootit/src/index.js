import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* 1.12*: anekdootit step1 */
/* Laajenna seuraavaa sovellusta siten, että siihen tulee nappi, jota painamalla sovellus */
/* näyttää satunnaisen ohjelmistotuotantoon liittyvän anekdootin */

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

/* 1.14*: anekdootit step3 /*
/* Ja sitten vielä lopullinen versio, joka näyttää eniten ääniä saaneen anekdootin */

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)

  /* 1.13*: anekdootit step2 */
  /* Laajenna sovellusta siten, että näytettävää anekdoottia on mahdollista äänestää */

  const handleVote = () => {
    props.points[selected] += 1
    setVote(vote+1)
  }

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  let mostVoted = props.points[0];
  let anecdote = 0
  for (let i = 0; i < props.points.length; i++) {
    if (mostVoted < props.points[i]) {
      mostVoted = props.points[i]
      anecdote = i
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br></br>
      has {props.points[selected]} votes<br></br>
      <Button handleClick={handleVote} text="vote"/>
      <Button handleClick={handleNext} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[anecdote]}<br></br>
      has {props.points[anecdote]} votes<br></br>
    </div>
  )
}

const points = new Uint8Array(6);

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)