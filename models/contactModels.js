import mongoose, { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
});

const Contact = model('contact', contactSchema);

export default Contact;