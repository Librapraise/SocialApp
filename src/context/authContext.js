import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });

    const [users, setUsers] = useState(() => {
        try {
            const storedUsers = localStorage.getItem("users");
            return storedUsers ? JSON.parse(storedUsers) : [];
        } catch (error) {
            console.error("Error parsing users from localStorage:", error);
            return [];
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Register new user
    const register = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const { username, email, password, name } = userData;

            // Validate input
            if (!username || !email || !password || !name) {
                throw new Error("All fields are required");
            }

            // Check if user already exists
            const existingUser = users.find(
                user => user.username === username || user.email === email
            );

            if (existingUser) {
                throw new Error("User with this username or email already exists");
            }

            // Create new user
            const newUser = {
                id: Date.now(), // Simple ID generation
                username,
                email,
                name,
                password, // In real app, this should be hashed
                profilePic: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                createdAt: new Date().toISOString()
            };

            // Update users array
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);

            // Save to localStorage
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            // Auto-login after registration
            const userToLogin = { ...newUser };
            delete userToLogin.password; // Don't store password in current user
            setCurrentUser(userToLogin);

            setLoading(false);
            return { success: true, user: userToLogin };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    // Login user
    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const { username, password } = credentials;

            // Validate input
            if (!username || !password) {
                throw new Error("Username and password are required");
            }

            // Find user
            const user = users.find(
                u => (u.username === username || u.email === username) && u.password === password
            );

            if (!user) {
                throw new Error("Invalid username or password");
            }

            // Create user object without password
            const userToLogin = { ...user };
            delete userToLogin.password;

            setCurrentUser(userToLogin);
            setLoading(false);
            return { success: true, user: userToLogin };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    // Logout user
    const logout = () => {
        setCurrentUser(null);
        setError(null);
    };

    // Update localStorage when currentUser changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    // Clear error after some time
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const value = {
        currentUser,
        login,
        register,
        logout,
        loading,
        error,
        users: users.map(user => ({ id: user.id, username: user.username, name: user.name, email: user.email })) // Public user info only
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};