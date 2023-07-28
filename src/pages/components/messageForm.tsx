// MessageForm.tsx
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { api } from '~/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useSendMessage } from '../hooks/useSendMessage';
interface MessageFormProps {
  recipient: string | string[] | undefined;
  conversationId: string | null;
}
interface Message {
  message: string;
}

const MessageForm: React.FC<MessageFormProps> = ({ recipient, conversationId }) => {
  const sendMessage = useSendMessage()

  const formik = useFormik<Message>({
    initialValues: {
      message: '',
    },
    onSubmit: async (values: Message, { resetForm }) => {
      const recipientId = typeof recipient === 'string' ? recipient : '';
      if (conversationId) {
        sendMessage({  
            messageText: values.message,
            conversationId: conversationId,
            userId: recipientId,
        })
      } else {
        console.log('id does not exist');
      }
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}  className=" h-[10%] border-black  border-t-2 shadow-md  px-8 pt-6 pb-6 absolute bottom-0 w-full">
      <div className="flex" >
        <input
          className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          name="message"
          placeholder="Enter message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 ml-2 rounded-full focus:outline-none focus:shadow-outline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
