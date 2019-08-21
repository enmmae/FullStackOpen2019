import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

/* 6.2: unicafe revisited, step2 */
/* Toteuta sitten sovelluksen koko sen varsinainen toiminnallisuus. */

const App = () => {
  const handleClick = (type) => {
    store.dispatch({
      type
    })
  }

  return (
    <div>
      <button onClick={() => handleClick('GOOD')}>hyvä</button> 
      <button onClick={() => handleClick('OK')}>neutraali</button> 
      <button onClick={() => handleClick('BAD')}>huono</button>
      <button onClick={() => handleClick('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
