import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPromts, setRecentPromts] = useState('');
    const [previousPromts, setPreviousPromts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 30 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true);

        let response;

        const finalPrompt = prompt !== undefined ? prompt : input;

        response = await run(finalPrompt);
        setRecentPromts(finalPrompt);

        if (!previousPromts.includes(finalPrompt)) {
            setPreviousPromts(prev => [...prev, finalPrompt]);
        }

        // Formatting response: **bold**, *line break*
        let formattedResponse = response
            .split("**")
            .map((part, index) => index % 2 === 1 ? `<b>${part}</b>` : part)
            .join("");

        formattedResponse = formattedResponse.split("*").join("</br>");

        const words = formattedResponse.split(" ");
        words.forEach((word, index) => delayPara(index, word + " "));

        setLoading(false);
        setInput('');
    };

    const contextValue = {
        previousPromts,
        setPreviousPromts,
        onSent,
        input,
        setInput,
        recentPromts,
        setRecentPromts,
        showResult,
        loading,
        resultData,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
