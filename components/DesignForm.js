import React, { useState } from 'react';

const DesignForm = ({ onSubmit }) => {
  const [designData, setDesignData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(designData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add fields for design details */}
      <textarea 
        name="description"
        value={designData.description || ''}
        onChange={(e) => setDesignData({...designData, description: e.target.value})}
        placeholder="Description of your design"
      />
      <button type="submit">Submit Design</button>
    </form>
  );
};
export default DesignForm