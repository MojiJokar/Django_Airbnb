"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import LogoutButton from "../LogoutButton";
// import useInboxModal from "@/app/hooks/useInboxModal";

interface UserNavProps {
    userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
    const router = useRouter();

    const loginModal = useLoginModal();
    const signupModal = useSignupModal();

    // const inboxModal = useInboxModal();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block rounded-full border p-2">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
            >
                {/* Menu icon */}
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>

                {/* User icon */}
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-[60px] z-40 flex w-[220px] flex-col rounded-xl border bg-white shadow-md">
                    {userId ? (
                        <>
                            <MenuLink
                                label="Inbox"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/inbox");
                                }}
                            />

                            <MenuLink
                                label="My properties"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/myproperties");
                                }}
                            />

                            <MenuLink
                                label="My favorites"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/myfavorites");
                                }}
                            />

                            <MenuLink
                                label="My reservations"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/myreservations");
                                }}
                            />

                            <LogoutButton />


                            <MenuLink
                                label="Landlord"
                                onClick={() => {
                                    setIsOpen(false);
                                    // router.push("/landlords/dfd");
                                    router.push(`/landlords/${userId}`);
                                    
                                }}
                            />
         
                        </>
                    ) : (
                        <>
                            <MenuLink
                                label="Log in"
                                onClick={() => {
                                    console.log("Login clicked");
                                    setIsOpen(false);
                                    loginModal.open();
                                }}
                            />

                            <MenuLink
                                label="Sign Up"
                                onClick={() => {
                                    console.log("Sign up clicked");
                                    setIsOpen(false);
                                    signupModal.open();
                                }}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserNav;