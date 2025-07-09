import { Schema } from 'mongoose';

// User subdocument schema without _id, id is Azure id
const UserSchema = new Schema(
    {
        id: { type: String, required: true }, // Azure ID
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    { _id: false }
);

export default UserSchema;
