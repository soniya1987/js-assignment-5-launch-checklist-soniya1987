const { ConsoleReporter } = require('jasmine');

// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `<h2>Mission Destination</h2>
   <ol>
       <li>Name: ${name}</li>
       <li>Diameter: ${diameter}</li>
       <li>Star: ${star}</li>
       <li>Distance from Earth: ${distance}</li>
       <li>Number of Moons: ${moons}</li>
   </ol>
   <img src="${imageUrl}">`;
}

function validateInput(testInput) {
    //console.log(IsNan(testInput.value));
    if (testInput.value === "")
    {
        return "Empty";
    }
    else if (isNaN(testInput.value))
    {
        return "Not a Number";
    }
    else
    {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotValidation = validateInput(pilot);
    let copilotValidation = validateInput(copilot);
    let fuelLevelValidation = validateInput(fuelLevel);
    let cargoLevelValidation = validateInput(cargoLevel);
    if (pilotValidation === "Empty" || copilotValidation === "Empty" || fuelLevelValidation === "Empty" || cargoLevelValidation === "Empty")
    {
        alert("All fields are required!");
        return false;
    }

    if (pilotValidation === "Is a Number" || copilotValidation === "Is a Number" || fuelLevelValidation === "Not a Number" || cargoLevelValidation === "Not a Number")
    {
        alert("Make sure to enter valid information for each field!");
        return false;
    }

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let launchStatusCheck = document.getElementById("launchStatusCheck");
    pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;

    let fuelFlag = false;
    let cargoFlag = false;
    
    if (Number(fuelLevel.value) < 10000)
    {
        fuelStatus.innerHTML = `Fuel level too low for launch`;
    }
    else
    {
        fuelFlag = true;
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
    }

    if (Number(cargoLevel.value) > 10000)
    {
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    }
    else
    {
        cargoFlag = true;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    }

    if (fuelFlag && cargoFlag)
    {
        launchStatus.innerHTML = "Shuttle ready for launch";
        launchStatus.style.color = "green";
        // launchStatusCheck.style.visibility = "hidden";
        list.style.visibility = "visible";
        return true;
    }
    
    launchStatus.innerHTML = "Shuttle not ready for launch";
    list.style.visibility = "visible";
    launchStatusCheck.style.visibility = "visible";
    launchStatus.style.color = "red";  
    return false;
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        // pickPlanet(response.json());
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
