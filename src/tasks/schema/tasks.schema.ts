import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from 'src/users/schema/user.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  done: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
