// Project.js

// ------------------- TASK MANAGEMENT -------------------
const taskForm = document.querySelector(".task-form");
const taskList = document.querySelector("#tasks ul");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector("#progress p");

let tasks = []; // store tasks as objects

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm.querySelector("input[type='text']").value.trim();
  const desc = taskForm.querySelector("textarea").value.trim();
  const date = taskForm.querySelector("input[type='date']").value;

  if (!title) {
    alert("Please enter a task title.");
    return;
  }

  const newTask = {
    title,
    desc,
    date,
    completed: false,
  };

  tasks.push(newTask);
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task.completed ? "✅" : "⭕"} ${task.title} – ${task.date || "No deadline"}
      <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateProgress() {
  if (tasks.length === 0) {
    progressFill.style.width = "0%";
    progressText.textContent = "No tasks yet.";
    return;
  }
  const completed = tasks.filter((t) => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);
  progressFill.style.width = percent + "%";
  progressText.textContent = `${percent}% of tasks completed 🎯`;
}

// ------------------- REFLECTION -------------------
const reflectionBtn = document.querySelector("#reflection button");
const reflectionInput = document.querySelector("#reflection textarea");

reflectionBtn.addEventListener("click", () => {
  const text = reflectionInput.value.trim();
  if (!text) {
    alert("Please write something before saving.");
    return;
  }
  localStorage.setItem("dailyReflection", text);
  alert("Reflection saved successfully!");
  reflectionInput.value = "";
});

// ------------------- LOGIN & SIGNUP -------------------
const loginForm = document.querySelector("#login .auth-form");
const signupForm = document.querySelector("#signup .auth-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = signupForm.querySelector("input[placeholder='Full Name']").value;
  const email = signupForm.querySelector("input[type='email']").value;
  const password = signupForm.querySelector("input[placeholder='Password']").value;
  const confirm = signupForm.querySelector("input[placeholder='Confirm Password']").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Account created successfully! Please login.");
  signupForm.reset();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.querySelector("input[type='email']").value;
  const password = loginForm.querySelector("input[type='password']").value;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    alert(`Welcome back, ${user.name}!`);
  } else {
    alert("Invalid credentials. Please try again.");
  }
  loginForm.reset();
});