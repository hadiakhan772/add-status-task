$(document).ready(function () {
      $('#addColumnBtn').on('click', function () {
        var columnName = $('#columnInput').val().trim();
        if (columnName) {
            addColumn(columnName);
            $('#columnInput').val('');
        }
    }); 
    function addColumn(columnName) {
        var column = $(`
            <div class="column p-3 border-gradient border rounded" style="width: 250px;margin-top: 50px">
                <h5 class="text-center bg-white rounded text-dark">${columnName}</h5>
                <div class="d-flex my-2">
                    <input type="text" class="form-control taskInput py-0" placeholder="Enter task">
                    <button class="btn btn-sm border-gradient add-task-btn ms-1">+</button>
                </div>
                <div class="task-list mt-3" style="min-height: 50px;"></div>
            </div>
        `);
        $('#box').append(column);
        column.find('.add-task-btn').on('click', function () {
            var taskInput = $(this).siblings('.taskInput');
            var taskText = taskInput.val().trim();
            if (taskText) {
                var task = $(`
                    <div class="task p-2 my-1 bg-white border rounded d-flex justify-content-between align-items-center">             
                 <span class="fa fa-list-ul text-red"></span>
                  <span class="task-text">${taskText}</span>
                        <i class="fa fa-trash-o text-black delete-task-btn" style="cursor: pointer;"></i>
                    </div>
                `);
                column.find('.task-list').append(task);
                taskInput.val('');
                task.find('.delete-task-btn').on('click', function () {
                    $(this).closest('.task').remove();
                    if (column.find('.task-list').children().length === 0) {
                        column.remove();
                    }
                });
            }
        });
        makeSortable();
    }
    function makeSortable() {
        $('.task-list').sortable({
            connectWith: '.task-list',
            placeholder: 'sortable-placeholder',
            start: function (event, ui) {
                ui.placeholder.height(ui.item.height());
            }
        }).disableSelection();
    }

    $('#columnInput').on('keypress', function (e) {
        if (e.which === 13) { // Enter key
            $('#addColumnBtn').click();
        }
    });
});
