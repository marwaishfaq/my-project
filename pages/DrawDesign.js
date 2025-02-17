import React, { useState } from 'react';
import { useCart } from "../Context/Cart"; // Import the useCart hook
import Layout from '../components/Layout/Layout'
import '../styles/UploadDesign.css'
function DrawDesign() {
const [img, setImg] = useState();
const [cart, setCart] = useCart(); // Get the cart state and update function

const handleFileChange = (e) => {
  const file = e.target.files[0];
const reader = new FileReader();

reader.onload = (event) => {
  const imageData = event.target.result;
  const image = new Image();

  image.onload = () => {
    const width = image.width;
    const height = image.height;
    console.log(`Image dimensions: ${width}x${height}`);

    // You can also get the resolution (DPI) using the following library:
    // https://github.com/image-js/image-js
    // const dpi = image.dpi; // Note: This might not work in all browsers

    setImg({
      file,
      width,
      height,
      // dpi, // Uncomment if you're using the image-js library
    });
  };

  image.src = imageData;
};

reader.readAsDataURL(file);

};

const handleClick = async () => {
console.log('handleClick called');
if (!img) {
console.log("Please select an image");
return;
}

try {
  const formdata = new FormData();
  formdata.append("profileImage", img.file);
  formdata.append("width", img.width);
  formdata.append("height", img.height);
  // formdata.append("resolution", img.dpi); // Uncomment if you're using the image-js library

  const response = await fetch("http://localhost:8080/api/v1/Image/single", {
    method: "POST",
    body: formdata,
  });

  const data = await response.json();
  console.log(data);
  handleAddToCart(data); // Pass the data to the handleAddToCart function
} catch (error) {
  console.error(error);
}
};

const handleAddToCart = (data) => {
  console.log('Uploaded image data:', data);
  console.log('Data keys:', Object.keys(data));
  if (data && data.imageUrl) {
    console.log('Image URL:', data.imageUrl);
    
    // Define the price calculation formula
    const width = data.width; // Assuming the width is returned in the API response
    const height = data.height; // Assuming the height is returned in the API response
    const basePrice = 80; // Minimum base price
    const pricePerPixel = 0.0005; // Adjusted price per pixel
    const aspectRatio = width / height; // Calculate the aspect ratio
    const aspectRatioMultiplier = aspectRatio > 1 ? 1.1 : 0.9; // Apply a multiplier based on the aspect ratio
    
    const totalPrice = Math.min(Math.max(basePrice + (width * height * pricePerPixel * aspectRatioMultiplier), 80), 150);
    
    const cartItem = {
      id: Date.now(),
      name: "uploaded Design",
      price: totalPrice, // Use the calculated price
      description: "this design is uploaded by the customer",
      imageUrl: data.imageUrl,
    };
    setCart([...cart, cartItem]);
  } else {
    console.log('No image URL found in response data');
  }
};
return (
<Layout>

<div className="App">
<h1>Upload design</h1>
<input onChange={handleFileChange} type="file" />
<button onClick={handleClick} type='submit'>Upload</button>

</div>
</Layout>
);
}

export default DrawDesign;