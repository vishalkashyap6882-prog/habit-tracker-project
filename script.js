
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

var habits = [];


var goals = [];

var habitInput = document.getElementById("habitInput");
var addHabitBtn = document.getElementById("addHabitBtn");
var habitList = document.getElementById("habitList");

var goalInput = document.getElementById("goalInput");
var goalTarget = document.getElementById("goalTarget");
var addGoalBtn = document.getElementById("addGoalBtn");
var goalList = document.getElementById("goalList");

var summaryText = document.getElementById("summaryText");
var summaryFill = document.getElementById("summaryFill");
var resetBtn = document.getElementById("resetBtn");


function showHabits() {
  habitList.innerHTML = "";

  for (var i = 0; i < habits.length; i++) {
    var li = document.createElement("li");

    
    var title = document.createElement("div");
    title.className = "habitTitle";

    var name = document.createElement("span");
    name.textContent = habits[i].name;

    var del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "deleteBtn";
    del.setAttribute("data-index", i);
    del.onclick = deleteHabit;

    title.appendChild(name);
    title.appendChild(del);

    
    var row = document.createElement("div");
    row.className = "dayRow";
    var count = 0;

    for (var j = 0; j < 7; j++) {
      var label = document.createElement("label");
      label.className = "dayBox";

      var box = document.createElement("input");
      box.type = "checkbox";
      box.checked = habits[i].days[j];
      box.setAttribute("data-habit", i);
      box.setAttribute("data-day", j);
      box.onclick = toggleDay;

      var dayName = document.createElement("span");
      dayName.textContent = days[j];

      label.appendChild(box);
      label.appendChild(dayName);
      row.appendChild(label);

      if (habits[i].days[j]) {
        count++;
      }
    }

    
    var info = document.createElement("p");
    info.className = "info";
    info.textContent = count + " of 7 days done";
    if (count === 7) {
      info.textContent = "7 of 7 days done - Perfect week!";
    }

    li.appendChild(title);
    li.appendChild(row);
    li.appendChild(info);
    habitList.appendChild(li);
  }

  updateSummary();
}

function addHabit() {
  var name = habitInput.value.trim();
  if (name === "") {
    alert("Please type a habit first");
    return;
  }

  var newHabit = {
    name: name,
    days: [false, false, false, false, false, false, false]
  };
  habits.push(newHabit);

  habitInput.value = "";
  showHabits();
}

function toggleDay() {
  var h = this.getAttribute("data-habit");
  var d = this.getAttribute("data-day");
  habits[h].days[d] = !habits[h].days[d];
  showHabits();
}

function deleteHabit() {
  var index = this.getAttribute("data-index");
  habits.splice(index, 1);
  showHabits();
}


function updateSummary() {
  var total = habits.length * 7;
  var ticks = 0;

  for (var i = 0; i < habits.length; i++) {
    for (var j = 0; j < 7; j++) {
      if (habits[i].days[j]) {
        ticks++;
      }
    }
  }

  summaryText.textContent = "This week: " + ticks + " of " + total + " ticks";

  var percent = 0;
  if (total > 0) {
    percent = (ticks / total) * 100;
  }
  summaryFill.style.width = percent + "%";
}

function startNewWeek() {
  for (var i = 0; i < habits.length; i++) {
    for (var j = 0; j < 7; j++) {
      habits[i].days[j] = false;
    }
  }
  showHabits();
}


function showGoals() {
  goalList.innerHTML = "";

  for (var i = 0; i < goals.length; i++) {
    var li = document.createElement("li");

      
    var title = document.createElement("div");
    title.className = "habitTitle";

    var name = document.createElement("span");
    name.textContent = goals[i].name;

    var del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "deleteBtn";
    del.setAttribute("data-index", i);
    del.onclick = deleteGoal;

    title.appendChild(name);
    title.appendChild(del);

    
    var percent = (goals[i].count / goals[i].target) * 100;
    if (percent > 100) {
      percent = 100;
    }

    var bar = document.createElement("div");
    bar.className = "bar";
    if (percent === 100) {
      bar.className = "bar full";
    }
    var fill = document.createElement("div");
    fill.style.width = percent + "%";
    bar.appendChild(fill);

    var buttons = document.createElement("div");
    buttons.className = "goalButtons";

    var text = document.createElement("span");
    text.textContent = goals[i].count + " of " + goals[i].target;
    if (goals[i].count >= goals[i].target) {
      text.textContent = goals[i].count + " of " + goals[i].target + " - Goal reached!";
    }

    var minus = document.createElement("button");
    minus.textContent = "-1";
    minus.setAttribute("data-index", i);
    minus.onclick = goalMinus;

    var plus = document.createElement("button");
    plus.textContent = "+1";
    plus.setAttribute("data-index", i);
    plus.onclick = goalPlus;

    buttons.appendChild(minus);
    buttons.appendChild(plus);
    buttons.appendChild(text);

    li.appendChild(title);
    li.appendChild(bar);
    li.appendChild(buttons);
    goalList.appendChild(li);
  }
}

function addGoal() {
  var name = goalInput.value.trim();
  var target = Number(goalTarget.value);

  if (name === "") {
    alert("Please type a goal first");
    return;
  }
  if (target <= 0 || isNaN(target)) {
    alert("Please enter a target number, like 10");
    return;
  }

  var newGoal = { name: name, target: target, count: 0 };
  goals.push(newGoal);

  goalInput.value = "";
  goalTarget.value = "";
  showGoals();
}

function goalPlus() {
  var index = this.getAttribute("data-index");
  goals[index].count++;
  showGoals();
}

function goalMinus() {
  var index = this.getAttribute("data-index");
  if (goals[index].count > 0) {
    goals[index].count--;
  }
  showGoals();
}

function deleteGoal() {
  var index = this.getAttribute("data-index");
  goals.splice(index, 1);
  showGoals();
}


addHabitBtn.onclick = addHabit;
addGoalBtn.onclick = addGoal;
resetBtn.onclick = startNewWeek;

habitInput.onkeydown = function (e) {
  if (e.key === "Enter") {
    addHabit();
  }
};

showHabits();
showGoals();