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
const order = {
    date: faker.date.recent(),
    customer: {
        id: faker.datatype.uuid(),
        fullName: faker.name.fullName(),
        adress: faker.address.streetAddress(true)

    },
    products: [faker.commerce.product()],
    sum: faker.finance.amount(),
    state: faker.helpers.arrayElement( ['offen', 'bezahlt'])
}

console.log(order)