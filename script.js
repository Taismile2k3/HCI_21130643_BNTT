const users = [
    { id: 1, name: 'Thiên Tài' },
    { id: 2, name: 'Mỹ Uyên' },
    { id: 3, name: 'Đăng Khoa' }
];

let courses = [];

function populateUserDropdown() {
    const dropdown = document.getElementById('createdBy');
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        dropdown.appendChild(option);
    });
}

function createCourse(event) {
    event.preventDefault();
    
    const id = courses.length + 1;
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;
    const createdBy = document.getElementById('createdBy').value;
    const createdAt = new Date().toLocaleString();
    const updatedAt = new Date().toLocaleString();
    
    const course = { id, name, description, createdBy, createdAt, updatedAt };
    courses.push(course);

    displayCourses();
    clearForm();
}

function clearForm() {
    document.getElementById('courseForm').reset();
    document.getElementById('courseId').value = '';
    document.getElementById('createdAt').value = '';
    document.getElementById('updatedAt').value = '';
}

function displayCourses() {
    const courseContainer = document.getElementById('courses');
    courseContainer.innerHTML = ''; // Clear previous content

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        courseCard.innerHTML = `
            <h3>${course.name}</h3>
            <p>Instructor: ${getInstructorName(course.createdBy)}</p>
            <p>Created At: ${course.createdAt}</p>
            <button class="view" onclick="viewCourse(${course.id})">View</button>
            <button onclick="deleteCourse(${course.id})">Delete</button>
        `;

        courseContainer.appendChild(courseCard);
    });
}

function getInstructorName(userId) {
    const user = users.find(u => u.id == userId);
    return user ? user.name : 'Unknown';
}

function viewCourse(courseId) {
    const course = courses.find(c => c.id == courseId);
    if (course) {
        const modal = document.getElementById('courseModal');
        const courseDetails = document.getElementById('courseDetails');
        
        courseDetails.innerHTML = `
            <p><strong>Course Name:</strong> ${course.name}</p>
            <p><strong>Description:</strong> ${course.description}</p>
            <p><strong>Instructor:</strong> ${getInstructorName(course.createdBy)}</p>
            <p><strong>Created At:</strong> ${course.createdAt}</p>
            <p><strong>Last Updated:</strong> ${course.updatedAt}</p>
        `;
        
        modal.style.display = 'block';
    }
}

function deleteCourse(courseId) {
    courses = courses.filter(c => c.id !== courseId);
    displayCourses();
}

function closeModal() {
    document.getElementById('courseModal').style.display = 'none';
}

// Event listeners
document.getElementById('courseForm').addEventListener('submit', createCourse);
document.querySelector('.close').addEventListener('click', closeModal);

// Initial population of instructor dropdown
populateUserDropdown();

