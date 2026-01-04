// Storage utility functions for managing user data and progress

export const initializeStorage = () => {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
    if (!localStorage.getItem('studentProgress')) {
        localStorage.setItem('studentProgress', JSON.stringify({}));
    }
};

export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '{}');
};

export const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

export const getUser = (username) => {
    const users = getUsers();
    return users[username];
};

export const createUser = (username, password, learningStyle) => {
    const users = getUsers();
    if (users[username]) {
        return false; // User already exists
    }
    
    users[username] = {
        password,
        learningStyle
    };
    
    // Initialize progress
    const progress = getProgress();
    progress[username] = {
        chaptersRead: {},
        testsTaken: {},
        testGrades: {},
        lastActivity: []
    };
    
    saveUsers(users);
    saveProgress(progress);
    return true;
};

export const getProgress = () => {
    return JSON.parse(localStorage.getItem('studentProgress') || '{}');
};

export const saveProgress = (progress) => {
    localStorage.setItem('studentProgress', JSON.stringify(progress));
};

export const getUserProgress = (username) => {
    const progress = getProgress();
    return progress[username] || {
        chaptersRead: {},
        testsTaken: {},
        testGrades: {},
        lastActivity: []
    };
};

export const recordChapterRead = (username, chapterId) => {
    const progress = getProgress();
    if (!progress[username]) {
        progress[username] = {
            chaptersRead: {},
            testsTaken: {},
            testGrades: {},
            lastActivity: []
        };
    }
    
    if (!progress[username].chaptersRead[chapterId]) {
        progress[username].chaptersRead[chapterId] = 0;
    }
    progress[username].chaptersRead[chapterId]++;
    
    const date = new Date().toLocaleString();
    progress[username].lastActivity.unshift(`Read Chapter ${chapterId} on ${date}`);
    if (progress[username].lastActivity.length > 10) {
        progress[username].lastActivity = progress[username].lastActivity.slice(0, 10);
    }
    
    saveProgress(progress);
};

export const recordTestResult = (username, chapterId, grade) => {
    const progress = getProgress();
    if (!progress[username]) {
        progress[username] = {
            chaptersRead: {},
            testsTaken: {},
            testGrades: {},
            lastActivity: []
        };
    }
    
    if (!progress[username].testsTaken[chapterId]) {
        progress[username].testsTaken[chapterId] = 0;
    }
    progress[username].testsTaken[chapterId]++;
    
    if (!progress[username].testGrades[chapterId]) {
        progress[username].testGrades[chapterId] = [];
    }
    progress[username].testGrades[chapterId].push(grade);
    
    const date = new Date().toLocaleString();
    progress[username].lastActivity.unshift(`Took test for Chapter ${chapterId} - Score: ${grade}% on ${date}`);
    if (progress[username].lastActivity.length > 10) {
        progress[username].lastActivity = progress[username].lastActivity.slice(0, 10);
    }
    
    saveProgress(progress);
};

export const resetUserProgress = (username) => {
    const progress = getProgress();
    if (progress[username]) {
        progress[username] = {
            chaptersRead: {},
            testsTaken: {},
            testGrades: {},
            lastActivity: []
        };
        saveProgress(progress);
        return true;
    }
    return false;
};

export const updateUserLearningStyle = (username, learningStyle) => {
    const users = getUsers();
    if (users[username]) {
        users[username].learningStyle = learningStyle;
        saveUsers(users);
        return true;
    }
    return false;
};

