
init();

async function init() {
  if (location.pathname.includes("/exercise") && location.search.split("=")[1] === undefined) {
    console.log("excersise")
    const newWorkout = await API.createWorkout();
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    }
    else {
      newWorkout.classList.add("")
    }
    return console.log(newWorkout);
  }
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    }
    else {
      newWorkout.classList.add("")
    }
  }
}