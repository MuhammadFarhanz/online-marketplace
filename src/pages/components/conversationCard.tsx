// ConversationCard.tsx
import React from 'react';

interface ConversationCardProps {
  data: any;
  setSelectedConversationId: (conversationId: string) => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ data, setSelectedConversationId }) => {
  const recipient = data.conversation.conversationUsers[0]?.userId === data.userId
    ? data.conversation.conversationUsers[1]?.user
    : data.conversation.conversationUsers[0]?.user;

  return (
    <div
      className="bg-black h-20 text-white flex p-4"
      onClick={() => setSelectedConversationId(data.conversationId)}
    >
      <img src={recipient.image} className="rounded-full w-12" alt="Recipient" />
      {recipient.name}
    </div>
  );
};

export default ConversationCard;
