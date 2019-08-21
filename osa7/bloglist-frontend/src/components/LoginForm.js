import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  // HUOM
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)

    await props.setUser(username.value, password.value)
    username.reset()
    password.reset()
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Form.Field>
        <label>username</label>
        <Form.Input id='username' {...username.bind}/>
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <Form.Input id='password' {...password.bind}/>
      </Form.Field>
      <Button type="submit">login</Button>
    </Form>
  )
}

export default connect(
  null,
  { setUser }
)(LoginForm)
