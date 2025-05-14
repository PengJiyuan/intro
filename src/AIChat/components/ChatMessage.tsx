import React, { useEffect, useState } from 'react';
import { Avatar } from '@arco-design/web-react';
import { IconUser, IconRobot } from '@arco-design/web-react/icon';

interface ChatMessageProps {
  type: 'ai' | 'user';
  content: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animation delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {type === 'ai' && (
        <Avatar className="mt-1 mr-3 bg-gradient-to-r from-indigo-500 to-purple-500">
          <IconRobot />
        </Avatar>
      )}
      
      <div 
        className={`
          chat-message message-appear message-${type} 
          ${visible ? 'opacity-100' : 'opacity-0'}
          ${type === 'user' ? 'bg-indigo-50 text-gray-800' : 'bg-white text-gray-800'}
          shadow-sm
        `}
      >
        {content}
      </div>
      
      {type === 'user' && (
        <Avatar className="mt-1 ml-3 bg-gradient-to-r from-purple-500 to-indigo-500">
          <IconUser />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
  