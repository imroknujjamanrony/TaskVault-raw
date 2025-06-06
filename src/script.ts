const taskForm = document.getElementById('task-form') as HTMLFormElement;

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const titleInput = document.getElementById('task-title') as HTMLInputElement;
  const title = titleInput.value.trim();

  const descInput = document.getElementById('task-desc') as HTMLInputElement;
  const description = descInput.value.trim();

  const statusSelect = document.getElementById('task-status') as HTMLSelectElement;
  const status = statusSelect.value.trim();

  const newTask = { title, description, status };

  // ✅ Try to parse existing data safely
  let existingTasks = [];

  try {
    const stored = localStorage.getItem('taskData');
    existingTasks = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(existingTasks)) {
      existingTasks = []; // Fallback in case it's not an array
    }
  } catch (err) {
    console.error('Error parsing localStorage data:', err);
    existingTasks = [];
  }

  existingTasks.push(newTask);

  localStorage.setItem('taskData', JSON.stringify(existingTasks));

  console.log('Task Saved:', newTask);

  taskForm.reset();
  const taskList=document.getElementById('task-list') as HTMLUListElement;
  const newTaskItem=document.createElement('li');
  newTaskItem.textContent=`{newTask.title} - ${newTask.description} (${newTask.status})`;
  taskList.appendChild(newTaskItem);
});
