// Core
import mongoose from 'mongoose';

const schema = new mongoose.Schema();

export const staff = mongoose.model('staff', schema);
