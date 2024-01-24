import { findIndex}from '../common/findindex.js'
let user = [{
    id:1,
    name:"Nagarajan",
    email:"naga@gmail.com",
    password:"123",
    status:true,
    role:"user"
},{
    id:2,
    name:"Nag",
    email:"naa@gmail.com",
    password:"123",
    status:true,
    role:"user"
}]

const getAllUsers = (req,res) =>{
    try {
        console.log("inside 1")
        res.status(200).send({
            messsage:"user data fetched successsfully",
            user
        })
        
    } catch (error) {
       res.status(500).send({
        message:"internal server error"
       }) 
    }
}
const getUserById = (req,res) =>{
  try {
     const {id} = req.params
     console.log(id)
     let index = findIndex(user,id)
     
     if(index!==-1){
        res.status(200).send({
            message:"data fetched successfully",
            user:user[index]
         })

     }
     else{
        res.status(400).send({
            message:"Invalid user id",
            
         })
     }
     
    
  } catch (error) {
    res.status(500).send({
        message:"internal server error"
    })
  }
}

const addUser = (req,res) => {
    try {
        console.log("inside 2")
        let id = user.length ? user[user.length-1].id + 1 : 1
        console.log(id)
        console.log(req.body)
        req.body.id = id
        console.log("inside")
        user.push(req.body)
        res.status(200).send({
            message:"data added successfully"
        })
    } catch (error) {
         res.status(200).send({
            message:"internal server error"
         })
    }
}
const deleteUser = (req,res) =>{
    try {
        console.log("inside delete")
        let {id} = req.params
        let index = findIndex(user,id)
        if(id!==-1){
            user.splice(index,1)
            res.status(200).send({
                message:"data deleted successfully"
            })
        }
        else{
            res.status(400).send({
                message:"user does not exist"
            })
        }

    } catch (error) {
        res.status(200).send({
            message:"internal server error"
        })
    }
}
const editUser = (req,res) =>{
    try {
        let {id} = req.params
        let index = findIndex(user,id)
        
        if(index!==-1){
            req.body.id = Number(id)
           user.splice(index,1,req.body)
           res.status(200).send({
            message:"data edited successfully"
           })
        }
        else{
            res.status(200).send({
                message:"user does not exist"
            })
        }

    } catch (error) {
        
    }
}
export default {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    editUser
}