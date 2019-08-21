import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'
import { Form, Button, Icon, List } from 'semantic-ui-react'

/* 7.9 blogin näkymä */
/* Toteuta sovellukseen oma näkymä yksittäisille blogeille. */

const Blog = ({ blog, user, addLike, removeBlog, addComment }) => {
  const comment = useField('text')

  const handleLike = () => {
    console.log('Adding a like')
    addLike(blog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`) === true) {
      console.log('Deleting a blog')
      removeBlog(blog.id)
    }
  }

  /* 7.12 kommentit, step2 */
  /* Laajenna sovellusta siten, että kommentointi onnistuu frontendista käsin */

  const handleComment = async (event) => {
    event.preventDefault()
    console.log(`Adding a comment ${comment.value}`)

    const newComment = {
      comment: comment.value
    }

    await addComment(blog.id, newComment)
    comment.reset()
  }

  if ( blog === undefined) {
    return null
  }

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <List>
        <List.Item>
          <a href={blog.url}>{blog.url}</a>
        </List.Item>
        <List.Item>
          {blog.likes} likes
          <Button inverted color='blue' icon onClick={handleLike}>
            <Icon name='heart'/>like
          </Button>
        </List.Item>
        <List.Item>
          added by {blog.user.name}
        </List.Item>
        <List.Item>
          {blog.user.username === user.username ?
            <Button inverted color='blue' onClick={handleDelete}>remove</Button>
            :
            <div></div>
          }
        </List.Item>
      </List>

      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Field inline>
          <input id='comment' {...comment.bind}/>
          <Button inverted color='blue' type="submit">add comment</Button>
        </Form.Field>
      </Form>
      <List bulleted>
        {blog.comments.map((comment, index) =>
          <List.Item key={index}>
            {comment}
          </List.Item>
        )}
      </List>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    addLike,
    removeBlog,
    addComment
  }
)(Blog)
