import {json, Link, useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useState} from "react";
import {User} from "../App";

interface LoginPageProps {
    onLogin?: Dispatch<SetStateAction<User | undefined>>
}

export default function LoginPage({ onLogin }: LoginPageProps) {
    const [creds, setCreds] = useState<{name: string, password: string}>({ name: "", password: ""});
    const navigate = useNavigate();

    async function handleLogin(): Promise<void> {
        // For demonstration purposes only. Never use these checks in production!
        // Use a proper authentication implementation
        // if(creds.username === 'admin' && creds.password === '123') {
        //     onLogin && onLogin({
        //         id: 1,
        //         name: creds.username,
        //         won: 0,
        //         loss: 0
        //     });
        //     navigate('/stats');
        // }

    console.log(JSON.stringify(creds))
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(creds),
            });
            const result = await response.json();
            onLogin && onLogin(result);
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div style={{ padding: 10 }}>
            <br/>
            <span>Username:</span><br/>
            <input
                className={"bg-gray-400"}
                type="text"
                onChange={(e) => setCreds({...creds, name: e.target.value})}/><br/>
            <span>Password:</span><br/>
            <input
                className={"bg-gray-400"}
                type="password"
                onChange={(e) => setCreds({...creds, password: e.target.value})}/><br/><br/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}