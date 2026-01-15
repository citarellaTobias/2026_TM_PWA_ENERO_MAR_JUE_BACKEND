import mongoose from "mongoose"
import ENVIRONMENT from "./environment.config.js"
/* CONEXION CON MONGODB */

/* const connection_string = 'mongodb://localhost:27017/' */ // de manera local 

const connection_string = `${ENVIRONMENT.MONGO_DB_URI}/${ENVIRONMENT.MONGO_DB_NAME} `
'mongodb+srv://admin:A0JO87h57kTX9UgL@cluster0.ldhgfdc.mongodb.net/UTN_SLACK_TM'

export async function connectMongoDB (){
    try{
        //Bloque de codigo a ejecutar
        await mongoose.connect(
            connection_string
        )
        console.log("Conexion a mongoDB exitosa")
    }
    catch(error){
        console.error("Conexion con mongoDB fallo")
        console.error(error)
    }
}

