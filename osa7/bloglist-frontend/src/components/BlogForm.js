import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  // HUOM: kun blogi lisätään, niin <Blog/> ei päivitä lisääjän nimeä ja poistonappia.
  // Myös like -painikkeen klikkaus poistaa nuo tiedot.
  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('Creating new blog')

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    await props.createBlog(blogObject)
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <Form onSubmit={handleCreate}>
      <h2>Create new</h2>
      <Form.Field>
        <label>title</label>
        <input id='title' {...title.bind}/>
      </Form.Field>
      <Form.Field>
        <label>author</label>
        <input id='author' {...author.bind}/>
      </Form.Field>
      <Form.Field>
        <label>url</label>
        <input id='url' {...url.bind}/>
      </Form.Field>
      <Button type="submit">create</Button>
    </Form>
  )
}

const mapDispatchToProps = {
  createBlog
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)