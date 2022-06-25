require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let html = '';
    html += `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
        `
        
    document.innerHTML = html;
} 

function validateInput(testInput) {  
    if(testInput.value.length < 1){
        return "Empty";
    }else if(isNaN(testInput.value) && testInput.value.length > 0){
       return "Not a Number";
    }else if(typeof Number(testInput.value) === "number"){
       return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty"){
        alert("All fields required")
        console.log("Empty")
     } 
    
    console.log('form submitted')
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    if(validateInput(pilot) === "Not a Number"){
        pilotStatus.innerHTML = ` Pilot ${pilot.value} is ready for launch`
    } else if(validateInput(pilot) === "Is a Number"){
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        pilotStatus.innerHTML = ` Pilot not ready for launch`;
        alert("Pilot name should be a string.");
    } 
    if(validateInput(copilot) === "Not a Number"){
        copilotStatus.innerHTML = ` Copilot ${copilot.value} is ready for launch`
    } else if (validateInput(copilot) === "Is a Number"){
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        copilotStatus.innerHTML = "Copilot not ready for launch";
        alert("Co-pilot name should be a string.");
    }
    if(validateInput(fuelLevel) === "Is a Number" && fuelLevel.value < 10000){
        list.style.visibility = "visible";
        fuelStatus.innerHTML = ` Fuel level ${fuelLevel.value}, not enough fuel for launch`;
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    }else if(validateInput(fuelLevel) === "Not a Number"){
        alert("Fuel Level should be a number")
    }if(validateInput(cargoLevel) === "Is a Number" && cargoLevel.value > 10000){
        list.style.visibility = "visible";
        cargoStatus.innerHTML = ` Cargo level ${cargoLevel.value}, too much mass for launch `;
        launchStatus.innerHTML = "Shuttle not ready for launch"
        launchStatus.style.color = "red";
    }else if(validateInput(cargoLevel) === "Not a Number"){
        alert("Cargo Level should be a number");
    }
    if(validateInput(pilot) === "Not a Number" && validateInput(copilot) === "Not a Number" && fuelLevel.value >= 10000 && cargoLevel.value <= 10000){
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle ready for launch";
        launchStatus.style.color = "green";
        pilotStatus.innerHTML = ` Pilot ${pilot.value} is ready for launch`;
        copilotStatus.innerHTML = ` Copilot ${copilot.value} is ready for launch`;
        fuelStatus.innerHTML = ` Fuel level, ${fuelLevel.value}, enough fuel for launch`;
        cargoStatus.innerHTML = ` Cargo mass, ${cargoLevel.value}, low enough for launch`
    }
}

async function myFetch() {
    let planetsReturned;
    let url = "https://handlers.education.launchcode.org/static/planets.json";
    planetsReturned = await fetch(url).then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random() * planets.length);
    let index = planets[randomIndex];
    return index;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
