import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  if (props.notification !== '') {
    return (
      <Message>
        {props.notification}
      </Message>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
