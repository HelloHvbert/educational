// Application state
let currentUser = null;
let currentChapter = null;
let currentTest = null;
let userAnswers = {};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
});

function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
    if (!localStorage.getItem('studentProgress')) {
        localStorage.setItem('studentProgress', JSON.stringify({}));
    }
}

// Authentication functions
function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const learningStyle = document.getElementById('learning-style').value;

    if (!username || !password || !learningStyle) {
        alert('Please fill in all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));

    if (users[username]) {
        alert('Username already exists');
        return;
    }

    users[username] = {
        password: password,
        learningStyle: learningStyle
    };

    // Initialize student progress
    const progress = JSON.parse(localStorage.getItem('studentProgress'));
    progress[username] = {
        chaptersRead: {},
        testsTaken: {},
        testGrades: {},
        lastActivity: []
    };

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('studentProgress', JSON.stringify(progress));

    alert('Registration successful! Please login.');
    showLogin();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users'));

    if (!users[username] || users[username].password !== password) {
        alert('Invalid username or password');
        return;
    }

    currentUser = username;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('current-user').textContent = username;
    
    const learningStyle = users[username].learningStyle;
    document.getElementById('learning-style-badge').textContent = 
        `Learning Style: ${learningStyle.charAt(0).toUpperCase() + learningStyle.slice(1)}`;

    showDashboard();
}

function logout() {
    currentUser = null;
    currentChapter = null;
    currentTest = null;
    userAnswers = {};
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
}

// Navigation functions
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard').style.display = 'block';
    updateDashboard();
}

function showChapters() {
    hideAllSections();
    document.getElementById('chapters').style.display = 'block';
    displayChaptersList();
}

function showChapterContent(chapterId) {
    hideAllSections();
    document.getElementById('chapter-content').style.display = 'block';
    currentChapter = chapterId;
    displayChapterContent(chapterId);
    recordChapterRead(chapterId);
}

function returnToChapter() {
    if (currentChapter) {
        hideAllSections();
        document.getElementById('chapter-content').style.display = 'block';
        displayChapterContent(currentChapter);
    }
}

function showStatistics() {
    hideAllSections();
    document.getElementById('statistics').style.display = 'block';
    displayStatistics();
}

function hideAllSections() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('chapters').style.display = 'none';
    document.getElementById('chapter-content').style.display = 'none';
    document.getElementById('test-section').style.display = 'none';
    document.getElementById('statistics').style.display = 'none';
}

// Dashboard functions
function updateDashboard() {
    const progress = JSON.parse(localStorage.getItem('studentProgress'))[currentUser];
    const users = JSON.parse(localStorage.getItem('users'));
    const learningStyle = users[currentUser].learningStyle;

    // Progress summary
    const chaptersReadCount = Object.keys(progress.chaptersRead || {}).length;
    const totalChapters = chaptersData.length;
    const progressPercentage = Math.round((chaptersReadCount / totalChapters) * 100);

    document.getElementById('progress-summary').innerHTML = `
        <p><strong>Chapters Completed:</strong> ${chaptersReadCount} / ${totalChapters}</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%">${progressPercentage}%</div>
        </div>
        <p><strong>Total Tests Taken:</strong> ${Object.keys(progress.testsTaken || {}).length}</p>
    `;

    // Recommended chapters
    const recommended = getRecommendedChapters(progress);
    let recommendedHTML = '<ul>';
    recommended.forEach(chId => {
        const chapter = chaptersData.find(c => c.id === chId);
        if (chapter) {
            recommendedHTML += `<li>${chapter.title}</li>`;
        }
    });
    recommendedHTML += '</ul>';
    document.getElementById('recommended-chapters').innerHTML = recommendedHTML || '<p>Great job! You\'ve completed all chapters!</p>';

    // Recent activity
    const recent = progress.lastActivity.slice(-5).reverse();
    let activityHTML = '<ul>';
    recent.forEach(activity => {
        activityHTML += `<li>${activity}</li>`;
    });
    activityHTML += '</ul>';
    document.getElementById('recent-activity').innerHTML = activityHTML || '<p>No recent activity</p>';
}

function getRecommendedChapters(progress) {
    const recommended = [];
    chaptersData.forEach(chapter => {
        const chapterId = chapter.id;
        const readCount = progress.chaptersRead[chapterId] || 0;
        const testGrades = progress.testGrades[chapterId] || [];
        const avgGrade = testGrades.length > 0 
            ? testGrades.reduce((a, b) => a + b, 0) / testGrades.length 
            : 0;

        // Recommend if not read or if performance is poor (need repetition)
        if (readCount === 0 || (avgGrade > 0 && avgGrade < 70)) {
            recommended.push(chapterId);
        }
    });
    return recommended;
}

// Chapter display functions
function displayChaptersList() {
    const progress = JSON.parse(localStorage.getItem('studentProgress'))[currentUser];
    const chaptersHTML = chaptersData.map(chapter => {
        const chapterId = chapter.id;
        const readCount = progress.chaptersRead[chapterId] || 0;
        const testCount = progress.testsTaken[chapterId] || 0;
        const testGrades = progress.testGrades[chapterId] || [];
        const avgGrade = testGrades.length > 0 
            ? Math.round(testGrades.reduce((a, b) => a + b, 0) / testGrades.length)
            : 'N/A';

        let status = '';
        if (readCount > 0 && avgGrade >= 70) {
            status = '<span style="color: green;">✓ Completed</span>';
        } else if (readCount > 0) {
            status = '<span style="color: orange;">⚠ Needs Review</span>';
        } else {
            status = '<span style="color: blue;">New</span>';
        }

        return `
            <div class="chapter-card">
                <h3>Chapter ${chapterId}: ${chapter.title}</h3>
                <p>Learn the fundamentals of ${chapter.title.toLowerCase()}.</p>
                <div class="chapter-meta">
                    <span>Read: ${readCount} times</span>
                    <span>Tests: ${testCount} attempts</span>
                    <span>Avg Grade: ${avgGrade}%</span>
                    <span>${status}</span>
                </div>
                <button onclick="showChapterContent(${chapterId})" class="btn-primary">Start Learning</button>
            </div>
        `;
    }).join('');

    document.getElementById('chapters-list').innerHTML = chaptersHTML;
}

function displayChapterContent(chapterId) {
    const chapter = chaptersData.find(c => c.id === chapterId);
    if (!chapter) return;

    const users = JSON.parse(localStorage.getItem('users'));
    const learningStyle = users[currentUser].learningStyle;
    const content = chapter.content[learningStyle] || chapter.content.visual;

    document.getElementById('chapter-display').innerHTML = `
        <h2>Chapter ${chapterId}: ${chapter.title}</h2>
        <div class="chapter-content">${content}</div>
    `;
}

function recordChapterRead(chapterId) {
    const progress = JSON.parse(localStorage.getItem('studentProgress'));
    if (!progress[currentUser].chaptersRead[chapterId]) {
        progress[currentUser].chaptersRead[chapterId] = 0;
    }
    progress[currentUser].chaptersRead[chapterId]++;
    
    const date = new Date().toLocaleString();
    progress[currentUser].lastActivity.unshift(`Read Chapter ${chapterId} on ${date}`);
    if (progress[currentUser].lastActivity.length > 10) {
        progress[currentUser].lastActivity = progress[currentUser].lastActivity.slice(0, 10);
    }
    
    localStorage.setItem('studentProgress', JSON.stringify(progress));
}

// Test functions
function takeTest() {
    if (!currentChapter) return;

    hideAllSections();
    document.getElementById('test-section').style.display = 'block';
    document.getElementById('test-results').style.display = 'none';
    document.getElementById('submit-test').style.display = 'block';
    
    currentTest = currentChapter;
    userAnswers = {};
    displayTest(currentTest);
}

function displayTest(chapterId) {
    const test = testsData[chapterId];
    if (!test) return;

    const testHTML = test.map((q, index) => {
        let questionHTML = `<div class="question-container">
            <h4>Question ${index + 1}: ${q.question}</h4>
            <div class="question-options">`;

        if (q.type === 'multiple-choice') {
            q.options.forEach((option, optIndex) => {
                questionHTML += `
                    <label>
                        <input type="radio" name="q${q.id}" value="${optIndex}">
                        ${option}
                    </label>
                `;
            });
        } else if (q.type === 'true-false') {
            questionHTML += `
                <label><input type="radio" name="q${q.id}" value="true"> True</label>
                <label><input type="radio" name="q${q.id}" value="false"> False</label>
            `;
        } else if (q.type === 'fill-blank') {
            questionHTML += `<input type="text" name="q${q.id}" placeholder="Your answer">`;
        }

        questionHTML += '</div></div>';
        return questionHTML;
    }).join('');

    document.getElementById('test-container').innerHTML = testHTML;
    document.getElementById('submit-test').style.display = 'block';
}

