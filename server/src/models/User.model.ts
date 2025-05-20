import { Schema } from 'mongoose';

const UserSchema = new Schema({
    id: { type: Number, required: true },
    displayName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    fullName: { type: String, required: true },
});

export default UserSchema;
