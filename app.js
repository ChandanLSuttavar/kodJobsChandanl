// DOM Elements
const authPage = document.getElementById('authPage');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const jobsContent = document.getElementById('jobsContent');
const profileContent = document.getElementById('profileContent');
const jobsContainer = document.getElementById('jobsContainer');
const savedJobsContainer = document.getElementById('savedJobsContainer');
const userInfo = document.getElementById('userInfo');
const userEmail = document.getElementById('userEmail');
const profileEmail = document.getElementById('profileEmail');
const profileLink = document.getElementById('profileLink');
const jobsLink = document.getElementById('jobsLink');
const passwordModal = document.getElementById('passwordModal');
const savedJobsCount = document.getElementById('savedJobsCount');
const loading = document.getElementById('loading');

// Initialize the application
async function init() {
    try {
        console.log('Initializing app...');
        
        // Initialize theme
        initTheme();
        
        const currentUser = getCurrentUser();
        if (currentUser) {
            console.log('User found:', currentUser.email);
            showMainApp(currentUser);
        } else {
            console.log('No user found, showing auth page');
            showAuthPage();
        }
        
        await loadJobs();
    } catch (error) {
        console.error('Error initializing app:', error);
        alert('Error initializing application. Please refresh the page.');
    }
}

// Authentication Functions
function showAuthPage() {
    authPage.classList.remove('hidden');
    mainApp.classList.add('hidden');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
}

function showMainApp(user) {
    authPage.classList.add('hidden');
    mainApp.classList.remove('hidden');
    userEmail.textContent = user.email;
    profileEmail.textContent = user.email;
    profileLink.classList.remove('hidden');
    updateSavedJobsCount();
}

function switchForm(type) {
    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

async function login() {
    try {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const user = await authenticateUser(email, password);
        if (user) {
            showMainApp(user);
            await loadJobs();
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
    }
}

async function signup() {
    try {
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const success = await createUser(email, password);
        if (success) {
            const user = await authenticateUser(email, password);
            showMainApp(user);
            await loadJobs();
        } else {
            alert('Email already exists');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Error during signup. Please try again.');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    showAuthPage();
}

// Content Management Functions
function showMainContent(section) {
    if (section === 'jobs') {
        jobsContent.classList.remove('hidden');
        profileContent.classList.add('hidden');
        jobsLink.classList.add('active');
        profileLink.classList.remove('active');
    } else {
        jobsContent.classList.add('hidden');
        profileContent.classList.remove('hidden');
        jobsLink.classList.remove('active');
        profileLink.classList.add('active');
        loadSavedJobs();
    }
}

async function loadJobs() {
    try {
        console.log('Loading jobs...');
        const currentUser = getCurrentUser();
        jobsContainer.innerHTML = '';
        loading.classList.remove('hidden');
        
        if (typeof window.jobsData === 'undefined') {
            console.error('Job data not loaded');
            loading.textContent = 'Error: Job data not available. Please refresh the page.';
            return;
        }

        setTimeout(async () => {
            try {
                const jobs = window.jobsData;
                for (const job of jobs) {
                    const isSaved = currentUser && await isJobSaved(currentUser.email, job.id);
                    const jobCard = createJobCard(job, isSaved);
                    jobsContainer.appendChild(jobCard);
                }
                loading.classList.add('hidden');
            } catch (error) {
                console.error('Error rendering jobs:', error);
                loading.textContent = 'Error loading jobs. Please refresh the page.';
            }
        }, 500);
    } catch (error) {
        console.error('Error in loadJobs:', error);
        loading.textContent = 'Error loading jobs. Please refresh the page.';
    }
}

function createJobCard(job, isSaved) {
    try {
        const card = document.createElement('div');
        card.className = 'job-card';
        
        card.innerHTML = `
            <h3 class="job-title">${job.title}</h3>
            <p class="job-company">${job.company}</p>
            <p class="job-details">${job.location} • ${job.salary}</p>
            <span class="job-type">${job.type}</span>
            <p class="job-description">${job.description}</p>
            ${getCurrentUser() ? `
                <button class="btn ${isSaved ? 'btn-remove' : 'btn-primary'}" 
                        onclick="toggleSaveJob(${job.id})">
                    ${isSaved ? 'Remove' : 'Save Job'}
                </button>
            ` : ''}
        `;
        
        return card;
    } catch (error) {
        console.error('Error creating job card:', error);
        return document.createElement('div');
    }
}

async function loadSavedJobs() {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        savedJobsContainer.innerHTML = '';
        const savedJobs = await getSavedJobs(currentUser.email);
        
        for (const jobId of savedJobs) {
            const job = window.jobsData.find(j => j.id === jobId);
            if (job) {
                const jobCard = createJobCard(job, true);
                savedJobsContainer.appendChild(jobCard);
            }
        }

        updateSavedJobsCount();
    } catch (error) {
        console.error('Error loading saved jobs:', error);
        savedJobsContainer.innerHTML = '<p>Error loading saved jobs. Please try again.</p>';
    }
}

async function toggleSaveJob(jobId) {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        await toggleSavedJob(currentUser.email, jobId);
        await loadJobs();
        await updateSavedJobsCount();
        
        if (!profileContent.classList.contains('hidden')) {
            await loadSavedJobs();
        }
    } catch (error) {
        console.error('Error toggling saved job:', error);
        alert('Error saving job. Please try again.');
    }
}

async function updateSavedJobsCount() {
    try {
        const currentUser = getCurrentUser();
        if (currentUser) {
            const savedJobs = await getSavedJobs(currentUser.email);
            savedJobsCount.textContent = savedJobs.length;
        } else {
            savedJobsCount.textContent = '0';
        }
    } catch (error) {
        console.error('Error updating saved jobs count:', error);
        savedJobsCount.textContent = '0';
    }
}

// Theme Management
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Password Management
function showPasswordChangeModal() {
    passwordModal.style.display = 'block';
}

function closePasswordModal() {
    passwordModal.style.display = 'none';
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
}

async function changePassword() {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match');
            return;
        }

        const success = await updateUserPassword(currentUser.email, currentPassword, newPassword);
        if (success) {
            alert('Password updated successfully');
            closePasswordModal();
        } else {
            alert('Current password is incorrect');
        }
    } catch (error) {
        console.error('Error changing password:', error);
        alert('Error changing password. Please try again.');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Display initial jobs
    displayJobs(window.jobsData);
    
    // Add event listeners to filters
    document.getElementById('jobType').addEventListener('change', filterJobs);
    document.getElementById('location').addEventListener('change', filterJobs);
    document.getElementById('preferredJobs').addEventListener('change', filterJobs);
});