function submitTest() {
    if (!currentTest) return;

    const test = testsData[currentTest];
    const answers = {};
    let score = 0;
    let totalQuestions = test.length;

    test.forEach(q => {
        const input = document.querySelector(`input[name="q${q.id}"]:checked`) || 
                     document.querySelector(`input[name="q${q.id}"]`);
        
        if (input) {
            let userAnswer = input.value;
            
            if (q.type === 'fill-blank') {
                userAnswer = userAnswer.trim().toLowerCase();
                answers[q.id] = userAnswer;
                if (userAnswer === q.correct.toLowerCase()) {
                    score++;
                }
            } else if (q.type === 'true-false') {
                answers[q.id] = userAnswer === 'true';
                if (answers[q.id] === q.correct) {
                    score++;
                }
            } else if (q.type === 'multiple-choice') {
                answers[q.id] = parseInt(userAnswer);
                if (answers[q.id] === q.correct) {
                    score++;
                }
            }
        }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    displayTestResults(test, answers, score, totalQuestions, percentage);
    saveTestResults(currentTest, percentage);
}

function displayTestResults(test, answers, score, total, percentage) {
    document.getElementById('submit-test').style.display = 'none';
    document.getElementById('test-results').style.display = 'block';

    let resultsHTML = `<div class="test-results">
        <h3>Test Results</h3>
        <div class="score-display ${
            percentage >= 90 ? 'score-excellent' : 
            percentage >= 70 ? 'score-good' : 
            'score-needs-improvement'
        }">
            Score: ${score} / ${total} (${percentage}%)
        </div>
        <div class="feedback-message ${
            percentage >= 90 ? 'feedback-excellent' : 
            percentage >= 70 ? 'feedback-good' : 
            'feedback-improve'
        }">
            ${getFeedbackMessage(percentage)}
        </div>
        <h4>Question Review:</h4>`;

    test.forEach((q, index) => {
        const userAnswer = answers[q.id];
        let isCorrect = false;
        let correctAnswerText = '';

        if (q.type === 'fill-blank') {
            isCorrect = userAnswer === q.correct.toLowerCase();
            correctAnswerText = q.correct;
        } else if (q.type === 'true-false') {
            isCorrect = userAnswer === q.correct;
            correctAnswerText = q.correct ? 'True' : 'False';
        } else if (q.type === 'multiple-choice') {
            isCorrect = userAnswer === q.correct;
            correctAnswerText = q.options[q.correct];
        }

        resultsHTML += `
            <div class="question-container">
                <h4>Question ${index + 1}: ${q.question}</h4>
                <p class="${isCorrect ? 'answer-correct' : 'answer-incorrect'}">
                    Your Answer: ${getAnswerText(q, userAnswer)} 
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </p>
                ${!isCorrect ? `<p><strong>Correct Answer:</strong> ${correctAnswerText}</p>` : ''}
            </div>
        `;
    });

    resultsHTML += '</div>';
    document.getElementById('test-results').innerHTML = resultsHTML;
}

function getAnswerText(question, answer) {
    if (question.type === 'fill-blank') {
        return answer || '(no answer)';
    } else if (question.type === 'true-false') {
        return answer ? 'True' : 'False';
    } else if (question.type === 'multiple-choice') {
        return question.options[answer] || '(no answer)';
    }
    return answer;
}

function getFeedbackMessage(percentage) {
    if (percentage >= 90) {
        return "🎉 Well done! You answered everything right! Excellent understanding of the material.";
    } else if (percentage >= 70) {
        return "👍 You did pretty well! But you can do better. Review the incorrect answers and try again.";
    } else {
        return "📚 You need repetition! Next time you will definitely do better. Review the chapter and retake the test.";
    }
}

function saveTestResults(chapterId, grade) {
    const progress = JSON.parse(localStorage.getItem('studentProgress'));
    
    if (!progress[currentUser].testsTaken[chapterId]) {
        progress[currentUser].testsTaken[chapterId] = 0;
    }
    progress[currentUser].testsTaken[chapterId]++;
    
    if (!progress[currentUser].testGrades[chapterId]) {
        progress[currentUser].testGrades[chapterId] = [];
    }
    progress[currentUser].testGrades[chapterId].push(grade);
    
    const date = new Date().toLocaleString();
    progress[currentUser].lastActivity.unshift(`Took test for Chapter ${chapterId} - Score: ${grade}% on ${date}`);
    if (progress[currentUser].lastActivity.length > 10) {
        progress[currentUser].lastActivity = progress[currentUser].lastActivity.slice(0, 10);
    }
    
    localStorage.setItem('studentProgress', JSON.stringify(progress));
}

// Statistics functions
function displayStatistics() {
    const progress = JSON.parse(localStorage.getItem('studentProgress'))[currentUser];
    
    let statsHTML = '<h3>Chapter Statistics</h3><table class="statistics-table">';
    statsHTML += '<tr><th>Chapter</th><th>Times Read</th><th>Tests Taken</th><th>Average Grade</th><th>Best Grade</th></tr>';

    chaptersData.forEach(chapter => {
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

        statsHTML += `
            <tr>
                <td>${chapter.title}</td>
                <td>${readCount}</td>
                <td>${testCount}</td>
                <td>${avgGrade}%</td>
                <td>${bestGrade}%</td>
            </tr>
        `;
    });

    statsHTML += '</table>';

    // Overall statistics
    const totalReads = Object.values(progress.chaptersRead || {}).reduce((a, b) => a + b, 0);
    const totalTests = Object.values(progress.testsTaken || {}).reduce((a, b) => a + b, 0);
    const allGrades = Object.values(progress.testGrades || {}).flat();
    const overallAvg = allGrades.length > 0 
        ? Math.round(allGrades.reduce((a, b) => a + b, 0) / allGrades.length)
        : 'N/A';

    statsHTML += `
        <div class="card" style="margin-top: 30px;">
            <h3>Overall Statistics</h3>
            <p><strong>Total Chapter Reads:</strong> ${totalReads}</p>
            <p><strong>Total Tests Taken:</strong> ${totalTests}</p>
            <p><strong>Overall Average Grade:</strong> ${overallAvg}%</p>
        </div>
    `;

    document.getElementById('statistics-content').innerHTML = statsHTML;
}

