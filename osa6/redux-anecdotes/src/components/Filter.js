import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer' 

/* 6.11* paremmat anekdootit, step9 */
/* Toteuta sovellukseen näytettävien muistiinpanojen filtteröiminen */

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

/* 6.13 paremmat anekdootit, step11 */
/* Tee sama (kuin 6.12. tehtiin AnecdoteList:lle) komponentille Filter ja AnecdoteForm. */

const mapDispatchToProps = {
  setFilter,
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)
