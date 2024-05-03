import app from './app'
import mongoose from 'mongoose'
import config from './config'

async function server() {
  try {
    await mongoose.connect(config.database_url)
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => {
      console.log(`tin tour server is running on ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server().catch((err) => console.log(err))