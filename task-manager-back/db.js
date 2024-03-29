import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true
    })
    const url = `Mongo connectado en: ${connection.connection.host} : ${connection.connection.port}`
  } catch (error) {
    process.exit(1)
  }
}

export { connectDB }
