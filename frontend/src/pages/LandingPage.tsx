import React, {useState} from "react";
import LoginFormModal from "../components/LoginFormModal";
import CreateUserFormModal from "../components/CreateUserFormModal";
import {useAuth} from "../utils/AuthProvider";
import {Navigate, useNavigate} from "react-router-dom";

interface CardProps {
    title: string,
    body: string,
    customCardStyle?: string
    customCardTitleStyle?: string
    customCardBodyStyle?: string
}

function Card({title, body, customCardStyle, customCardTitleStyle, customCardBodyStyle}: CardProps) {
    return (
        <p className={"border-2 m-2 p-2" + customCardStyle}>
            <h1 className={"text-center font-bold text-4xl m-2" + customCardTitleStyle}>
                {title}
            </h1>
            <span className={"text-xl" + customCardBodyStyle}>
                {body}
            </span>
        </p>
    )
}

export default function LandingPage() {
    const {user} = useAuth()
    const navigate = useNavigate()

    if (user) {
        return <Navigate to="/app/menu" />;
    }

    return (
        <div>
            <div className={"text-8xl text-center pb-5 mb-1 font-semibold"}>Volcano Explorer</div>
            <div className={""}>
                <div className={"flex"}>
                    <Card
                        title={"How do I play?"}
                        body={"You can play the game with the arrow keys or wasd once it has been created!"}
                    />
                    <Card
                        title={"Welcome!"}
                        body={"The challenge of the game is to reach the end of the map while taking the least amount of damange in the least amount of moves."}
                    />
                    <Card
                        title={"Features"}
                        body={"The game features multiple types of tiles that can be traversed. Such as Lava, mud, blank, speed."}
                    />
                </div>
                <div className={"grid grid-flow-col"}>
                    <Card
                        customCardBodyStyle={"w-full"}
                        title={"New User"}
                        body={"Free account registration!"}
                    />
                    <Card
                        customCardBodyStyle={""}
                        title={"Returning User"}
                        body={"Continue to survive!"}
                    />
                </div>

                <div className={"bg-red-500 flex justify-evenly align-middle gap-2"}>
                    <CreateUserFormModal/>
                    <LoginFormModal />
                </div>
            </div>
        </div>
    )

    // return (
    //     <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
    //         <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
    //             <h2 className="text-2xl font-bold mb-4">Volcano Explorer!</h2>
    //             <p className="text-gray-600 mb-6">Sign in to play the game!</p>
    //             <form className="space-y-4">
    //                 <div>
    //                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //                         Username
    //                     </label>
    //                     <input
    //                         id="email"
    //                         name="email"
    //                         type="email"
    //                         autoComplete="email"
    //                         required
    //                         className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    //                     />
    //                 </div>
    //                 <div>
    //                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    //                         Password
    //                     </label>
    //                     <input
    //                         id="password"
    //                         name="password"
    //                         type="password"
    //                         autoComplete="current-password"
    //                         required
    //                         className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    //                     />
    //                 </div>
    //                 <div>
    //                     <button
    //                         type="submit"
    //                         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //                     >
    //                         Sign In
    //                     </button>
    //                 </div>
    //             </form>
    //             <div className="text-gray-500 text-center mt-4">
    //                 Don't have an account?{' '}
    //                 <a href="/signup" className="text-indigo-600 hover:underline">
    //                     Sign up here
    //                 </a>
    //                 .
    //             </div>
    //         </div>
    //     </div>
    // )
}