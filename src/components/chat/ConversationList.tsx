// ConversationList.js
import React from "react";
import ConversationCard from "./conversationCard";

const ConversationList = ({
  conversations,
  setSelectedConversationId,
  setCurrentRecipient,
}: any) => {
  return (
    <div className="mt-6 h-full bg-black">
      <div className="h-full -translate-x-1 -translate-y-1 flex-col border-2 border-black bg-white">
        {conversations == null ? (
          <div className="flex  h-full items-center justify-center font-bold">
            Start a conversation to connect with others.
          </div>
        ) : (
          conversations.map((conversationData: any) => (
            <ConversationCard
              key={conversationData.id}
              data={conversationData}
              setSelectedConversationId={setSelectedConversationId}
              setCurrentRecipient={setCurrentRecipient}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
