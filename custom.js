$(document).ready(function () {
    var jsonOBJ = localStorage.getItem('jsonOBJ') ? JSON.parse(localStorage.getItem("jsonOBJ")) : {};

    $('#addColumnBtn').on('click', function () {
        var columnName = $('#columnInput').val().trim();
        if (columnName) {
            addColumn(columnName);
            $('#columnInput').val('');
        }
    });

    function addColumn(columnName) {
        if (!$(`#box h5:contains("${columnName}")`).length) {
            var column = $( 
                '<div class="column p-3 border-gradient border rounded" style="width: 250px;margin-top: 50px">' +
                    '<h5 class="text-center bg-white rounded text-dark">' + columnName + '</h5>' +
                    '<div class="d-flex my-2">' +
                        '<input type="text" class="form-control taskInput py-0" placeholder="Enter task">' +
                        '<button class="btn btn-sm border-gradient add-task-btn ms-1">+</button>' +
                    '</div>' +
                    '<div class="task-list mt-3" style="min-height: 50px;"></div>' +
                '</div>'
            );
    
            $('#box').append(column); 
            jsonOBJ[columnName] = jsonOBJ[columnName] || []; 
            saveData();
    
           
            column.find('.add-task-btn').on('click', function () {
                var taskInput = $(this).siblings('.taskInput');
                var taskText = taskInput.val().trim(); 
                if (taskText) { 
                    var columnName = $(this).closest('.column').find('h5').text(); 
                    jsonOBJ[columnName].push(taskText);
                    saveData(); 
    
                    addTaskElement(column.find('.task-list'), columnName, taskText); 
                    taskInput.val(''); 
                }
            });
    
            makeSortable(); 
        } else {
            alert("This column already exists!"); 
        }
    }
    
    
    function addTaskElement(taskList, columnName, taskText) {
        var task = $(
            '<div class="task p-2 my-1 bg-white border rounded d-flex justify-content-between align-items-center">' +
                '<span class="fa fa-list-ul text-red me-2"></span>' +
                '<span class="task-text flex-grow-1">' + taskText + '</span>' +
                '<i class="fa fa-trash-o text-black delete-task-btn ms-2" style="cursor: pointer;"></i>' +
            '</div>'
        );

        taskList.append(task);

      
        task.find('.delete-task-btn').on('click', function () {
            var taskIndex = jsonOBJ[columnName].indexOf(taskText);
            if (taskIndex > -1) {
                jsonOBJ[columnName].splice(taskIndex, 1);
                saveData();
            }
            $(this).closest('.task').remove();
        });
    }

    function saveData() {
        localStorage.setItem('jsonOBJ', JSON.stringify(jsonOBJ));
    }

    function showCards() {
        $.each(jsonOBJ, function (title, tasks) {
            addColumn(title);
            var column = $('.column:has(h5:contains("' + title + '"))').find('.task-list');           
            column.empty();
            tasks.forEach(function (task) {
                addTaskElement(column, title, task);
            });
        });
    }

    function makeSortable() {
        $('.task-list').sortable({
            connectWith: '.task-list',
            placeholder: 'sortable-placeholder'
        }).disableSelection();
    }

    $('#columnInput').on('keypress', function (e) {
        if (e.which === 13) {
            $('#addColumnBtn').click();
        }
    });

    showCards();
});
