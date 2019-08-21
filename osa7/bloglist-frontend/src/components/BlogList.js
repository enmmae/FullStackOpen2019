import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const BlogList = (props) => {
  return (
    <Table>
      <Table.Body>
        {props.blogs.map(blog =>
          <Table.Row key={blog.id}>
            <Table.Cell>
              <Link to={`/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps
)(BlogList)
