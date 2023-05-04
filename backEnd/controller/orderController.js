
import { getDB } from '../util/db.js'


// alle offenen   bestellungen zählen die in der Datenbank sind
// fetch aus fontEnd -> http://localhost:9898/orders?state=offen
// ! durch .query  holen wir uns nur die sachen nach dem ? in der URL also nur state=offen
export const orderCount = async (req, res) => {
    const db = await getDB()
    const result = await db.collection('orders').countDocuments(req.query)
}


// alle offenen Bestellungen holen
// MongoDb soll max limit 5 Bestellungen zurückgeben
// MongoDb soll uns pro Seite 5 Bestellungen zurückgeben
// fetch aus fontEnd -> http://localhost:9898/orders?state=offen&l=5&p=1
const COL = 'orders'
export const getOpenOrders = async (req, res) => {
    const q = req.query
    const { p, l } = req.query     // p = page l = limit
    try {
        const db = await getDB()
        const result = await db.collection(COL).find( {q}).skip(p * l ).limit(l).toArray()     //  skip überspringt die ersten 5 Bestellungen und limit gibt uns nur 5 Bestellungen zurück
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json( { message: `Fehler bei getOpenOrders: ${err.message}` } , 599 )
    }
     
}
    