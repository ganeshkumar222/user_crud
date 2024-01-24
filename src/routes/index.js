import express from 'express'
import HomeController from '../controller/index.js'
const router = express.Router()
import UserRoutes from './user.js'

router.get("/",HomeController.homepage)

router.use("/user",UserRoutes)

export default router