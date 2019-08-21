import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* 1.6: unicafe step1 */
/* Tee Unicafelle verkossa toimiva palautesovellus. Sovelluksen tulee näyttää jokaisen palautteen lukumäärä. */

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

/* 1.10: unicafe step5 */
/* Eriytä seuraavat kaksi komponenttia: Button ja Statistic */
/* Button vastaa yksittäistä palautteenantonappia | Statistic huolehtii tilastorivien näyttämisestä */

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

/* 1.7: unicafe step2 */
/* Laajenna sovellusta siten, että se näyttää palautteista enemmän statistiikkaa */

/* 1.8: unicafe step3 */
/* Refaktoroi sovelluksesi siten, että tilastojen näyttäminen on eriytetty oman komponentin Statistics vastuulle. */

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let all = good + neutral + bad

  /* 1.9: unicafe step4 */
  /* Muuta sovellusta siten, että numeeriset tilastot näytetään ainoastaan jos palautteita on jo annettu */
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  /* 1.11*: unicafe step6 */
  /* Toteuta tilastojen näyttäminen HTML:n taulukkona  */
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={(good*1 + bad*(-1)) / all}/>
        <Statistic text="positive" value={(good / all)*100}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <br></br>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)