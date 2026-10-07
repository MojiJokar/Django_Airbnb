// // import { getUserId } from "../lib/actions";
// import { getUserId, getAccessToken } from "../../lib/actions";
// // import apiService from "../services/apiService";
// import apiService from "../../services/apiService";
// import Conversation from "./Conversation";

// export type UserType = {
//     id: string;
//     name: string;
//     avatar_url?: string;
// };

// export type ConversationType = {
//     id: string;
//     users: UserType[];
//     modified_at?: string;
// };

// const InboxPage = async () => {
//     const userId = await getUserId();

//     if (!userId) {
//         return (
//             <main className="max-w-[1500px] mx-auto px-6 py-12">
//                 <p>You need to be authenticated...</p>
//             </main>
//         );
//     }

//     const conversations = await apiService.get("/api/chat/");

//     return (
//         <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
//             <h1 className="my-6 text-2xl">Inbox</h1>

//             {conversations.map(
//                 (conversation: ConversationType) => (
//                     <Conversation
//                         key={conversation.id}
//                         conversation={conversation}
//                         userId={userId}
//                     />
//                 )
//             )}
//         </main>
//     );
// };

// export default InboxPage;


// import { getUserId, getAccessToken } from "../../lib/actions";
// import ConversationDetail from "@/app/components/inbox/ConversationDetail";
// import apiService from "../../services/apiService";
// import { UserType } from "../page";

// export type MessageType = {
//     id: string;
//     name: string;
//     body: string;
//     conversationId: string;
//     sent_to: UserType;
//     created_by: UserType;
// };

// const ConversationPage = async ({
//     params,
// }: {
//     params: { id: string };
// }) => {
//     const userId = await getUserId();
//     const token = await getAccessToken();

//     if (!userId || !token) {
//         return (
//             <main className="max-w-[1500px] mx-auto px-6 py-12">
//                 <p>You need to be authenticated...</p>
//             </main>
//         );
//     }

//     const conversation = await apiService.get(
//         `/api/chat/${params.id}/`
//     );

//     return (
//         <main className="max-w-[1500px] mx-auto px-6 pb-6">
//             <ConversationDetail
//                 token={token}
//                 userId={userId}
//                 messages={conversation.messages}
//                 conversation={conversation.conversation}
//             />
//         </main>
//     );
// };

// export default ConversationPage;
import { getUserId, getAccessToken } from "../../lib/actions";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import apiService from "../../services/apiService";
import { UserType } from "../page";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
};

const ConversationPage = async ({
    params,
}: {
    params: { id: string };
}) => {
    console.log("🔥 CONVERSATION PARAMS:", params);
    console.log("🔥 CONVERSATION ID:", params?.id);

    const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        );
    }

    if (!params?.id) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>Conversation ID is missing.</p>
            </main>
        );
    }

    const conversation = await apiService.get(
        `/api/chat/${params.id}/`
    );

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    );
};

export default ConversationPage;