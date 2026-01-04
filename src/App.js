import React, { useState, useEffect } from 'react';
import { initializeStorage, getUser } from './utils/storage';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Chapters from './components/Chapters';
import ChapterContent from './components/ChapterContent';
import Test from './components/Test';
import Statistics from './components/Statistics';
import './index.css';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentView, setCurrentView] = useState('dashboard');
    const [currentChapter, setCurrentChapter] = useState(null);

    useEffect(() => {
        initializeStorage();
        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, []);

    const handleLogin = (username) => {
        setCurrentUser(username);
        localStorage.setItem('currentUser', username);
        setCurrentView('dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        setCurrentView('dashboard');
    };

    const handleSelectChapter = (chapterId) => {
        setCurrentChapter(chapterId);
        setCurrentView('chapter');
    };

    const handleTakeTest = () => {
        setCurrentView('test');
    };

    const handleBackToChapters = () => {
        setCurrentView('chapters');
        setCurrentChapter(null);
    };

    const handleBackToChapter = () => {
        setCurrentView('chapter');
    };

    if (!currentUser) {
        return (
            <div className="container">
                <header>
                    <h1>🎓 Educational Learning Platform</h1>
                    <p>Interactive and Adaptive Learning System</p>
                </header>
                <Auth onLogin={handleLogin} />
            </div>
        );
    }

    const user = getUser(currentUser);
    const learningStyle = user?.learningStyle || '';

    return (
        <div className="container">
            <header>
                <h1>🎓 Educational Learning Platform</h1>
                <p>Interactive and Adaptive Learning System</p>
            </header>
            <div className="main-section">
                <nav className="navbar">
                    <div className="nav-user">
                        <span>Welcome, <strong>{currentUser}</strong></span>
                        <span className="learning-style-badge">
                            Learning Style: {learningStyle.charAt(0).toUpperCase() + learningStyle.slice(1)}
                        </span>
                    </div>
                    <div className="nav-links">
                        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
                        <button onClick={() => setCurrentView('chapters')}>Chapters</button>
                        <button onClick={() => setCurrentView('statistics')}>Statistics</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </nav>

                {currentView === 'dashboard' && <Dashboard username={currentUser} onSelectChapter={handleSelectChapter} />}
                {currentView === 'chapters' && <Chapters onSelectChapter={handleSelectChapter} />}
                {currentView === 'chapter' && currentChapter && (
                    <ChapterContent 
                        chapterId={currentChapter} 
                        onTakeTest={handleTakeTest}
                        onBack={handleBackToChapters}
                    />
                )}
                {currentView === 'test' && currentChapter && (
                    <Test 
                        chapterId={currentChapter}
                        onBack={handleBackToChapter}
                    />
                )}
                {currentView === 'statistics' && <Statistics />}
            </div>
        </div>
    );
}

export default App;

