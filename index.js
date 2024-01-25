import express from 'express'
import AppRoutes from './src/routes/index.js'
let app = express()
let PORT = process.env.PORT || 8000


app.use(express.json())
app.use("/",AppRoutes)

app.listen(PORT,()=>console.log(`app is listening to port ${PORT}`))