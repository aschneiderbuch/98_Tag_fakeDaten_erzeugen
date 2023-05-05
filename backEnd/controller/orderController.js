
import { getDB } from '../util/db.js'


const COL = 'orders'



// alle offenen   bestellungen zählen die in der Datenbank sind
// fetch aus fontEnd -> http://localhost:9898/orders?state=offen
// ! durch .query  holen wir uns nur die sachen nach dem ? in der URL also nur state=offen
export const orderCount = async (req, res) => {
    try{
        const q = req.query
        const db = await getDB()
        const result = await db.collection(COL).countDocuments(q);
        res.status(200).json(result)  // oder als Obejkt schicken .json( { count: result } )
    } catch (err) {
        console.log(err)
        res.status(500).json( { message: `Fehler bei orderCount: ${err.message}` } , 596 )
    }

}


// alle offenen Bestellungen holen
// MongoDb soll max limit 5 Bestellungen zurückgeben
// MongoDb soll uns pro Seite 5 Bestellungen zurückgeben
// fetch aus fontEnd -> http://localhost:9898/orders?state=offen&l=5&p=1
export const getOpenOrders = async (req, res) => {

    // ! q wird auch dynamisch
const { p, l, ...params} = req.query     // p = page l = limit
const q = {}
for (const key in params) {    // for schleife durchläuft alle Eigenschaften des Objekts
    if (params.hasOwnProperty(key)) {   // hasOwnProperty() prüft ob das Objekt die angegebene Eigenschaft hat und gibt true oder false zurück
        q[key] = params[key]   // q ist ein leeres Objekt, dann hinzufügen der Eigenschaften von params in q
    }
}

    // const { p, l } = req.query     // p = page l = limit  q = { state: "offen" }
    console.log(p, l, q)
    try {
        const db = await getDB()
        // -l    damit skip nicht die anzahl der l überspringt sondern   die anzahl der p - l überspringt und somit auf Seite 1 auch die ersten Bestellungen angezeigt werden
        const result = await db.collection(COL).find(  q ).skip(p  * l ).limit(Number(l)).toArray()     //  skip überspringt die ersten 5 Bestellungen und limit gibt uns nur 5 Bestellungen zurück
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json( { message: `Fehler bei getOpenOrders: ${err.message}` } , 599 )
    }
     
}
    