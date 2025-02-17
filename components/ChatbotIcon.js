import React from 'react';
import { FaRobot } from 'react-icons/fa';

const ChatbotIcon = ({ isOpen, onClick }) => {
  return (
    <button className="chatbot-icon" onClick={onClick}>
      <FaRobot />
      {isOpen ? 'X' : 'Chatbot'}
    </button>
  );
};

export default ChatbotIcon;
