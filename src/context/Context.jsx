import React, { createContext } from "react";
import run from "../config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {

    const [input , setInput] = React.useState('')
    const [recentPromts , setRecentPromts] = React.useState("")
    const [previousPromts , setPreviousPromts] = React.useState([])
    const [showResult , setshowResult] = React.useState(false)
    const [loading , setLoading] = React.useState(false)
    const [resultData , setresultData] = React.useState("")

    const delayPara = (index, nextWord) => {
        setTimeout(function (){
            setresultData(prev => prev + nextWord)
        }, 30 * index)

    }

    const newChat = () => {
        setLoading(false)
        setshowResult(false)
    }


    const onSent = async (prompt) => {
        setresultData("")
        setLoading(true)
        setshowResult(true)
        
        let response;
        
        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPromts(prompt)
            if (!previousPromts.includes(prompt)) {
                setPreviousPromts(prev => [...prev, prompt])
            }
        } else {
            response = await run(input)
            setRecentPromts(input)
            if (!previousPromts.includes(input)) {
                setPreviousPromts(prev => [...prev, input])
            }
        }
        let responseArray = response.split("**")
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if ( i == 0 || i % 2 != 1) {
                newResponse += responseArray[i]
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i]+" ")
        }
        setLoading(false)
        setInput("")
    }

    
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
    }




    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider