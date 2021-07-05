const workHours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
const hours24 = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
const currentDay = moment().format('dddd, MMMM Do');
const currentHour = moment().hour();
var container = $('#container');
var taskStorage = [];

$('#currentDay').text(currentDay);

// Create rows, textarea and save button for each working hour
for (let i = 0; i < workHours.length; i++) {
    let row = $("<div class='row'>");
    let time = $("<div class='hour col-1'>").text(workHours[i]);
    let timeBlock = $("<textarea class='time-block col-10'>").attr("id", i);
    let saveBtn = $("<button class='saveBtn col-1'>").attr("data-id", i);
    let saveIcon = $("<i class='fa fa-save fa-2x'>");
       
    container.append(row);
    row.append(time, timeBlock, saveBtn);
    saveBtn.append(saveIcon);

    // Turns each work hour row a respective colour depending on current time
    if (currentHour == hours24[i]) {
        timeBlock.addClass("present");
    } else if (currentHour > hours24[i]) {
        timeBlock.addClass("past");
    } else {
        timeBlock.addClass("future");
    }
}

// Save text area to local storage
$(".saveBtn").on("click", function () {
    let buttonId = $(this).attr("data-id");
    let event = $("#" + buttonId).val();
    let taskObj = JSON.parse(localStorage.getItem("task")) || [];
    taskObj.push({
      time: buttonId,
      description: event,
    });
    localStorage.setItem("task", JSON.stringify(taskObj));
  });
  
  // Load data from local storage
  $(document).ready(function () {
    let savedTasks = JSON.parse(localStorage.getItem("task"));
    for (let i = 0; i < savedTasks.length; i++) {
      let updatedHour = savedTasks[i].time;
      let updatedText = savedTasks[i].description;
      $("#" + updatedHour).text(updatedText);
    }
  });