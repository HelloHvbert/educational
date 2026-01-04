import React, { useState } from 'react';
import { getUser, createUser } from '../utils/storage';

const Auth = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [learningStyle, setLearningStyle] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        
        const user = getUser(username);
        if (!user || user.password !== password) {
            setError('Invalid username or password');
            return;
        }
        
        onLogin(username);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        
        if (!username || !password || !learningStyle) {
            setError('Please fill in all fields');
            return;
        }
        
        const success = createUser(username, password, learningStyle);
        if (!success) {
            setError('Username already exists');
            return;
        }
        
        alert('Registration successful! Please login.');
        setIsRegister(false);
        setUsername('');
        setPassword('');
        setLearningStyle('');
    };

    return (
        <div className="auth-section">
            <div className="auth-container">
                <h2>Welcome!</h2>
                {!isRegister ? (
                    <form className="auth-form" onSubmit={handleLogin}>
                        <h3>Login</h3>
                        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                        <p>
                            Don't have an account?{' '}
                            <a onClick={() => setIsRegister(true)}>Register here</a>
                        </p>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleRegister}>
                        <h3>Register</h3>
                        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="learning-style">Learning Style (VAK Model):</label>
                        <select
                            id="learning-style"
                            value={learningStyle}
                            onChange={(e) => setLearningStyle(e.target.value)}
                            required
                        >
                            <option value="">Select your learning style</option>
                            <option value="visual">Visual - Learn by seeing (diagrams, images, videos)</option>
                            <option value="auditory">Auditory - Learn by hearing (lectures, discussions)</option>
                            <option value="kinesthetic">Kinesthetic - Learn by doing (hands-on activities)</option>
                        </select>
                        <button type="submit">Register</button>
                        <p>
                            Already have an account?{' '}
                            <a onClick={() => setIsRegister(false)}>Login here</a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;

