import React, { useState, useEffect } from 'react'
import personService from './services/persons'

/* 2.6: puhelinluettelo step1 */
/* Toteutetaan yksinkertainen puhelinluettelo */

/* 2.8: puhelinluettelo step3 */
/* Lisää sovellukseen mahdollisuus antaa henkilöille puhelinnumero */

/* 2.9*: puhelinluettelo step4 */
/* Tee lomakkeeseen hakukenttä, jonka avulla näytettävien nimien listaa voidaan rajata */

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState('')

  /* 2.11: puhelinluettelo step6 */
  /* Muuta sovellusta siten, että datan alkutila haetaan axios-kirjaston avulla palvelimelta */
  /* Hoida datan hakeminen Effect hookilla */

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  /* 2.19: puhelinluettelo step11 */
  /* Toteuta osan 2 esimerkin parempi virheilmoitus tyyliin ruudulla muutaman sekunnin */
  /* näkyvä ilmoitus, joka kertoo onnistuneista operaatioista */

  const timer = () => {
    return (
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    /* 2.7: puhelinluettelo step2 */
    /* Jos lisättävä nimi on jo sovelluksen tiedossa, estä lisäys */

    /* 2.18*: puhelinluettelo step10 */
    /* Muuta toiminnallisuutta siten, että jos jo olemassaolevalle henkilölle lisätään numero, */
    /* korvaa lisätty numero aiemman numeron */

    const toUpdate = persons.filter(person => person.name === personObject.name)

    if (toUpdate.length > 0) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`) === true) {
        console.log(`Updating a person ${newName} : ${newNumber}`)
        console.log(toUpdate)

        personService
          .update(toUpdate[0].id, personObject)
            .then(returnedPerson => {
              console.log(returnedPerson)

              setPersons(persons.filter(person => person.id !== toUpdate[0].id).concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setErrorMessage(`Updated ${returnedPerson.name}`)
              setError('success')
            })
            .catch(error => {
              setErrorMessage(`Information of ${personObject.name} has already been removed from server`)
              setError('error')
              setPersons(persons.filter(person => person.name !== personObject.name))
            })
        timer()
      }
    } 
    else { 
      console.log(`Adding a new person ${newName} : ${newNumber}`)
      console.log(persons)  

      /* 2.15: puhelinluettelo step7 */
      /* Tällä hetkellä luetteloon lisättäviä uusia numeroita ei synkronoida palvelimelle. Korjaa tilanne */

      personService
        .create(personObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Added ${returnedPerson.name}`)
            setError('success')
          })
          .catch(error => {
            setErrorMessage(`Information of ${personObject.name} has already been removed from server`)
            setError('error')
            setPersons(persons.filter(person => person.name !== personObject.name))
          })
      timer()
    }
  }

  /* 2.17: puhelinluettelo step9 */
  /* Tee ohjelmaan mahdollisuus yhteystietojen poistamiseen */

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`) === true) {
      console.log(`Deleting a person: ${person.name}`)

      personService
        .deletePerson(person.id)
          .then(response => {
            console.log(response)
            setPersons(persons.filter(aperson => aperson.id !== person.id))
            setErrorMessage(`Deleted ${person.name}`)
            setError('success')
          })
          .catch(error => {
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
            setError('error')
            setPersons(persons.filter(aperson => aperson.id !== person.id))
          })
      timer()
    }
  }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} error={error}/>

      <Filter value={filter} onChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange}
                  numberValue={newNumber} numberOnChange={handleNumberChange}/>

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={error}>
      {message}
    </div>
  )
}

/* 2.10: puhelinluettelo step5 */
/* Refaktoroi sovellusta eriyttämällä ainakin kolme sopivaa komponentteia */

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with <input 
          value={props.value}
          onChange={props.onChange}/>
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input 
          value={props.nameValue}
          onChange={props.nameOnChange}/>
      </div>
      <div>
        number: <input
          value={props.numberValue}
          onChange={props.numberOnChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

/* const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) */
/* ^ voisi olla noin myös */

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
        .map(person => 
          <div key={person.name}>
            {person.name} {person.number} <button onClick={() => props.deletePerson(person)}>delete</button>
          </div>)}
    </div>
  )
}

export default App