import { connect } from "mongoose"

import { DBNAME } from "../constant/index.js"

const connectDB = async () => {
    try {
        const connectionInstance = await connect(`${process.env.MONGO_URI}/${DBNAME}`)
        console.log(`Connected to ${connectionInstance.connection.host} database`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB