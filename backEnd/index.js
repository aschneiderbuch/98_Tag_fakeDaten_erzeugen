import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { orderCount, getOpenOrders } from './controller/orderController.js'
import { corsFehlerFangen, corsOriginVsWhitelistPrüfung } from './middleware/corsMiddleware.js'

// Falls multer oder express-validator , dann auch hier importieren
const BACKEND_PORT = process.env.BACKEND_PORT
const app = express()


app.use(morgan('dev'))
const CORS_WHITELIST = process.env.CORS_WHITELIST
app.use(cors( 
/*    { 
        origin: (origin, cb) => {
            if (CORS_WHITELIST.indexOf(origin) !== -1) {
                cb(null, true)
            }
            else {
                cb(new Error(`Nicht erlaubt durch CORS`))
            }
        } 
    }   */
), corsFehlerFangen ) 

// CORS Fehler fangen
// app.use( corsFehlerFangen  )


// CORS Fehler Fanken 

// ist Platz für Routen
app.get('/', (req, res) => {
    res.status(200).json({message: 'Alles Okay'})
})

app.get('/api/v1/orders', orderCount )
app.get('/api/v1/offen', getOpenOrders)


// Server starten
app.listen(BACKEND_PORT, () => {
    console.log(`Server läuft auf Port ${BACKEND_PORT}`)
})
// Port killen   lsof -i :Port-Nummer    kill -9 PID-Nummer