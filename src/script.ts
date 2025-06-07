// Define a Task interface for better type safety
interface Task {
  title: string;
  description: string;
  status: string;
}

// Get the form element
const taskForm = document.getElementById('task-form') as HTMLFormElement;

// Listen for form submission
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form inputs
  const titleInput = document.getElementById('task-title') as HTMLInputElement;
  const descInput = document.getElementById('task-desc') as HTMLInputElement;
  const statusSelect = document.getElementById('task-status') as HTMLSelectElement;

  // Trim input values
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const status = statusSelect.value.trim();

  // Basic validation
  if (!title) {
    alert('Task title is required!');
    return;
  }

  if (!description) {
    alert('Task description is required!');
    return;
  }

  if (!status || status === 'Select') {
    alert('Please choose a valid task status!');
    return;
  }

  // Create new task object
  const newTask: Task = { title, description, status };

  // Retrieve existing tasks from localStorage
  let existingTasks: Task[] = [];

  try {
    const storedTasks = localStorage.getItem('taskData');
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Ensure the parsed data is an array
    if (Array.isArray(parsedTasks)) {
      existingTasks = parsedTasks;
    }
  } catch (error) {
    console.error('Failed to parse localStorage data:', error);
    existingTasks = [];
  }

  // Add new task to the array
  existingTasks.push(newTask);

  // Save the updated array to localStorage
  localStorage.setItem('taskData', JSON.stringify(existingTasks));

  console.log('Task Saved:', newTask);

  // Reset the form
  taskForm.reset();

  // Display the new task in the task list
  const taskList = document.getElementById('task-list') as HTMLUListElement;
  const newTaskItem = document.createElement('li');
  newTaskItem.textContent = `${newTask.title} - ${newTask.description} (${newTask.status})`;
  taskList.appendChild(newTaskItem);
});

//hello world
