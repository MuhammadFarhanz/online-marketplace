// ConversationList.js
import React from "react";
import ConversationCard from "~/pages/components/conversationCard";

const ConversationList = ({
  conversations,
  setSelectedConversationId,
  setCurrentRecipient,
}: any) => {
  return (
    <div className="mt-6 h-full  flex-col rounded-md border border-black">
      {conversations ? (
        conversations.map((conversationData: any) => (
          <ConversationCard
            key={conversationData.id}
            data={conversationData}
            setSelectedConversationId={setSelectedConversationId}
            setCurrentRecipient={setCurrentRecipient}
          />
        ))
      ) : (
        <div>No conversations available.</div>
      )}
    </div>
  );
};

export default ConversationList;
