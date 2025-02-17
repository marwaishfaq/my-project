import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import '../components/GeminiAIComponents.css';
const GeminiAIComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const genAI = new GoogleGenerativeAI('AIzaSyCMPo0ql4POzmfSf5edAzH91EZl5GYzOZ4');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const generateContent = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      const responseText = await result.response.text();
      setResponse(responseText);
       // Clear the input value after generating content 
    setInputValue('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`gemini-container ${showChatbot ? 'show' : ''}`}>
      <div className="gemini-header">
        <h2> AI Chatbot</h2>
      </div>
      <div className="gemini-input-container">
        <input 
          type="text" 
          className="gemini-input"
          value={inputValue} 
          onChange={handleInputChange}
          placeholder="Enter your prompt"
        />
        <button 
          className="gemini-button"
          onClick={generateContent}
        >
          Generate
        </button>
      </div>
      {response && (
        <div className="gemini-response">
          <pre>{response}</pre>
        </div>
      )}
        
    </div>
  );
};

 

export default GeminiAIComponent;