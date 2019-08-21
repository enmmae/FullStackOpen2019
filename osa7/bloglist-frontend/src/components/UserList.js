import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

/* 7.7 käyttäjien näkymä */
/* Tee sovellukseen näkymä, joka näyttää kaikkiin käyttäjiin liittyvät perustietot */

const UserList = (props) => {
  return (
    <div>
      <h1>Users</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> </Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.username}>
              <Table.Cell>
                <Link id={user.username} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)
