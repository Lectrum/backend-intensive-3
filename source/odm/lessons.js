// Core
import mongoose from 'mongoose';
import { v4 } from 'uuid';

const contentSchema = new mongoose.Schema(
    {
        title: String,
        order: Number,
        uri:   String,
        hash:  {
            type:    String,
            unique:  true,
            default: () => v4(),
        },
    },
    { _id: false },
);

const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default:  () => v4(),
        },
        title: {
            type:     String,
            required: true,
        },
        description: {
            type:     String,
            required: true,
        },
        order: {
            type:     Number,
            required: true,
        },
        availability: [
            {
                type: String,
                enum: [ 'standard', 'select', 'premium' ],
            },
        ],
        content: {
            videos:   [ contentSchema ],
            keynotes: [ contentSchema ],
        },
    },
    { timestamp: { createdAt: 'created', updatedAt: 'modified' } },
);

schema.index({ order: 1 }, { name: 'order' });

export const lessons = mongoose.model('lessons', schema);

lessons.createIndexes();
