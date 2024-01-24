export const findIndex = (array,id) =>{
    for(let i = 0;i<array.length;i++){
        if(Number(id)===array[i].id){
            return i
        }
     }
     return -1
}