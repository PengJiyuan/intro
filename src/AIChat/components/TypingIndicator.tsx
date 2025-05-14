import React from 'react';
import { Avatar } from '@arco-design/web-react';
import { IconRobot } from '@arco-design/web-react/icon';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start mb-4">
      <Avatar className="mt-1 mr-3 bg-gradient-to-r from-indigo-500 to-purple-500">
        <IconRobot />
      </Avatar>
      <div className="chat-message message-ai py-4 px-5 bg-white shadow-sm">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
  