import {json, Link, useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useState} from "react";
import {User} from "../App";
import {AuthProvider, useAuth} from "../hooks/AuthProvider";

export default function LoginPage() {
    const [creds, setCreds] = useState<{name: string, password: string}>({ name: "", password: ""});
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLogin(): Promise<void> {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST", // or 'PUT'
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