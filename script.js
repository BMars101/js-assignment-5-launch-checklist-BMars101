window.addEventListener("load", function() {
    let submitBtn = document.getElementById("formSubmit"); 
    submitBtn.addEventListener("click", function(event){
        event.preventDefault();
        let launchForm = document.getElementById("launchForm");
        let pilotName = launchForm.querySelector("input[name=pilotName]");
        let copilotName = launchForm.querySelector("input[name=copilotName]");
        let fuelLevel = launchForm.querySelector("input[name=fuelLevel");
        let cargoMass = launchForm.querySelector("input[name=cargoMass]");
        let list = document.getElementById("faultyItems");
        formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass);
        
    });
    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (json) {
        listedPlanets = json;
    }).then(function () {
        console.log(listedPlanets);
        let planetPicked = pickPlanet(listedPlanets);
        let missionTarget = document.getElementById("missionTarget");
        addDestinationInfo(missionTarget, planetPicked.name, planetPicked.diameter, planetPicked.star, planetPicked.distance, planetPicked.moons, planetPicked.image);
   })
});

