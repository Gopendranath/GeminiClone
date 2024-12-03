import React, { useEffect } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets.js'
import { Context } from '../../context/Context.jsx'

const Sidebar = () => {
    const [extensions, setExtensions] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(true);
    const { onSent, previousPromts, setRecentPromts, newChat } = React.useContext(Context)

    // Add this function to check if screen is mobile width
    const isMobileWidth = () => {
        return window.innerWidth <= 600;
    };

    // Add this useEffect hook
    useEffect(() => {
        const handleResize = () => {
            if (isMobileWidth()) {
                setIsOpen(false);
                setExtensions(false);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const loadPrompt = async (prompt) => {
        setRecentPromts(prompt)
        await onSent(prompt)
    }

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
        // Add delay when closing to let animation complete
        if (isOpen) {
            setTimeout(() => {
                setExtensions(false);
            }, 300);
        } else {
            setExtensions(true);
        }
    };


    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="top">
                <img
                    onClick={toggleSidebar}
                    src={assets.menu_icon}
                    className="menu"
                    alt=""
                />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    <p className={extensions ? 'visible' : ''}>New Chat</p>
                </div>
                    <div className={`recent ${extensions ? 'visible' : ''}`}>
                        <p className="recent-title">Recent</p>
                        {
                            previousPromts.map((item, index) => {
                                return (
                                    <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                        <img src={assets.message_icon} alt="" />
                                        <p>{item.slice(0, 13)} ...</p>
                                    </div>
                                )
                            })

                        }
                    </div>
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extensions ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extensions ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extensions ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar