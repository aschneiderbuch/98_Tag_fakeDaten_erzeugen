// import './config.js'
import { useEffect, useState } from 'react'


import { OrderItem } from './components/OrderItem.jsx';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [pages, setPages] = useState(0)
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)

  const  BACKEND_PORT =  process.env.REACT_APP_BACKEND_PORT
  const BACKEND_PFAD = process.env.REACT_APP_BACKEND_PFAD
  // fetch um Anzahl der offenen Bestellungen zu holen 
  // mit query-Parameter state=offen
  useEffect(() => {
    const getCount = async () => {

      const response = await fetch(`http://localhost:${BACKEND_PORT}${BACKEND_PFAD}/orders?state=offen`)
      const data = await response.json()
      console.log(data)
      setCount(data)    // wenn als Object geschickt, dann hier  setCount( Number( data.count ) )
      setPages(data)
      setPage(1)
    }
    getCount()
  }, [])


  // fetch getOrders außerhalb des useEffect 
  // mit query-Parameter state=offen und   p=1 page     und    l=5 limit
  const getOrders = async () => {

    // Variabel   page     und   limit
    
    const response = await fetch(`http://localhost:${BACKEND_PORT}${BACKEND_PFAD}/offen?state=offen&p=${page}&l=${limit}`)
    const data = await response.json()
    console.log(data)
    calcPages()
    setOrders(data)
  }

  // Seitenzahl neu richtig berechnen
  const calcPages = (anzahl) => {
    if (anzahl) {
      setPages(Math.ceil(anzahl / limit)) // anzahl der Seitenzahlen berechnen anzahl / limit weil 5 Bestellungen pro Seite
    }
    else {
      setPages(Math.ceil(count / limit)) // jetzt mit count weil count ist die Anzahl der offenen Bestellungen
    }
  }

  // useEffect um die Bestellungen zu holen
  useEffect(() => {
    // funktion getOrders aufrufen
    getOrders()
  }, [page, limit]) // wenn page oder limit sich ändert, dann useEffect ausführen


  // Seitenzahlen anzeigen
  const displayPages = () => {
    const pagesArray = []
    for (let i = 0; i < pages; i++) {
      pagesArray.push(<button key={i} onClick={() => { setPage(i + 1) }} >  {i + 1}</button>)
    }
    return pagesArray
  }

  return (
    <section className="App">

      <h1>Merci-Shop</h1>

      {orders.map((order, key) => {
        return <OrderItem key={key} order={order} />
      })}

      <button onClick={() => setPage(prev => ++prev)} > next </button>
      <p>{page}</p>

      <button onClick={() => setLimit(5)} >5</button>
      <button onClick={() => setLimit(10)} >10</button>
      <button onClick={() => setLimit(100)} >100</button>

     <p> 
      <p> Navi Pages</p>
     {displayPages()}
      </p> 

      <h4>Offene Bestellungen: {count}</h4>
    </section>
  );
}

export default App;
