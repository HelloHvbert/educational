import React, { useEffect } from 'react';
import { getUser } from '../utils/storage';
import { chaptersData } from '../data';
import { recordChapterRead } from '../utils/storage';

const ChapterContent = ({ chapterId, onTakeTest, onBack }) => {
    const username = localStorage.getItem('currentUser') || '';
    const chapter = chaptersData.find(c => c.id === chapterId);
    
    useEffect(() => {
        if (chapterId && username) {
            recordChapterRead(username, chapterId);
        }
    }, [chapterId, username]);

    if (!chapter) {
        return <div>Chapter not found</div>;
    }

    const user = getUser(username);
    const learningStyle = user?.learningStyle || 'visual';
    const content = chapter.content[learningStyle] || chapter.content.visual;

    return (
        <div className="content-section">
            <button className="back-btn" onClick={onBack}>
                ← Back to Chapters
            </button>
            <h2>Chapter {chapterId}: {chapter.title}</h2>
            <div 
                className="chapter-content" 
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="chapter-actions">
                <button className="btn-primary" onClick={onTakeTest}>
                    Take Test
                </button>
            </div>
        </div>
    );
};

export default ChapterContent;

