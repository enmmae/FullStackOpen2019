# FullStackOpen2019

Sivulta https://mooc.fi/ löytyvän kurssin *[Full Stack Open 2019](https://fullstackopen.com/) - Syväsukellus moderniin websovelluskehitykseen* tehtävät. Tehty elokuussa 2019.



## Osa 0 Web-sovellusten toiminnan perusteet

### 0.4 ja 0.6 uusi muistiinpano
### 0.5 Single Page App



## Osa 1 Reactin perusteet

Run the following applications with `npm start`

### 1.1-1.5: kurssitiedot
### 1.6-1.11: unicafe
### 1.12-1.14: anekdootit




## Osa 2 Palvelimen kanssa tapahtuva kommunikointi

Run the following applications with `npm start`

### 2.1-2.5: kurssitiedot

### 2.6-2.11 ja 2.15-2.20: puhelinluettelo
Start server to port 3001 with `npx json-server --port=3001 --watch db.json`

### 2.12-2.14: maiden-tiedot





## Osa 3 Palvelimen ohjelmointi NodeJS:n Express-kirjastolla

### 3.1-3.22: puhelinluettelo-frontend ja puhelinluettelo-backend

3.1.-3.11. tehdyt kohdat eritelty tiedostoon index3.1.-3.11.js koska melkein kaikkia kohtia piti muokata tästä edetessä.

Run puhelinluettelo-backend with `npm run watch` and puhelinluettelo-frontend with `npm start`.
These work together locally at http://localhost:3000/ and backend at http://localhost:3001/api/..

#### Heroku

Frontend: https://murmuring-hamlet-24017.herokuapp.com/index.html | Backend: https://murmuring-hamlet-24017.herokuapp.com/api/persons

To run locally, use `heroku local web` backend hakemistossa.

#### 3.12 tietokanta komentoriviltä

Mongoose lisää tietokantaan uuden dokumentin komennolla `node mongo.js salasana "Essi Esimerkki" 040-1234567`.
Ohjelma tulostaa tietokannassa olevat numerotiedot komennolla `node mongo.js salasana`.

#### 3.22: ESLint

Seuraava suorittaa tarkastukset koko projektille: `npm run lint`

Esim tiedoston index.js tarkastus tapahtuu komennolla: `node_modules\.bin\eslint index.js`




## Osa 4 Express-sovellusten testaaminen, käyttäjänhallinta

### 4.1-4.21: blogilista

Run with `npm run watch` or `npm start`. Tests with `npm test`.

http://localhost:3003/api/blogs	 |  http://localhost:3003/api/users




## Osa 5 React-sovelluksen testaaminen, custom hookit

### 5.1-5.20: bloglist-frontend ja bloglist-backend

Run puhelinluettelo-backend with `npm run watch` and puhelinluettelo-frontend with `npm start`.
These work together locally at http://localhost:3000/ and backend at http://localhost:3003/api/users & .../api/blogs

### 5.21: custom-hooks

Start server to port 3005 with `npm run server`. Run frontend in development mode with `npm start`




## Osa 6 Sovelluksen tilan hallinta Redux-kirjastolla

### 6.1-6.2: unicafe-redux

Run with `npm start`. Tests with `npm test`.

### 6.3-3.21: redux-anecdotes

Start server to port 3001 with `npm run server` -> http://localhost:3001/anecdotes.
Run application with `npm start`.




## Osa 7 React router, tyylikirjastot ja webpack

### 7.1-7.3: routed-anecdotes

Run with `npm start`

### 7.4-7.19: bloglist-frontend ja bloglist-backend

Run backend with `npm run watch` and frontend with `npm start`

#### 7.15: ESLint 

Check with `npm run eslint`

#### 7.17-7.19: End to end -testaus

Run backend with `npm run start:test`.
Kun backend ja frontend ovat käynnissä, voidaan käynnistää Cypress komennolla `npm run cypress:open`

