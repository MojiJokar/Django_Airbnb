'use client';

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "@/app/lib/actions";
// import apiService from "@/app/services/apiService";
import { loginUser } from "@/app/lib/authActions";


const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async () => {
        const formData = {
            email: email,
            password: password
        }

        console.log("LOGIN DATA:", formData);
        // const response = await apiService.postWithoutToken('/api/auth/login/', JSON.stringify(formData))
        // const response = await apiService.postWithoutToken('/api/auth/login/', formData)

        const response = await loginUser(formData);

        console.log("LOGIN RESPONSE:", response);
        
        // if (response.success) {
        //     console.log("Logged in");
        //     console.log(response.data);
        // } else {
        //     console.log(response.error);
        // }
        if (response.success) {
            console.log("Logged in");
        
            loginModal.close();
        
            router.refresh();
        } else {
            console.log("LOGIN FAILED:", response.error);
        
            setErrors([
                response.error || "Unable to log in.",
            ]);
        }







        console.log("TYPE:", typeof formData);

        // if (response.access) {
        //     handleLogin(response.user.pk, response.access, response.refresh);

        //     loginModal.close();

        //     router.push('/')
        // } else {
        //     setErrors(response.non_field_errors);
        // }
        if (response.access) {
            await handleLogin(
                response.user.pk,
                response.access,
                response.refresh
            );
        
            loginModal.close();
        
            router.push('/');
        }
    }

    const content = (
        <>
            <form 
                action={submitLogin}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
            
                {errors.map((error, index) => {
                    return (
                        <div 
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}

                <CustomButton
                    label="Submit"
                    onClick={submitLogin}
                />
            </form>
        </>
    )

    return (
        <Modal
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    )
}

export default LoginModal;
