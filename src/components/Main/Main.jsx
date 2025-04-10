import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets.js'
import { Context } from '../../context/Context.jsx'

const Main = () => {
    const { onSent, recentPromts, showResult, loading, resultData, setInput, input } = React.useContext(Context)


    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, dev..</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">

                                <p>Suggest beautiful places to see on and upcomming road trips</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">

                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">

                                <p>Brainstrome team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPromts}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>

                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Prompt...'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && input.trim()) {
                                    onSent(input);
                                    setInput('');   
                                }
                            }}
                        />

                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent(input)} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info"> Gimini can make mistakes.. </p>
                </div>
            </div>
        </div>
    )
}

export default Main