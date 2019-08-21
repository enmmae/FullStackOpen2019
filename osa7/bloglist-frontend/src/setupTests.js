import '@testing-library/jest-dom/extend-expect'
// import '@testing-library/react/cleanup-after-each'

// kommentoitu importti heittää seuraavan varoituksen:
/* console.warn node_modules/@testing-library/react/cleanup-after-each.js:1 */
/* The module `@testing-library/react/cleanup-after-each` has been deprecated and no longer does anything (it is not needed). You no longer need to import this module and can safely remove any import or configuration which imports this module */

jest.mock('./services/blogs')

/* Määritellään testien suorituksen ajaksi mock joka matkii local storagea */

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
