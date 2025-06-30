import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <div className="menu-toggle" onClick={() => setExtended(prev => !prev)}>
                        <img src={assets.menu_icon} alt="Menu" className="menu-icon" />
                    </div>
                    
                    {extended && (
                        <div className="brand-section">
                            <div className="brand-logo">
                                <img src={assets.gemini_icon} alt="User" className="icon"/>
                                <span className="brand-text">Gemini</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="sidebar-main">
                    <div className="new-chat-container">
                        <button onClick={() => newChat()} className="new-chat-btn">
                            <img src={assets.plus_icon} alt="New Chat" className="plus-icon" />
                            {extended && <span className="new-chat-text">New Chat</span>}
                        </button>
                    </div>

                    {extended && prevPrompts.length > 0 && (
                        <div className="recent-section">
                            <h3 className="recent-title">Recent</h3>
                            <div className="recent-list">
                                {prevPrompts.slice(0, 8).map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => loadPrompt(item)}
                                        className="recent-item"
                                    >
                                        <img src={assets.message_icon} alt="Message" className="message-icon" />
                                        <span className="recent-text">
                                            {item.length > 25 ? `${item.slice(0, 25)}...` : item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="sidebar-footer">
                    <div className="footer-item">
                        <img src={assets.question_icon} alt="Help" className="footer-icon" />
                        {extended && <span className="footer-text">Help</span>}
                    </div>
                    <div className="footer-item">
                        <img src={assets.history_icon} alt="Activity" className="footer-icon" />
                        {extended && <span className="footer-text">Activity</span>}
                    </div>
                    <div className="footer-item">
                        <img src={assets.setting_icon} alt="Settings" className="footer-icon" />
                        {extended && <span className="footer-text">Settings</span>}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;