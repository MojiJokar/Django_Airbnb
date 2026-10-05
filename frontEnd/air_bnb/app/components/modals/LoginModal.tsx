//simple test loginModel:
// 'use client';

// import Modal from "./Modal";

// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import useLoginModal from "@/app/hooks/useLoginModal";
// import CustomButton from "../forms/CustomButton";
// import { handleLogin } from "@/app/lib/actions";
// import apiService from "@/app/services/apiService";

// const LoginModal = () => {
//     // const router = useRouter()
//     const loginModal = useLoginModal()
//     const content = (
//         <h2 className="mb-6 text-2xl">welcome to Bangladesh</h2>
//     )



//     return (
//         <Modal
//             isOpen={loginModal.isOpen}
//             close={loginModal.close}
//             label="Log in"
//             content={content}
//         />
//     )
// }

// export default LoginModal;
//------------------------------------------------------------




// //test for rendering
// 'use client';

// import Modal from "./Modal";

// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import useLoginModal from "@/app/hooks/useLoginModal";
// import CustomButton from "../forms/CustomButton";
// import { handleLogin } from "@/app/lib/actions";
// import apiService from "@/app/services/apiService";

// const LoginModal = () => {
//     const loginModal = useLoginModal();

//     console.log("LoginModal is  being called:", loginModal.isOpen);

//     return (
//         <Modal
//             isOpen={loginModal.isOpen}
//             close={loginModal.close}
//             label="Log in"
//             content={<h2 className="mb-6 text-2xl">Welcome to Bangladesh</h2>}
//         />
//     );
// };
// export default LoginModal;
//---------------------------------------------------

// "use client";

// import { useState } from "react";

// import Modal from "./Modal";
// import useLoginModal from "@/app/hooks/useLoginModal";
// import CustomButton from "../forms/CustomButton";
// import useSignupModal from "@/app/hooks/useSignupModal";

// const LoginModal = () => {
//     const loginModal = useLoginModal();
//     const signUpModal = useSignupModal();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState<string[]>([]);

//     const submitLogin = async () => {
//         setErrors([]);

//         const formData = {
//             email,
//             password,
//         };

//         console.log("Login data:", formData);

//         // Later you can call your API here.
//     };

//     const content = (
//         <form
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 submitLogin();
//             }}
//             className="space-y-4"
//         >
//             <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your e-mail address"
//                 type="email"
//                 className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
//             />

//             <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Your password"
//                 type="password"
//                 className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
//             />

//             {errors.map((error, index) => (
//                 <div
//                     key={`error_${index}`}
//                     className="p-4 bg-red-500 text-white rounded-xl"
//                 >
//                     {error}
//                 </div>
//             ))}

//             <CustomButton
//                 label="Submit"
//                 type="submit"
//             />
//         </form>
//     );

//     return (
//         <Modal
//             isOpen={loginModal.isOpen}
//             close={loginModal.close}
//             label="Log in"
//             content={content}
//         />
//     );
// };

// export default LoginModal;
// //-------------------------

//--------------------------
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



 //-------------------------works fine-----------------
 //test for rendering
// 'use client';

// import { useState } from 'react';
// import Modal from './Modal';
// import useLoginModal from '@/app/hooks/useLoginModal';
// import CustomButton from '../forms/CustomButton';

// const LoginModal = () => {
//     const loginModal = useLoginModal();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState<string[]>([]);

//     const submitLogin = async () => {
//         const formData = {
//             email,
//             password,
//         };

//         console.log('Submitting:', formData);
//     };

//     const content = (
//         <form
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 submitLogin();
//             }}
//             className="space-y-4"
//         >
//             <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your e-mail address"
//                 type="email"
//                 className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
//             />

//             <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Your password"
//                 type="password"
//                 className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
//             />

//             {errors.map((error, index) => (
//                 <div
//                     key={`error_${index}`}
//                     className="p-4 bg-red-500 text-white rounded-xl"
//                 >
//                     {error}
//                 </div>
//             ))}

//             <CustomButton
//                 label="Submit"
//                 onClick={submitLogin}
//             />
//         </form>
//     );

//     return (
//         <Modal
//             isOpen={loginModal.isOpen}
//             close={loginModal.close}
//             label="Log in"
//             content={content}
//         />
//     );
// };

// export default LoginModal;
























