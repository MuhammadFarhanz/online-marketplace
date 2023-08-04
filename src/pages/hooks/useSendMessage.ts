import { api } from '~/utils/api';
import useGetMessages from './useGetMessage';

export const useSendMessage = () => {
//   const messages = useGetMessages(selectedConversationId);
  const sendMessageMutation = api.message.sendMessage.useMutation();

  const sendMessage = async (messageData:any) => {

    try {
      const data = await sendMessageMutation.mutateAsync(messageData.messageText.message, messageData.conversationId)
      
      return data;
    } catch (error) {
      // Handle error if needed
      console.error('Failed to sendMessage:', error);
    }
  };

  return sendMessage;
};
