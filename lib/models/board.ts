import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
    name: string;
    userId: string;
    columns: mongoose.Types.ObjectId[]; // список других коллекций
    createdAt: Date;
    updatedAt: Date;
}

// Определяем схему доски для MongoDB: хранит название, владельца и ссылки на колонки
const BoardSchema: Schema<IBoard> = new Schema<IBoard>(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
            index: true,
        },
        columns: [
            {
                type: Schema.Types.ObjectId,
                ref: "Column",
            },
        ],
    },
    {
        timestamps: true,
    },
);

// Регистрируем нашу коллекцию

export default mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);
