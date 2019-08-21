
/* 7.4: redux, step1 */
/* Siirry käyttämään React-komponenttien tilan sijaan Reduxia sovelluksen tilan hallintaan. */
/* Muuta tässä tehtävässä notifikaatio käyttämään Reduxia. */

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default: return state
  }
}

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