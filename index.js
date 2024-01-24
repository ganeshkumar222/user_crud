import express from 'express'
import AppRoutes from './src/routes/index.js'
let app = express()
let port = 8000


app.use(express.json())
app.use("/",AppRoutes)

app.listen(port,()=>console.log(`app is listening to port ${port}`))