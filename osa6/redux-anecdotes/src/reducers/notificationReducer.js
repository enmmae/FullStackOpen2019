
/* 6.9 anekdootit, step7 */
/* Tee toiminnallisuutta varten oma reduceri ja siirry käyttämään sovelluksessa yhdistettyä */
/* reduceria tämän osan materiaalin tapaan */

const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default: return state
  }
}

/* 6.10 paremmat anekdootit, step8 */
/* Laajenna sovellusta siten, että se näyttää Notification-komponentin avulla viiden sekunnin ajan, */
/* kun sovelluksessa äänestetään tai luodaan uusia anekdootteja */

/* 6.21 anekdootit ja backend, step6 */
/* Tee asynkroninen action creator, joka mahdollistaa notifikaation antamisen seuraavasti: */
/* props.setNotification(`you voted '${anecdote.content}'`, 10) */

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''
      })
    }, timeout)
  }
}

export default reducer