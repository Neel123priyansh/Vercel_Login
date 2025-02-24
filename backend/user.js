import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const userSchema = new Schema({
    program: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User_Vite', userSchema);

export default User;