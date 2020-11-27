// Core
import mongoose from 'mongoose';
import { v4 } from 'uuid';

// Instruments
import { students, lessons } from './';

const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:  students,
        },
        status: {
            type: String,
            enum: [ 'standard', 'select', 'premium' ],
        },
        expelled: Boolean,
        notes:    String,
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
        title:       String,
        description: String,
        students:    [ studentSchema ],
        lessons:     [
            {
                lesson: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  lessons,
                },
                scheduled: Date,
            },
        ],
        duration: {
            started: {
                type:     Date,
                required: true,
            },
            closed: {
                type:     Date,
                required: true,
            },
        },
        order: Number,
    },
    { timestamp: { createdAt: 'created', updatedAt: 'modified' } },
);

schema.index({ title: 'text', description: 'text' });
schema.index({ order: 1 }, { name: 'order' });

export const classes = mongoose.model('classes', schema);

classes.createIndexes();
