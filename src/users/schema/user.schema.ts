import { Document, Schema } from 'mongoose';
import { User } from '../interface/User';

export interface UserDocument extends Document, User {}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export { UserSchema };
