// 'use client';

// import { useRouter } from "next/navigation";
// import { ConversationType } from "@/app/inbox/page";

// interface ConversationProps {
//     conversation: ConversationType;
//     userId: string;
// }

// const Conversation: React.FC<ConversationProps> = ({
//     conversation,
//     userId
// }) => {
//     const router = useRouter();
//     const otherUser = conversation.users.find((user) => user.id != userId)

//     return (
//         <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
//             <p className="mb-6 text-xl">{otherUser?.name}</p>

//             <p 
//                 onClick={() => router.push(`/inbox/${conversation.id}`)}
//                 className="text-airbnb-dark"
//             >
//                 Go to conversation
//             </p>
//         </div>
//     )
// }

// export default Conversation;
// "use client";

// import { useRouter } from "next/navigation";

// const Conversation = ({
//     conversation,
//     userId,
// }: {
//     conversation: any;
//     userId: string;
// }) => {
//     const router = useRouter();

//     const otherUser = conversation.users.find(
//         (user) => user.id !== userId
//     );

//     return (
//         <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
//             ...
//         </div>
//     );
// };

// export default Conversation;
"use client";

import { useRouter } from "next/navigation";

const Conversation = ({
    conversation,
    userId,
}: {
    conversation: any;
    userId: string;
}) => {
    const router = useRouter();

    if (!conversation) {
        return null;
    }

    const otherUser = conversation.users?.find(
        (user: any) => user.id !== userId
    );

    if (!otherUser) {
        return null;
    }

    return (
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
            <div>
                {otherUser.name}
            </div>
        </div>
    );
};

export default Conversation;