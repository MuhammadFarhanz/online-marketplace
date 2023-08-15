import { useFormik } from "formik";
import { NEW_MESSAGE } from "~/constants/newMessage";
import { api } from "~/utils/api";
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

/**
 * Represents the form for sending messages.
 *
 * This component provides a user interface for composing and sending messages.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string|string[]|undefined} props.recipient - The recipient of the message.
 * @param {string|null} props.currentConversationId - The ID of the current conversation.
 * @param {React.Dispatch<React.SetStateAction<string|null>>} props.setSelectedConversationId - A function to set the selected conversation ID.
 * @returns {JSX.Element} The JSX element representing the message form.
 */

const MessageForm: React.FC<MessageFormProps> = ({
  recipient,
  currentConversationId,
  setSelectedConversationId,
}) => {
  // Access the API context to retrieve utilities
  const utils = api.useContext();

  // Initialize the send message mutation using the API
  const sendMessageMutation = api.message.sendMessage.useMutation();

  // Use Formik for managing form state and handling form submissions
  const formik = useFormik<Message>({
    initialValues: {
      message: "",
    },
    onSubmit: async (values: Message, { resetForm }) => {
      const recipientId = typeof recipient === "string" ? recipient : "";
      if (values.message !== "") {
        sendMessageMutation.mutate(
          {
            messageText: values.message,
            ...(currentConversationId === NEW_MESSAGE
              ? { userId: recipientId! }
              : { conversationId: currentConversationId }),
          },
          {
            onSettled: (data, error) => {
              // Invalidate conversation and messages caches
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
        );
      } else {
        console.log("Message cannot be empty");
      }
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" absolute bottom-0 flex h-[10%] w-full items-center border-t border-black   px-8 pb-6 pt-6 shadow-md"
    >
      <div className="flex  w-full  ">
        <input
          className="w-[95%] appearance-none rounded-md border border-black bg-[#E9E9E9] px-3 py-2 leading-tight placeholder:text-black focus:outline-none"
          id="message"
          name="message"
          placeholder="Enter message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />

        <button
          type="submit"
          className="focus:shadow-outline ml-2 flex w-[5%] items-center justify-center rounded-md border border-black px-2 py-2 font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
