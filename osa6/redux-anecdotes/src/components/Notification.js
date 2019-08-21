import React from 'react'
import { connect } from 'react-redux'

/* 6.9 anekdootit, step7 */
/* Laajenna komponenttia siten, että se renderöi redux-storeen talletetun viestin */

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification !== '') {
    return (
      <div>
        <div style={style}>
          {props.notification}
        </div><br></br>
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
