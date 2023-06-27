import {createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState} from "react";
import {useAuth} from "./AuthProvider";
export interface UIContext {
    health: number,
    moves: number,
    setHealth: Dispatch<SetStateAction<number>>
    setMoves: Dispatch<SetStateAction<number>>
}

const UiContext = createContext<UIContext>({
    health: 0,
    moves: 0,
    setHealth: () => {},
    setMoves: () => {},
});

interface UiProviderProps {
    children: ReactNode
}

export function UiProvider({ children }: UiProviderProps) {
    const { user } = useAuth()
    const [health, setHealth] = useState(0)
    const [moves, setMoves] = useState(0)


    const value = useMemo(
        () => ({
            health,
            moves,
            setHealth,
            setMoves
        }),
        [user, health, moves]
    );
    return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUI = () => {
    return useContext(UiContext);
};