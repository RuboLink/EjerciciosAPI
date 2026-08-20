const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;

    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
        throw new Error("Falta la variable de entorno MONGODB_URI");
    }

    if (!cached.promise) {
        cached.promise = mongoose
        .connect(mongodbUri, {
            bufferCommands: false,
        })
        .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = { connectDB };
