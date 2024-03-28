import express from 'express'

import { connectToDatabase } from './db-connection.js'
const app=express()
const port=4000
connectToDatabase()
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})