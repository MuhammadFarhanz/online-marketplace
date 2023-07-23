import { useEffect } from "react";
import { api } from "~/utils/api";

const useGetMessages = (selectedConversationId: any) => {
  const { data: messages, refetch } = api.message.messages.useQuery(
  {
    conversationId: selectedConversationId,
  },
  {
    enabled: !!selectedConversationId
  }
  );

  return messages;
};

export default useGetMessages;
