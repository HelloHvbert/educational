# Educational Learning Platform (React Version)

An interactive and adaptive educational software system built with React that teaches programming concepts with personalized learning experiences based on the VAK (Visual, Auditory, Kinesthetic) learning style model.

## Features

### 1. Teaching Presentation
- **3 Educational Chapters** covering fundamental programming concepts:
  - Chapter 1: Introduction to Programming
  - Chapter 2: Data Structures and Algorithms
  - Chapter 3: Object-Oriented Programming
- **Adaptive Content**: Content is automatically adapted based on each student's learning style (Visual, Auditory, or Kinesthetic)
- **Progress-Based Recommendations**: The system recommends chapters based on student performance

### 2. Student Assessment
- **Comprehensive Tests**: Each chapter includes tests with 7 questions
- **Multiple Question Types**:
  - True/False questions
  - Multiple choice questions
  - Fill-in-the-blank questions
- **Immediate Feedback**: 
  - Shows correct and incorrect answers
  - Calculates student grades (percentage)
  - Provides personalized feedback messages based on performance:
    - Excellent (≥90%): "Well done! You answered everything right!"
    - Good (≥70%): "You did pretty well! But you can do better."
    - Needs Improvement (<70%): "You need repetition! Next time you will definitely do better."

### 3. Progress Statistics
- **Detailed Tracking**: Records and displays:
  - Number of times each chapter has been read
  - Number of test attempts per chapter
  - Average grades for each chapter
  - Best grade achieved
  - Overall statistics (total reads, total tests, overall average)
- **Activity History**: Shows recent learning activities

### 4. VAK Learning Style Adaptation
- **Visual Learners**: Content includes diagrams, concept maps, and visual representations
- **Auditory Learners**: Content is presented through discussions, explanations, and narrative descriptions
- **Kinesthetic Learners**: Content includes hands-on activities and practical exercises

## Technology Stack

- **React 18.2.0** - Modern React with hooks
- **JavaScript ES6+** - Modern JavaScript features
- **CSS3** - Styling with responsive design
- **localStorage** - Client-side data persistence (no backend required)

## Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure

```
educational-platform/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Auth.js         # Login/Register component
│   │   ├── Dashboard.js    # Dashboard component
│   │   ├── Chapters.js     # Chapters list component
│   │   ├── ChapterContent.js  # Chapter content display
│   │   ├── Test.js         # Test component
│   │   └── Statistics.js   # Statistics component
│   ├── utils/
│   │   └── storage.js      # localStorage utility functions
│   ├── data.js             # Educational content and test questions
│   ├── App.js              # Main App component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## How to Use

1. **Open the Application**:
   - Run `npm start` to start the development server
   - The app will open automatically in your browser

2. **Register a New Account**:
   - Click "Register here" on the login page
   - Enter a username and password
   - Select your learning style (Visual, Auditory, or Kinesthetic)
   - Click "Register"

3. **Login**:
   - Enter your username and password
   - Click "Login"

4. **Navigate the Platform**:
   - **Dashboard**: View your progress, recommended chapters, and recent activity
   - **Chapters**: Browse and access educational chapters
   - **Statistics**: View detailed progress statistics and can change your learning style

5. **Learn**:
   - Click on a chapter to start learning
   - Content will be displayed according to your learning style
   - After reading, click "Take Test" to assess your understanding

6. **Track Progress**:
   - View your statistics to see how many times you've read each chapter
   - Check your test scores and average grades
   - Review recommended chapters based on your performance
   - Reset your progress with button

## Notes

- All student data is stored locally in the browser's localStorage
- Data persists between sessions but is browser-specific
- To clear all data, clear your browser's localStorage for this site
- The system automatically adapts content presentation based on the selected learning style
- Built with React hooks for modern state management

## Assignment Requirements Compliance

✅ **Teaching Presentation**: 3 chapters with adaptive content based on performance  
✅ **Student Assessment**: Tests with multiple question types (5-10 questions per test)  
✅ **Feedback System**: Correct/incorrect answers, grades, and personalized messages  
✅ **Progress Statistics**: Comprehensive tracking of reads, tests, and grades  
✅ **VAK Learning Style**: Content adaptation based on Visual, Auditory, or Kinesthetic preferences  
✅ **Adaptive Progression**: Chapters recommended based on student performance  

## Development

This project was created with React and uses:
- React Hooks (useState, useEffect) for state management
- Component-based architecture for maintainability
- localStorage API for data persistence
- Modern ES6+ JavaScript features
