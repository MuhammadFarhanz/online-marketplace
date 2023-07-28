import { api } from '~/utils/api';

export const useSendMessage = () => {
  const sendMessageMutation = api.message.sendMessage.useMutation();

  const sendMessage = async (productData:any) => {
    try {
      const data = await sendMessageMutation.mutateAsync(productData);
      // Handle success if needed
      console.log('ini message:', data);
    } catch (error) {
      // Handle error if needed
      console.error('Failed to sendMessage:', error);
    }
  };

  return sendMessage;
};
