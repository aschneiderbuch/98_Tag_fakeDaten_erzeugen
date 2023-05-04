import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// Falls multer oder express-validator , dann auch hier importieren
const BACKEND_PORT = process.env.BACKEND_PORT
const app = express()


app.use(morgan('dev'))
const CORS_WHITELIST = process.env.CORS_WHITELIST
app.use(cors(
    {
        origin: (origin, cb) => {
            if (CORS_WHITELIST.indexOf(origin) !== -1) {
                cb(null, true)
            }
            else {
                cb(new Error(`Nicht erlaubt durch CORS`))
            }
        }
    }
))

// CORS Fehler Fanken 

// ist Platz für Routen
app.get('/', (req, res) => {
    res.status(200).json({message: 'Alles Okay'})
})




// Server starten
app.listen(BACKEND_PORT, () => {
    console.log(`Server läuft auf Port ${BACKEND_PORT}`)
})