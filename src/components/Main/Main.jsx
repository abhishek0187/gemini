import React, {useContext, useEffect, useRef, useState} from 'react';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/Context.jsx";

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 768) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                onSent();
            }
        }
    };

    return (
        <main className="main">
            <nav className="nav">
                <div className="nav-brand">
                    <img src={assets.gemini_icon} alt="User" className="icon"/>
                    <h1>Gemini</h1>
                </div>
                <div className="nav-user">
                    <img src={assets.user_icon} alt="User" className="user-avatar"/>
                </div>
            </nav>
            
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="welcome-section">
                            <div className="greet">
                                <h2>
                                    <span className="greeting-text">Hello, Abhishek <span className="wave animate-wave">👋</span></span>
                                </h2>
                                <p className="greeting-subtitle">How can I help you today?</p>
                            </div>
                            
                            <div className="suggestion-cards">
                                <div className="card" onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}>
                                    <div className="card-content">
                                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                                        <div className="card-icon">
                                            <img src={assets.compass_icon} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card" onClick={() => setInput("Briefly summarize this concept: urban planning")}>
                                    <div className="card-content">
                                        <p>Briefly summarize this concept: urban planning</p>
                                        <div className="card-icon">
                                            <img src={assets.bulb_icon} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card" onClick={() => setInput("Brainstorm team bonding activities for our work retreat")}>
                                    <div className="card-content">
                                        <p>Brainstorm team bonding activities for our work retreat</p>
                                        <div className="card-icon">
                                            <img src={assets.message_icon} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card" onClick={() => setInput("Tell me about React js and React native")}>
                                    <div className="card-content">
                                        <p>Tell me about React js and React native</p>
                                        <div className="card-icon">
                                            <img src={assets.code_icon} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='chat-history' ref={resultRef}>
                        <div className="message user-message">
                            <div className="message-avatar">
                                <img src={assets.user_icon} alt="User"/>
                            </div>
                            <div className="message-content">
                                <p>{recentPrompt}</p>
                            </div>
                        </div>
                        
                        <div className="message ai-message">
                            <div className="message-avatar">
                                <div className="ai-avatar">
                                    <img src={assets.gemini_icon} alt="Gemini"/>
                                </div>
                            </div>
                            <div className="message-content">
                                {loading ? (
                                    <div className='typing-indicator'>
                                        <div className="typing-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <p>Thinking...</p>
                                    </div>
                                ) : (
                                    <div className="ai-response" dangerouslySetInnerHTML={{__html: resultData}}></div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="input-section">
                <div className="input-container">
                    <div className="search-box">
                        <textarea 
                            rows={rows} 
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={input}
                            placeholder="Message Gemini..."
                            className="message-input"
                        />
                        <div className="input-actions">
                            <button className="action-btn" title="Upload image">
                                <img src={assets.gallery_icon} alt="Gallery"/>
                            </button>
                            <button className="action-btn" title="Voice input">
                                <img src={assets.mic_icon} alt="Microphone"/>
                            </button>
                            <button 
                                className={`send-btn ${input.trim() ? 'active' : ''}`} 
                                onClick={() => input.trim() && onSent()}
                                disabled={!input.trim()}
                                title="Send message"
                            >
                                <img src={assets.send_icon} alt="Send"/>
                            </button>
                        </div>
                    </div>
                    
                    <div className="disclaimer">
                        Gemini may display inaccurate info, including about people, so double-check its responses. 
                        <a href="#" className="privacy-link">Your privacy and Gemini Apps</a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;