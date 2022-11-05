import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
