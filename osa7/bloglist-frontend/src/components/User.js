import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

/* 7.8 yksittäisen käyttäjän näkymä */
/* Tee sovellukseen yksittäisen käyttäjän näkymä, jolta selviää mm. käyttäjän lisäämät blogit */

const User = (props) => {
  if ( props.user === undefined) {
    return null
  }

  return (
    <div>
      <h1>{props.user.name}</h1>
      <h3>added blogs</h3>
      <List bulleted>
        {props.user.blogs.map(blog =>
          <List.Item key={blog.id}>
            {blog.title}
          </List.Item>
        )}
      </List>
    </div>
  )
}

export default connect()(User)
