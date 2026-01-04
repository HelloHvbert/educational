import React, { useState } from 'react';
import { getUserProgress, resetUserProgress, getUser, updateUserLearningStyle } from '../utils/storage';
import { chaptersData } from '../data';

const Statistics = () => {
    const username = localStorage.getItem('currentUser') || '';
    const [progress, setProgress] = useState(getUserProgress(username));
    const user = getUser(username);
    const [learningStyle, setLearningStyle] = useState(user?.learningStyle || 'visual');

    const handleResetProgress = () => {
        if (window.confirm('Are you sure you want to reset all your progress? This will clear all chapter reads, test results, and statistics. This action cannot be undone.')) {
            resetUserProgress(username);
            setProgress(getUserProgress(username));
        }
    };

    const handleLearningStyleChange = (e) => {
        const newLearningStyle = e.target.value;
        updateUserLearningStyle(username, newLearningStyle);
        setLearningStyle(newLearningStyle);
        // Force page reload to update the learning style badge in the navbar
        window.location.reload();
    };

    const totalReads = Object.values(progress.chaptersRead || {}).reduce((a, b) => a + b, 0);
    const totalTests = Object.values(progress.testsTaken || {}).reduce((a, b) => a + b, 0);
    const allGrades = Object.values(progress.testGrades || {}).flat();
    const overallAvg = allGrades.length > 0 
        ? Math.round(allGrades.reduce((a, b) => a + b, 0) / allGrades.length)
        : 'N/A';

    return (
        <div className="content-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                <h2>Your Progress Statistics</h2>
                <button 
                    className="btn-secondary" 
                    onClick={handleResetProgress}
                    style={{ marginRight: '10px' }}
                >
                    Reset Progress
                </button>
            </div>
            <h3>Chapter Statistics</h3>
            <table className="statistics-table">
                <thead>
                    <tr>
                        <th>Chapter</th>
                        <th>Times Read</th>
                        <th>Tests Taken</th>
                        <th>Average Grade</th>
                        <th>Best Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {chaptersData.map(chapter => {
                        const chapterId = chapter.id;
                        const readCount = progress.chaptersRead[chapterId] || 0;
                        const testCount = progress.testsTaken[chapterId] || 0;
                        const testGrades = progress.testGrades[chapterId] || [];
                        const avgGrade = testGrades.length > 0 
                            ? Math.round(testGrades.reduce((a, b) => a + b, 0) / testGrades.length)
                            : 'N/A';
                        const bestGrade = testGrades.length > 0 
                            ? Math.max(...testGrades)
                            : 'N/A';

                        return (
                            <tr key={chapterId}>
                                <td>{chapter.title}</td>
                                <td>{readCount}</td>
                                <td>{testCount}</td>
                                <td>{avgGrade}%</td>
                                <td>{bestGrade}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="card" style={{ marginTop: '30px' }}>
                <h3>Overall Statistics</h3>
                <p><strong>Total Chapter Reads:</strong> {totalReads}</p>
                <p><strong>Total Tests Taken:</strong> {totalTests}</p>
                <p><strong>Overall Average Grade:</strong> {overallAvg}%</p>
            </div>

            <div className="card" style={{ marginTop: '30px' }}>
                <h3>Learning Style Settings</h3>
                <div style={{ marginTop: '15px' }}>
                    <label htmlFor="learning-style-select" style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                        Current Learning Style:
                    </label>
                    <select
                        id="learning-style-select"
                        value={learningStyle}
                        onChange={handleLearningStyleChange}
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            padding: '10px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '1em',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="visual">Visual - Learn by seeing (diagrams, images, videos)</option>
                        <option value="auditory">Auditory - Learn by hearing (lectures, discussions)</option>
                        <option value="kinesthetic">Kinesthetic - Learn by doing (hands-on activities)</option>
                    </select>
                    <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
                        Changing your learning style will affect how chapter content is presented to you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;

