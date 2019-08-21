import React from 'react'

/* 2.5: erillinen moduuli */
/* Määrittele komponentti Course omana moduulinaan, jonka komponentti App importtaa */

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.name} exercises={props.exercises}/>
    </div>
  )
}

/* 2.2: kurssitiedot step7 */
/* Ilmoita myös kurssin yhteenlaskettu tehtävien lukumäärä */

/* 2.3*: kurssitiedot step8 */
/* Jos et jo niin tehnyt, laske koodissasi tehtävien määrä taulukon metodilla reduce */

const Total = (props) => {
  console.log(props)
  const exercises = props.parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return (
    <div>
      <strong>total of {exercises.reduce(reducer)} exercises</strong>
    </div>
  )
}

const Courses = (props) => {
  console.log(props)

  const rows = () => props.course.parts.map(part => 
    <Content key={part.id} name={part.name} exercises={part.exercises}/>
  )

  return (
    <div>
      <Header name={props.course.name}/>
      <div>
        {rows()}
      </div>
      <Total parts={props.course.parts}/>
    </div>
  )
}

/* 2.4: kurssitiedot step9 */
/* Laajennetaan sovellusta siten, että kursseja voi olla mielivaltainen määrä */

const Course = (props) => {
  return (
    <div>
      {props.courses.map((course, index) => <Courses key={index} course={course}/>)}
    </div>
  )
}

export default Course