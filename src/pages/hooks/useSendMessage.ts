import { api } from '~/utils/api';
import useGetMessages from './useGetMessage';

export const useSendMessage = () => {
//   const messages = useGetMessages(selectedConversationId);
  const sendMessageMutation = api.message.sendMessage.useMutation();

  const sendMessage = async (productData:any) => {
    console.log(productData)
    try {
      const data = await sendMessageMutation.mutateAsync(productData.messageText.message, productData.conversationId)

      
     return data;
    } catch (error) {
      // Handle error if needed
      console.error('Failed to sendMessage:', error);
    }
  };

  return sendMessage;
};
