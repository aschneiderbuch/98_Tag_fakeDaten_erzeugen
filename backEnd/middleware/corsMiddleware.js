import '../config.js'

export const corsOriginVsWhitelistPrüfung = (req, res, next) => {
       const CORS_WHITELIST = process.env.CORS_WHITELIST
        origin: {
            if (CORS_WHITELIST.indexOf(req.headers.origin) == -1) {
                next()  

            } else {
                res.status(403).json({ message: `Nicht erlaubt durch CORS` }, 597)
            }
        }
       
}


export const corsFehlerFangen = (err, req, res, next) =>  {

    console.log(err.message)
    if (err) {
        res.status(500).json({ message: `CORS Fehler gefangen: ${err.message}`} , 598)
    } else {
        next()
    }}