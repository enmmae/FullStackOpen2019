import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
// 6.16. myötä turha -> db.json tiedosto ja App useEffect

const getId = () => (100000 * Math.random()).toFixed(0)

// 6.17. myötä turha
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      return state
        .map(anecdote => anecdote.id === action.data.id ? action.data : anecdote)
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    default: return state
  }
}

/* 6.18 anekdootit ja backend, step4 */
/* Muuta redux-storen alustus tapahtumaan redux-thunk-kirjaston avulla toteutettuun asynkroniseen actioniin. */

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

/* 6.3: anekdootit, step1 */
/* Toteuta mahdollisuus anekdoottien äänestämiseen. Äänien määrä tulee tallettaa redux-storeen. */

/* 6.5*: anekdootit, step3 */
/* Huolehdi siitä, että anekdootit pysyvät äänten mukaisessa suuruusjärjestyksessä. */

/* 6.20 anekdootit ja backend, step3 */
/* Äänestäminen ei vielä talleta muutoksia backendiin. Korjaa tilanne redux-thunk-kirjastoa hyödyntäen. */

export const addVote = anecdote => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, newAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

/* 6.4: anekdootit, step2 */
/* Tee sovellukseen mahdollisuus uusien anekdoottien lisäämiselle. */
/* Voit pitää lisäyslomakkeen aiemman esimerkin tapaan ei-kontrolloituna. */

/* 6.19 anekdootit ja backend, step5 */
/* Muuta myös uuden anekdootin luominen tapahtumaan redux-thunk-kirjaston avulla toteutettuihin asynkronisiin actioneihin. */

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}
// data: asObject(content) <- turha 6.17. jälkeen

/* 6.6: anekdootit, step4 */
/* Jos et jo sitä tehnyt, eriytä action-olioiden luominen action creator -funktioihin ja sijoita ne */
/* tiedostoon anecdoteReducer.js. Eli toimi samalla tavalla kuin materiaali esimerkissä kohdasta action creator alkaen on toimittu. */

export default reducer