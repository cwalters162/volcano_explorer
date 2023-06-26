import {json, Link, useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useState} from "react";
import {User} from "../App";
import {AuthProvider, useAuth} from "../utils/AuthProvider";
import {backend_port, backend_fqdn} from "../utils/env";

interface LoginFormInputObject {
    name: string,
    password: string
}

export default function LoginFormModal() {
    const [creds, setCreds] = useState<LoginFormInputObject>({ name: "", password: ""});
    const [showModal, setShowModal] = useState(false)

    const { login } = useAuth();
    const navigate = useNavigate();


    async function handleLogin(): Promise<void> {
        try {
            const response = await fetch(`http://${backend_fqdn}:${backend_port}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(creds),
            });
            if (response.status == 200) {
                const result = await response.json();
                await login(result)
                navigate("/app/menu")
                console.log("Success:", result);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <button
                className="bg-green-500 text-black active:bg-blue-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-64"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Login
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font=semibold">Login</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Username
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                               onChange={(e) => setCreds({...creds, name: e.target.value})}
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Password
                                        </label>
                                        <input
                                            type={"password"}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                            onChange={(e) => setCreds({...creds, password: e.target.value})}
                                        />
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={handleLogin}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}