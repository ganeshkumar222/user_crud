import { findIndex}from '../common/findindex.js'
import dbconfig from '../dbconfig/config.js'
import mongodb,{ MongoClient } from 'mongodb'
// let user = [{
//     id:1,
//     name:"Nagarajan",
//     email:"naga@gmail.com",
//     password:"123",
//     status:true,
//     role:"user"
// },{
//     id:2,
//     name:"Nag",
//     email:"naa@gmail.com",
//     password:"123",
//     status:true,
//     role:"user"
// }]
let client = new MongoClient(dbconfig.db_url)


const getAllUsers = async (req,res) =>{
    try {
        await client.connect()
        let db = await client.db(dbconfig.db_name)
        let user = await  db.collection("users").find().toArray()
        res.status(200).send({
            messsage:"user data fetched successsfully",
            user
        })
        
    } catch (error) {
       res.status(500).send({
        message:"internal server error"
       }) 
    }
    finally{
        client.close()
    }
}
const getUserById = async (req,res) =>{
  try {
      await client.connect()
      let db = await client.db(dbconfig.db_name)
      let user = await db.collection("users").findOne({_id: new mongodb.ObjectId(req.params.id)})
      console.log(user)
    //  const {id} = req.params
    //  console.log(id)
    //  let index = findIndex(user,id)
     
     if(user){
        res.status(200).send({
            message:"data fetched successfully",
            user
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
  finally {
    client.close()
  }
}

const addUser = async (req,res) => {
    try {
        await client.connect()
        // let id = user.length ? user[user.length-1].id + 1 : 1
        // req.body.id = id
        // user.push(req.body)
        let db = await client.db(dbconfig.db_name)
        let user = await db.collection("users").findOne({email:req.body.email})
        if(!user){
             await db.collection("users").insertOne(req.body)
            res.status(200).send({
                message:"user added successfully"
            })
        }
        else{
            res.status(400).send({
                message:`user with ${req.body.email} already exists`
            })
        }
       
    } catch (error) {
         res.status(500).send({
            message:"internal server error"
         })
    }
    finally{
        client.close()
    }
}
const deleteUser = async (req,res) =>{
    try {
        await client.connect()
        // console.log("inside delete")
        let db = await client.db(dbconfig.db_name)
        let users =await  db.collection("users").findOne({_id:new mongodb.ObjectId(req.params.id)})
        if(users){
             await db.collection("users").deleteOne({_id:new mongodb.ObjectId(req.params.id)})
            res.status(200).send({
                message:"user deleted successfully"
            })
        }
        else{
            res.status(400).send({
                message:"Invalid user Id"
            })
        }
        

    } catch (error) {
        res.status(200).send({
            message:"internal server error"
        })
    }
    finally{
        client.close()
    }
}
const editUser = async (req,res) =>{
    try {
         await client.connect()
         let db = client.db(dbconfig.db_name)
         let users = db.collection("users").findOne({_id:new mongodb.ObjectId(req.params.id)})
        // let {id} = req.params
        // let index = findIndex(user,id)
        
        if(users){
            db.collection("users").updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:req.body})
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