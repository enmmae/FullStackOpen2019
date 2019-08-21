import React from 'react'
import ReactDOM from 'react-dom'

/* 1.1: kurssitiedot */
/* Refaktoroi sovelluksen koodi siten, että se koostuu kolmesta uudesta komponentista: */
/* Header, Content ja Total */

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

/* 1.2: kurssitiedot */
/* Refaktoroi vielä komponentti Content siten, että se renderöi ainoastaan kolme Part-nimistä komponenttia */

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

/* 1.3: kurssitiedot */
/* Siirrytään käyttämään sovelluksessamme oliota. Muuta komponentin App muuttujamäärittelyt */
/* ja muuta sovelluksen kaikkia osia niin, että se taas toimii */

/* 1.4: kurssitiedot */
/* Ja laitetaan oliot taulukkoon, eli muuta App:in muuttujamäärittelyjä vielä ja muuta sovelluksen kaikki osat vastaavasti */

/* 1.5: kurssitiedot step5 */
/* Viedään muutos vielä yhtä askelta pidemmälle, eli tehdään kurssista ja sen osista yksi Javascript-olio */

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))