import { useEffect } from "react";
import { api } from "~/utils/api";
import { NEW_MESSAGE } from "../constants/constant";

export const useGetMessages = (selectedConversationId: any) => {
  const { data: messages, refetch , isLoading} = api.message.messages.useQuery(
  {
    conversationId: selectedConversationId!
  },
  {
    enabled:selectedConversationId !== null && selectedConversationId !== NEW_MESSAGE,
  }
  );

  return {messages, isLoading};
};


