import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      resolution: {
        type: Number,
      },
});

const ImageModel = mongoose.model('ImageUpload', imageSchema);

export default ImageModel;