import React from "react";

const GoogleMapComponent = ({ location }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        margin: "20px auto",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API}
          &q=${location.lat},${location.lng}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleMapComponent;