import React, {ReactElement, ReactNode} from "react";
import {useAuth} from "../utils/AuthProvider";
import {useUI} from "../utils/UiProvider";

interface UIHeaderProps {
    children: ReactNode
}

export default function UIHeader({ children }: UIHeaderProps) {
    const { user, logout } = useAuth()
    const { health, moves } = useUI()

    return (
        <>
            <header>
                <nav className={'text-white w-full text-5xl bg-gradient-to-b from-red-900 to-red-700 pb-2 px-2'}>
                    <div className={"flex justify-between"}>
                        <span>Volcano Explorer</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                    <div className={"grid lg:grid-flow-col"}>
                        <span className={""}>{`${user ? user.name : ""}`}</span>
                        <div className={"flex justify-between pr-3"}>
                            <span>Health: </span>
                            <span className={""}>{`${health}`}</span>
                        </div>
                        <div className={"flex justify-between pr-3"}>
                            <span>Moves: </span>
                            <span className={""}>{`${moves}`}</span>
                        </div>
                        <div className={"flex justify-between pr-3"}>
                            <span>Wins: </span>
                            <span className={""}>{`${user ? user.won : 0}`}</span>
                        </div>
                        <div className={"flex justify-between pr-3"}>
                            <span>Losses: </span>
                            <span className={""}>{`${user ? user.loss : 0}`}</span>
                        </div>
                    </div>
                </nav>
            </header>
            {children}
        </>
    )
}