// Format salary to INR with lakhs format
function formatSalaryToINR(min, max) {
    const minLakhs = min / 100000;
    const maxLakhs = max / 100000;
    return `₹${minLakhs.toFixed(2)} - ${maxLakhs.toFixed(2)} LPA`;
}

// Display jobs
function displayJobs(jobs) {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) {
        console.error('Jobs list container not found!');
        return;
    }
    
    jobsList.innerHTML = '';
    
    jobs.forEach(job => {
        const salary = formatSalaryToINR(job.salaryMin, job.salaryMax);
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">${job.company}</div>
            <div class="job-type">${job.type}</div>
            <div class="job-details">
                <span class="job-location">${job.location}</span>
                <span class="salary-dot">•</span>
                <span class="job-salary">
                    <span class="salary-label">Salary: </span>
                    ${salary}
                </span>
            </div>
            <p class="job-description">${job.description}</p>
            <button class="apply-btn">Apply Now</button>
        `;
        jobsList.appendChild(jobCard);
    });
}

// Filter jobs
function filterJobs() {
    const jobType = document.getElementById('jobType').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('preferredJobs').value;
    
    const filteredJobs = window.jobsData.filter(job => {
        const matchesType = !jobType || job.type.toLowerCase() === jobType;
        const matchesLocation = !location || job.location.toLowerCase().includes(location);
        const matchesCategory = !category || job.category.toLowerCase() === category;
        return matchesType && matchesLocation && matchesCategory;
    });
    
    displayJobs(filteredJobs);
}

// Theme toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Auth functions
function login() {
    // Add login logic here
    document.getElementById('authPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
}

function signup() {
    // Add signup logic here
}

function logout() {
    document.getElementById('authPage').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('hidden');
}

function switchForm(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (type === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }
}

// Initialize the app
window.addEventListener('load', () => {
    console.log('Window loaded, initializing...');
    init();
});
