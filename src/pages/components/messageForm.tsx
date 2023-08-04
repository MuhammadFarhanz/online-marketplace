// MessageForm.tsx
import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { api } from "~/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useSendMessage } from "../hooks/useSendMessage";
import { NEW_MESSAGE } from "../constants";
interface MessageFormProps {
  recipient: string | string[] | undefined;
  currentConversationId: string | null;
  setSelectedConversationId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}
interface Message {
  message: string;
}

const MessageForm: React.FC<MessageFormProps> = ({
  recipient,
  currentConversationId,
  setSelectedConversationId,
}) => {
  const utils = api.useContext();
  console.log(recipient, "ini recipient");

  const sendMessageMutation = api.message.sendMessage.useMutation();

  const formik = useFormik<Message>({
    initialValues: {
      message: "",
    },
    onSubmit: async (values: Message, { resetForm }) => {
      const recipientId = typeof recipient === "string" ? recipient : "";
      console.log(recipientId, "ini coyy");
      if (values) {
        sendMessageMutation.mutate(
          {
            messageText: values.message,
            ...(currentConversationId === NEW_MESSAGE
              ? { userId: recipientId! }
              : { conversationId: currentConversationId }),
          },
          {
            onSettled: (data, error) => {
              if (currentConversationId !== NEW_MESSAGE) {
                utils.message.conversations.invalidate();
                utils.message.messages.invalidate({
                  conversationId: currentConversationId!,
                });
              }
              if (data) {
                setSelectedConversationId(data.id);
              }
              if (error) {
                alert(error.message);
              }
            },
          }
        ),
          console.log("bisa yok");
      } else {
        console.log("id does not exist");
      }
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" absolute bottom-0  h-[10%] w-full  border-t-2 border-black px-8 pb-6 pt-6 shadow-md"
    >
      <div className="flex">
        <input
          className="focus:shadow-outline w-full appearance-none rounded-full border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="message"
          name="message"
          placeholder="Enter message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          className="focus:shadow-outline ml-2 rounded-full bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
