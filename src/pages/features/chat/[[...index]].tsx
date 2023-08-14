import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import MessageList from "~/pages/features/chat/messageList";

import ConversationList from "./ConversationLIst";

import MessageForm from "~/components/messageForm";
import SettingsIcon from "~/components/SVGComponents/settingsIcon";

import { useGetMessages } from "~/hooks/useGetMessage";
import { useFindConversation } from "~/hooks/useFindConversation";
import { NEW_MESSAGE } from "~/constants/newMessage";

const Chat: NextPage = () => {
  const { data: conversations } = api.message.conversations.useQuery();
  // const utils = api.useContext();

  // api.message.onSendMessage.useSubscription(undefined, {
  //   onData: ({ conversationId }) => {
  //     utils.message.conversations.invalidate();
  //     utils.message.messages.invalidate({ conversationId });
  //     // if (!showConversations && currentConversationId !== conversationId) {
  //     //   setShowNotificationBadge(true);
  //     // }
  //   },
  // });

  interface Recipient {
    name: string;
    image: string;
  }

  const router = useRouter();

  const [currentConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const { messages, isLoading } = useGetMessages(currentConversationId);
  const [currentRecipient, setCurrentRecipient] = useState<Recipient | null>(
    null
  );
  const { recipient } = router.query;
  const findconversation = useFindConversation(recipient);
  const recipientId = typeof recipient === "string" ? recipient : "";
  const { data: userData } = api.user.getUser.useQuery(
    { userId: recipientId },
    { enabled: !!recipientId }
  );

  useEffect(() => {
    if (findconversation) {
      setSelectedConversationId(findconversation);
    } else {
      setCurrentRecipient({
        name: userData?.name as string,
        image: userData?.image as string,
      });
      setSelectedConversationId(NEW_MESSAGE);
    }
  }, [findconversation]);

  return (
    <>
      <Head>
        <title>chat</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#F8F8F8] ">
        <main className="container mx-auto flex  h-full flex-col font-helvetica">
          <h1 className="mb-4 ml-0 mt-4  text-4xl text-black">CHAT</h1>
          <div className="flex h-[80vh] w-full justify-between ">
            <div className="mr-4 flex w-[25%] flex-col">
              <div className="relative flex w-full items-center justify-between ">
                <div className="relative flex w-5/6 items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    className="h-12 w-full rounded-lg border border-black py-4 pl-2 pr-10 placeholder:text-black focus:outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="pointer-events-none absolute right-2 top-1/2 h-4 -translate-y-1/2 transform text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <SettingsIcon />
              </div>

              <ConversationList
                conversations={conversations}
                setSelectedConversationId={setSelectedConversationId}
                setCurrentRecipient={setCurrentRecipient}
              />
            </div>

            <div className="relative  ml-2 h-full w-[75%] rounded-md border border-black ">
              {!currentRecipient && <div> select user to start a chat</div>}

              {currentRecipient?.name !== undefined ? (
                <div className="h-[10%] border-b border-black pl-4 pr-4">
                  <div className="flex justify-between  p-4 text-black">
                    <div className="flex flex-row">
                      <img
                        src={currentRecipient?.image}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="relative flex flex-col">
                        <p className="ml-2">{currentRecipient?.name || ""}</p>
                        <div className=" ml-4">
                          <p className="ml-2 text-sm">active</p>
                          <div className="absolute left-[8px] top-8 h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Search"
                        className="rounded-lg border border-black px-4 py-2 pr-20 placeholder:text-black "
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="absolute right-2 top-1/2 h-4 w-5 -translate-y-1/2 transform text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="  mb-30 h-[80%] overflow-y-auto ">
                {messages && (
                  <MessageList
                    messages={messages}
                    conversationId={currentConversationId}
                    isLoading={isLoading}
                  />
                )}
              </div>

              {messages || recipient ? (
                <>
                  <MessageForm
                    currentConversationId={currentConversationId}
                    recipient={recipient}
                    setSelectedConversationId={setSelectedConversationId}
                  />
                </>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default memo(Chat);
