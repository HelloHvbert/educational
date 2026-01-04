import React from 'react';
import { getUserProgress } from '../utils/storage';
import { chaptersData } from '../data';

const Chapters = ({ onSelectChapter }) => {
    // We'll need username from props or context, for now using a placeholder
    // In the real implementation, this should come from App state
    const username = localStorage.getItem('currentUser') || '';
    const progress = getUserProgress(username);

    return (
        <div className="content-section">
            <h2>Educational Chapters</h2>
            {chaptersData.map(chapter => {
                const chapterId = chapter.id;
                const readCount = progress.chaptersRead[chapterId] || 0;
                const testCount = progress.testsTaken[chapterId] || 0;
                const testGrades = progress.testGrades[chapterId] || [];
                const avgGrade = testGrades.length > 0 
                    ? Math.round(testGrades.reduce((a, b) => a + b, 0) / testGrades.length)
                    : 'N/A';
                const bestGrade = testGrades.length > 0 ? Math.max(...testGrades) : 0;

                let status = '';
                // Completed if: best grade is 100% OR (best grade > 70 AND avg score > 50)
                const isCompleted = testGrades.length > 0 && (bestGrade === 100 || (bestGrade > 70 && avgGrade > 50));
                if (readCount > 0 && isCompleted) {
                    status = <span style={{ color: 'green' }}>✓ Completed</span>;
                } else if (readCount > 0) {
                    status = <span style={{ color: 'orange' }}>⚠ Needs Review</span>;
                } else {
                    status = <span style={{ color: 'blue' }}>New</span>;
                }

                return (
                    <div key={chapterId} className="chapter-card">
                        <h3>Chapter {chapterId}: {chapter.title}</h3>
                        <p>Learn the fundamentals of {chapter.title.toLowerCase()}.</p>
                        <div className="chapter-meta">
                            <span>Read: {readCount} times</span>
                            <span>Tests: {testCount} attempts</span>
                            <span>Avg Grade: {avgGrade}%</span>
                            <span>{status}</span>
                        </div>
                        <button 
                            className="btn-primary" 
                            onClick={() => onSelectChapter(chapterId)}
                        >
                            Start Learning
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Chapters;

