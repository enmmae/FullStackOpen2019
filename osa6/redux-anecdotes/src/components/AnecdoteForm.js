import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

/* 6.7: anekdootit, step5 */
/* Eriytä uuden anekdootin luominen omaksi komponentikseen nimeltään AnecdoteForm. */
/* Siirrä kaikki anekdootin luomiseen liittyvä logiikka uuteen komponenttiin. */

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('new anecdote')
    
    const content = event.target.content.value
    event.target.content.value = ''

    /* 6.17 anekdootit ja backend, step2 */
    /* Muuta uusien anekdoottien luomista siten, että anekdootit talletetaan backendiin. */

    props.createAnecdote(content)
    props.setNotification(`you created ${content}`, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

/* 6.13 paremmat anekdootit, step11 */
/* Tee sama (kuin 6.12. tehtiin AnecdoteList:lle) komponentille Filter ja AnecdoteForm. */

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
