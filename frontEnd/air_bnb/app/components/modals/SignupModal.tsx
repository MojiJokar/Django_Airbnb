"use client";

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
// import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => {
    const router = useRouter();
    const signupModal = useSignupModal();

    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const submitSignup = async () => {
        setErrors([]);

        if (password1 !== password2) {
            setErrors(["Passwords do not match."]);
            return;
        }

        try {  
            const formData = {
                email: email,
                password1: password1,
                password2: password2,
            };

            console.log("Signup data:", formData);

            // IMPORTANT:
            // Pass the object directly.
            // Do NOT use JSON.stringify() here.
            const response = await apiService.post(
                "/api/auth/register/",
                formData
            );

            console.log("Signup successful:", response);
            // we store informatio of the pweron sugned up in cookie !(store data in browser from server action=lib/actions.ts
            if (response.access) {
                handleLogin(
                    response.user.pk,
                    response.access,
                    response.refresh
                );

                signupModal.close();
                router.push("/");
            } else {
                const tmpErrors: string[] = Object.values(response).map(
                    (error: any) => {
                        if (Array.isArray(error)) {
                            return error.join(" ");
                        }

                        return String(error);
                    }
                );

                setErrors(tmpErrors);
            }
        } 
        // catch (error) {
        //     console.error("Signup failed:", error);

        //     setErrors([
        //         "Something went wrong. Please check your information and try again.",
        //     ]);
        // }
        catch (error: any) {
            console.log(error);
        
            const tmpErrors: string[] = [];
        
            Object.values(error).forEach((value: any) => {
                if (Array.isArray(value)) {
                    tmpErrors.push(...value);
                }
            });
        
            setErrors(tmpErrors);
        }
    };

    const content = (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                submitSignup();
            }}
            className="space-y-4"
        >
            <input
                type="email"
                placeholder="Your e-mail address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                required
            />

            <input
                type="password"
                placeholder="Your password"
                value={password1}
                onChange={(event) => setPassword1(event.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                required
            />

            <input
                type="password"
                placeholder="Repeat your password"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                required
            />

            {errors.map((error, index) => (
                <div
                    key={`error_${index}`}
                    className="p-4 bg-red-500 text-white rounded-xl"
                >
                    {error}
                </div>
            ))}

            <CustomButton
                label="Sign Up"
                type="submit"
                onClick={submitSignup}
            />
        </form>
    );

    return (
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign Up"
            content={content}
        />
    );
};

export default SignupModal;