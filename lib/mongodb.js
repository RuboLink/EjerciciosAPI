import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://ruboms_db_user:gxdc4cVJdGQKznaz@cluster0.u1r0xio.mongodb.net/mi_base?retryWrites=true&w=majority";

if (!MONGODB_URI) {
    throw new Error("No se ha definido la URI de MongoDB");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
        .connect(MONGODB_URI, {
            bufferCommands: false,
        })
        .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
