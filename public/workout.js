async function init() {
  const lastWorkout = await API.getLastWorkout();
  console.log(lastWorkout);

  document
    .querySelector("a[href='/exercise?']")
    .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

  //use of the ... spread operator on objects is a REST convention
  const workoutSummary = {
    date: formatDate(lastWorkout.day),
    totalDuration: lastWorkout.totalDuration,
    numExercises: lastWorkout.exercises.length,
    ...tallyExercises(lastWorkout.exercises)
  };

  renderWorkoutSummary(workoutSummary);
}

function tallyExercises(exercises) {
  console.log("tallyExercises called with " + JSON.stringify);
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}



function renderWorkoutSummary(summary) {

  const container = document.querySelector(".workout-stats");

  //The workoutKeyMap is a pattern to bind data objects in the summary with the lables in in the key Map
  //for presentation on the user interface

  const workoutKeyMap = {  
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  /**
   Arrow logic iteration replaces for-of:
   for (let user of userRoles.keys()) {
    console.log(user.name);
   }
   */
  //for (let workout of summary)   C# would be for(Workout workout in summary)
  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");gi
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];  //bind keyMap to data over key
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);  //the container is workout-stats
  });
}

init();
