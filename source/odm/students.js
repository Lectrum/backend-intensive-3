// Core
import mongoose from 'mongoose';

const schema = new mongoose.Schema();

export const students = mongoose.model('students', schema);
