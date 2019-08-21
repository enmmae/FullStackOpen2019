import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer' 

/* 6.8: anekdootit, step6 */
/* Eriytä anekdoottilistan näyttäminen omaksi komponentikseen nimeltään AnecdoteList. */
/* Siirrä kaikki anekdoottien äänestämiseen liittyvä logiikka uuteen komponenttiin. */

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.addVote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`, 5000)
  }

  return (
    <div>
      <br></br>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* 6.15* paremmat anekdootit, step13 */
/* Välitä komponentille AnecdoteList connectin avulla ainoastaan yksi stateen liittyvä propsi, */
/* filtterin tilan perusteella näytettävät anekdootit samaan tapaan kuin materiaalin luvussa Presentational/Container revisited. */

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

/* 6.12 paremmat anekdootit, step10 */
/* Ota käyttöön kirjasto react-redux ja muuta komponenttia AnecdoteList niin, että se pääsee käsiksi tilaan connect-funktion välityksellä. */

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

/* 6.14 paremmat anekdootit, step12 */
/* Muuta komponenttia AnecdoteList siten, että anekdoottien äänestys taas onnistuu ja muuta myös Notification käyttämään connectia. */

const mapDispatchToProps = {
  addVote,
  setNotification,
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AnecdoteList)
