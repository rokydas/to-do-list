const loadTasks = () => {
    fetch('/tasks')
    .then(res => res.json())
    .then(data => {
        const tasks = document.getElementById('all-task');
        tasks.innerHTML = '';
        data.map(taskData => {
            const task = document.createElement('div');
            task.innerHTML = 
            `<div class="container task-box">
                <h3>${taskData.taskHeading}</h3>
                <p>${taskData.taskDescription}</p>
                <button class="btn btn-warning">Update</button>
                <button class="btn btn-danger">Delete</button>
            </div>`
            tasks.appendChild(task);
        })
    })
}
loadTasks();

