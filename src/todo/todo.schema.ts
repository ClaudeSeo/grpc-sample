import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as _Schema, Types } from 'mongoose';

@Schema({
  timestamps: true,
  read: 'secondaryPreferred',
})
export class Todo {
  /** 할 일 ID */
  _id: Types.ObjectId;

  /** 카테고리 ID */
  @Prop({ type: _Schema.Types.ObjectId })
  categoryId: Types.ObjectId;

  /** 할 일 제목 */
  @Prop()
  title: string;

  /** 할 일 내용 */
  @Prop()
  content: string;

  /** 할 일 여부 */
  @Prop({ required: false, default: true })
  active: boolean;

  /** 수정일 */
  updatedAt: Date;

  /** 생성일 */
  createdAt: Date;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
