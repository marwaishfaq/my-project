import ImageModel from '../models/ImageModels.js';

const uploadSingleImage = async (req, res) => {
  try {
    const { width, height, resolution } = req.body;
    const { path, filename } = req.file;
    const image = new ImageModel({ path, filename, width, height, resolution });
    await image.save();
    const imageUrl = `http://localhost:8080/images/${req.file.filename}`;
    res.json({ msg: 'image uploaded', imageUrl, width, height, resolution });
  } catch (error) {
    console.error(error);
    res.status(500).send({ "error": error.message });
  }
};

export default uploadSingleImage;