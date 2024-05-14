import { createContext, useEffect, useState } from "react";

export const LikeContext = createContext();

export const LikeContextProvider = ({ children }) => {
    const [liked, setLiked] = useState(
        JSON.parse(localStorage.getItem("liked")) || false
    );

    const toggle = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        localStorage.setItem("liked", liked);
    }, [liked]);

    return (
        <LikeContext.Provider value={{ liked, toggle }}>
            { children }
        </LikeContext.Provider>
    );
};