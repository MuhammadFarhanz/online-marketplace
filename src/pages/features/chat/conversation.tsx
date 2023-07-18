import React from "react";
import { api } from "~/utils/api";

interface ConversationCardProps {
  data: any;
  onClick: (data: any) => void; 
  selectedConversationId: string | null;
  onConversationDataFetched: (data: any) => void; 
}

const ConversationCard: React.FC<ConversationCardProps> = ({ data, onClick ,selectedConversationId, onConversationDataFetched}) => {
  const recipient = data.conversation.conversationUsers[0]?.userId === data.userId
      ? data.conversation.conversationUsers[1]?.user
      : data.conversation.conversationUsers[0]?.user;

      if(selectedConversationId){
        try {
                const response = api.message.getConversation.useQuery({
                  conversationId: selectedConversationId,
                });
                onConversationDataFetched(response.data);
              } catch (error) {
                console.error('Error fetching conversation details:', error);
             }
      }

    return (
    <div className="bg-black h-20 text-white flex p-4" onClick={() => onClick(data)}>
      <img src={recipient.image} className="rounded-full w-12" alt="Recipient" />
      {recipient.name}
    </div>
    );
};

export default ConversationCard;
