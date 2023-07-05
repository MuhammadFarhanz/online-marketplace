import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

 export default function AuthShowcase() {
    const { data: sessionData } = useSession();
  
    // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //   undefined, // no input
    //   { enabled: sessionData?.user !== undefined }
    // );
  
    return (
      <div className="flex flex-col items-center justify-center gap-4">
     
        <button
          className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }
  