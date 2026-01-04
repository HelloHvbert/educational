import React from 'react';
import { getUserProgress, getUser } from '../utils/storage';
import { chaptersData } from '../data';

const Dashboard = ({ username, onSelectChapter }) => {
    const progress = getUserProgress(username);
    const user = getUser(username);
    const learningStyle = user?.learningStyle || '';

    // Count chapters as completed if: best grade is 100% OR (best grade > 70 AND avg score > 50)
    const chaptersCompletedCount = chaptersData.filter(chapter => {
        const chapterId = chapter.id;
        const testGrades = progress.testGrades[chapterId] || [];
        if (testGrades.length === 0) return false;
        const avgGrade = testGrades.reduce((a, b) => a + b, 0) / testGrades.length;
        const bestGrade = Math.max(...testGrades);
        return bestGrade === 100 || (bestGrade > 70 && avgGrade > 50);
    }).length;
    const totalChapters = chaptersData.length;
    const progressPercentage = Math.round((chaptersCompletedCount / totalChapters) * 100);

    const getRecommendedChapters = () => {
        const recommended = [];
        chaptersData.forEach(chapter => {
            const chapterId = chapter.id;
            const testGrades = progress.testGrades[chapterId] || [];
            if (testGrades.length === 0) {
                // Include chapters not tested yet
                recommended.push(chapterId);
                return;
            }
            
            const avgGrade = testGrades.reduce((a, b) => a + b, 0) / testGrades.length;
            const bestGrade = Math.max(...testGrades);
            
            // Exclude completed chapters (best grade is 100% OR (best grade > 70 AND avg score > 50))
            const isCompleted = bestGrade === 100 || (bestGrade > 70 && avgGrade > 50);
            if (!isCompleted) {
                recommended.push(chapterId);
            }
        });
        return recommended;
    };

    const recommended = getRecommendedChapters();
    const recent = (progress.lastActivity || []).slice(-5).reverse();

    return (
        <div className="content-section">
            <h2>Dashboard</h2>
            <div className="dashboard-grid">
                <div className="card">
                    <h3>Your Progress</h3>
                    <div>
                        <p><strong>Chapters Completed:</strong> {chaptersCompletedCount} / {totalChapters}</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}>
                                {progressPercentage}%
                            </div>
                        </div>
                        <p><strong>Total Tests Taken:</strong> {Object.keys(progress.testsTaken || {}).length}</p>
                    </div>
                </div>
                <div className="card">
                    <h3>Recommended Chapters</h3>
                    <div>
                        {recommended.length > 0 ? (
                            <ul>
                                {recommended.map(chId => {
                                    const chapter = chaptersData.find(c => c.id === chId);
                                    return chapter ? (
                                        <li key={chId}>
                                            <a 
                                                href="#" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onSelectChapter(chId);
                                                }}
                                                style={{ 
                                                    color: '#4a5bc7', 
                                                    textDecoration: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                            >
                                                {chapter.title} ↗
                                            </a>
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        ) : (
                            <p>Great job! You've completed all chapters!</p>
                        )}
                    </div>
                </div>
                <div className="card">
                    <h3>Recent Activity</h3>
                    <div>
                        {recent.length > 0 ? (
                            <ul>
                                {recent.map((activity, index) => (
                                    <li key={index}>{activity}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No recent activity</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

