// MessageList.tsx
import { useSession } from 'next-auth/react';
import React from 'react';

interface Message {
    id: string;
    message: string;
    userId: string; 
  }
  
interface MessageListProps {
    messages: Message[];
  }
  
const MessageList: React.FC<MessageListProps> =  ({ messages }) => {
    const { data: sessionData } = useSession();
    const sender = sessionData?.user?.id ;
    console.log(sender)

  return (
    <div>
      {messages.map((message) => (
        
        <div key={message.id} className={`flex items-end m-2 ${message.userId !== sender ? '' : 'justify-end'}`}>
          <div className={`flex flex-col space-y-2 text-md max-w-xs mx-2 ${message.userId !== sender ? 'items-start' : 'items-end'}`}>
            <div>
              <span className={`px-4 py-2 rounded-lg inline-block ${message.userId !== sender ? 'rounded-bl-none bg-gray-300 text-gray-600' : 'rounded-br-none bg-blue-600 text-white'}`}>
                {message.message}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
