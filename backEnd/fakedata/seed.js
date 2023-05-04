// ! die Datei soll nicht produktiv beim Kunden laufen, sondern nur zum Testen
// ! deswegen ist sie in einem eigenen Ordner

import '../config.js'
// ! damit importieren wir auch unsere .env Dateien hier her
import {getDB } from '../util/db.js'
import { faker } from '@faker-js/faker';

// ! await geht hier, weil top Level await in ES Modulen erlaubt ist
const db = await getDB()

// Bestellungen 
// Kunden
// Produkte
// Status
// Summe


// Bestellung

let orders = []

for (let i = 0; i < 200; i++ ) {
// ! dadurch werden 20.000 Bestellungen erstellt mit fakeDaten für die MongoDB

    const order = {
        date: faker.date.recent(),
        customer: {
            id: faker.datatype.uuid(),
            fullName: faker.name.fullName(),
            adress: faker.address.streetAddress(true)
    
        },
       // products: [faker.commerce.product()],
       products: [],
        sum: faker.finance.amount(),
        state: faker.helpers.arrayElement( ['offen', 'bezahlt'])
    }

    // ! hier werden nochmal 1 - 10 verschiedene Produkte der Bestellung hinzugefügt   damit wir nicht nur ein Produkt haben
    // ! bzw. wir pushen sie nachträglich noch ins Array rein
    for (let j = 0; j < faker.datatype.number({ min: 1, max:10 }); j++){
        // oder     j < Math.floor(Math.random() * 10) + 1
        order.products.push(faker.commerce.product())
    } 

    orders.push(order)

}
 

console.log(orders)

const result = await db.collection('orders').insertMany(orders)
console.log(result)
process.exit()

// !     fakeDaten einmalig erzeugen und in die Datenbank schreiben    deshalb ist das hier ein eigenes Script
// ! mit ./config.js importieren wir die .env Datei haben
// ! ausführen    mit      npm run db:seed    in package.json "db:seed": "node fakedata/seed.js"    rein