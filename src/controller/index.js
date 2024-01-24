const homepage  = (req,res)=>{
    res.status(200).send(
        `<h1>welcome to node express</h1>`
    )
}


export default {
    homepage
}