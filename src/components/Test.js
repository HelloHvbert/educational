import React, { useState } from 'react';
import { testsData } from '../data';
import { recordTestResult } from '../utils/storage';

const Test = ({ chapterId, onBack }) => {
    const username = localStorage.getItem('currentUser') || '';
    const test = testsData[chapterId];
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState(null);

    if (!test) {
        return <div>Test not found</div>;
    }

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleAnswerChangeMultipleChoice = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: parseInt(value)
        }));
    };

    const handleSubmit = () => {
        let score = 0;
        const resultsData = {};

        test.forEach(q => {
            const userAnswer = answers[q.id];
            let isCorrect = false;
            let correctAnswerText = '';

            if (q.type === 'fill-blank') {
                const normalizedAnswer = (userAnswer || '').trim().toLowerCase();
                isCorrect = normalizedAnswer === q.correct.toLowerCase();
                correctAnswerText = q.correct;
            } else if (q.type === 'true-false') {
                const boolAnswer = userAnswer === 'true';
                isCorrect = boolAnswer === q.correct;
                correctAnswerText = q.correct ? 'True' : 'False';
            } else if (q.type === 'multiple-choice') {
                const numAnswer = typeof userAnswer === 'string' ? parseInt(userAnswer) : userAnswer;
                isCorrect = numAnswer === q.correct;
                correctAnswerText = q.options[q.correct];
            }

            if (isCorrect) score++;
            
            resultsData[q.id] = {
                isCorrect,
                userAnswer,
                correctAnswer: correctAnswerText
            };
        });

        const percentage = Math.round((score / test.length) * 100);
        recordTestResult(username, chapterId, percentage);
        
        setResults({
            score,
            total: test.length,
            percentage,
            details: resultsData
        });
        setSubmitted(true);
    };

    const getAnswerText = (question, answer) => {
        if (question.type === 'fill-blank') {
            return answer || '(no answer)';
        } else if (question.type === 'true-false') {
            return answer === 'true' ? 'True' : 'False';
        } else if (question.type === 'multiple-choice') {
            const index = typeof answer === 'number' ? answer : parseInt(answer);
            return question.options[index] || '(no answer)';
        }
        return answer || '(no answer)';
    };

    const getFeedbackMessage = (percentage) => {
        if (percentage >= 90) {
            return "🎉 Well done! You answered everything right! Excellent understanding of the material.";
        } else if (percentage >= 70) {
            return "👍 You did pretty well! But you can do better. Review the incorrect answers and try again.";
        } else {
            return "📚 You need repetition! Next time you will definitely do better. Review the chapter and retake the test.";
        }
    };

    return (
        <div className="content-section">
            <button className="back-btn" onClick={onBack}>
                ← Back to Chapter
            </button>
            <h2>Chapter Test</h2>
            
            {!submitted ? (
                <>
                    <div>
                        {test.map((q, index) => (
                            <div key={q.id} className="question-container">
                                <h4>Question {index + 1}: {q.question}</h4>
                                <div className="question-options">
                                    {q.type === 'multiple-choice' && q.options.map((option, optIndex) => (
                                        <label key={optIndex}>
                                            <input
                                                type="radio"
                                                name={`q${q.id}`}
                                                value={optIndex}
                                                checked={answers[q.id] === optIndex}
                                                onChange={(e) => handleAnswerChangeMultipleChoice(q.id, e.target.value)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                    {q.type === 'true-false' && (
                                        <>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`q${q.id}`}
                                                    value="true"
                                                    checked={answers[q.id] === 'true'}
                                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                />
                                                True
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`q${q.id}`}
                                                    value="false"
                                                    checked={answers[q.id] === 'false'}
                                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                />
                                                False
                                            </label>
                                        </>
                                    )}
                                    {q.type === 'fill-blank' && (
                                        <input
                                            type="text"
                                            placeholder="Your answer"
                                            value={answers[q.id] || ''}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-primary" onClick={handleSubmit}>
                        Submit Test
                    </button>
                </>
            ) : (
                <div className="test-results">
                    <h3>Test Results</h3>
                    <div className={`score-display ${
                        results.percentage >= 90 ? 'score-excellent' : 
                        results.percentage >= 70 ? 'score-good' : 
                        'score-needs-improvement'
                    }`}>
                        Score: {results.score} / {results.total} ({results.percentage}%)
                    </div>
                    <div className={`feedback-message ${
                        results.percentage >= 90 ? 'feedback-excellent' : 
                        results.percentage >= 70 ? 'feedback-good' : 
                        'feedback-improve'
                    }`}>
                        {getFeedbackMessage(results.percentage)}
                    </div>
                    <h4>Question Review:</h4>
                    {test.map((q, index) => {
                        const result = results.details[q.id];
                        return (
                            <div key={q.id} className="question-container">
                                <h4>Question {index + 1}: {q.question}</h4>
                                <p className={result.isCorrect ? 'answer-correct' : 'answer-incorrect'}>
                                    Your Answer: {getAnswerText(q, result.userAnswer)} 
                                    {result.isCorrect ? ' ✓ Correct' : ' ✗ Incorrect'}
                                </p>
                                {!result.isCorrect && (
                                    <p><strong>Correct Answer:</strong> {result.correctAnswer}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Test;

