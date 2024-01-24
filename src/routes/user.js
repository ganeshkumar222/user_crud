import express from 'express'
import UserController from '../controller/user.js'
const router = express.Router()

router.get("/",UserController.getAllUsers)
router.get("/:id",UserController.getUserById)
router.post("/adduser",UserController.addUser)
router.delete("/deleteuser/:id",UserController.deleteUser)
router.put("/edituser/:id",UserController.editUser)

export default router