import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI no está definido en las variables de entorno. Revisa .env o .env.example');
}

export async function connectDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas conectado.');
  } catch (error) {
    console.error('Error conectando a MongoDB Atlas:', error.message);
    throw error;
  }
}
