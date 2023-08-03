// MessageList.tsx
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { api } from "~/utils/api";
import { NEW_MESSAGE } from "../../constants";
interface Message {
  id: string;
  message: string;
  userId: string;
}

interface MessageListProps {
  messages: Message[];
  conversationId: string | null;
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  conversationId,
  isLoading,
}) => {
  const { data: sessionData } = useSession();
  const sender = sessionData?.user?.id;

  const scrollRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // if ((conversationId !== NEW_MESSAGE && isLoading)) {
  //   return (
  //     <div className="flex h-full items-center justify-center">
  //       <p>{isLoading ? "Loading..." : "Error"}</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`m-2  flex items-end ${
            message.userId !== sender ? "" : "justify-end"
          }`}
        >
          <div
            className={`text-md mx-2 flex max-w-xs flex-col space-y-2 break-words ${
              message.userId !== sender ? "items-start" : "items-end"
            }`}
          >
            <div>
              <span
                className={`inline-block rounded-lg px-4 py-2  ${
                  message.userId !== sender
                    ? "rounded-bl-none bg-gray-300 text-gray-600"
                    : "rounded-br-none bg-blue-600 text-white"
                }`}
              >
                {message.message}
              </span>
            </div>
          </div>
        </div>
      ))}
      <li ref={scrollRef} className="h-2 bg-black"></li>
    </div>
  );
};

export default MessageList;
