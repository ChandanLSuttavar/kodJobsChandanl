// User Management Functions
let users = JSON.parse(localStorage.getItem('users')) || [];
let nextUserId = parseInt(localStorage.getItem('nextUserId')) || 1;

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('nextUserId', nextUserId);
}

async function createUser(email, password) {
    try {
        // Check if user exists
        if (users.some(user => user.email === email)) {
            return false;
        }

        // Create new user
        const newUser = {
            id: nextUserId,
            email,
            password,
            savedJobs: []
        };

        users.push(newUser);
        nextUserId++;
        saveUsers();

        localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, email: newUser.email }));
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
}

async function authenticateUser(email, password) {
    try {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({ id: user.id, email: user.email }));
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser'));
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
}

async function updateUserPassword(email, currentPassword, newPassword) {
    try {
        const userIndex = users.findIndex(u => u.email === email && u.password === currentPassword);
        if (userIndex === -1) {
            return false;
        }

        users[userIndex].password = newPassword;
        saveUsers();
        return true;
    } catch (error) {
        console.error('Error updating password:', error);
        return false;
    }
}

// Saved Jobs Management
async function getSavedJobs(email) {
    try {
        const user = users.find(u => u.email === email);
        return user ? user.savedJobs : [];
    } catch (error) {
        console.error('Error getting saved jobs:', error);
        return [];
    }
}

async function toggleSavedJob(email, jobId) {
    try {
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex === -1) {
            return false;
        }

        const savedJobs = users[userIndex].savedJobs;
        const jobIndex = savedJobs.indexOf(jobId);

        if (jobIndex === -1) {
            savedJobs.push(jobId);
        } else {
            savedJobs.splice(jobIndex, 1);
        }

        users[userIndex].savedJobs = savedJobs;
        saveUsers();
        return jobIndex === -1;
    } catch (error) {
        console.error('Error toggling saved job:', error);
        return false;
    }
}

async function isJobSaved(email, jobId) {
    try {
        const savedJobs = await getSavedJobs(email);
        return savedJobs.includes(jobId);
    } catch (error) {
        console.error('Error checking if job is saved:', error);
        return false;
    }
}
