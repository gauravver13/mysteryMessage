import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number 
}

const connection: ConnectionObject = {}

export default async function dbConnect(): Promise<void> {
    //Check for already connected!
    if (connection.isConnected) {
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

        console.log(db);

        connection.isConnected = db.connections[0].readyState

        console.log(db.connections[0]);  
        console.log("DB Connected Successfully")

    } catch (error) {
        
        console.log("Database connection failed", error);
        process.exit(1)
    }

}

