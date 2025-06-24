const STORAGE_KEY = 'usersDatabase';
const getUsersFromStorage = () => {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
};
const saveUsersToStorage = (users) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500));
export const mockBackend = {
    async signup(userData) {
        await simulateNetworkDelay();
        const users = getUsersFromStorage();
        if (users.some(user => user.email === userData.email)) {
            return { success: false, message: 'Email already exists' };
        }
        users.push(userData);
        saveUsersToStorage(users);
        return { success: true, message: 'Signup successful' };
    },
    async login(credentials) {
        await simulateNetworkDelay();
        const users = getUsersFromStorage();
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }
        return {
            success: true,
            message: 'Login successful',
            user: { ...user, password: '' }
        };
    },
};
