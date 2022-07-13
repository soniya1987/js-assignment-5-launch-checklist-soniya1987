// Write your JavaScript code here!

window.addEventListener("load", function() {

    let form = document.querySelector('[data-testid="testForm"]');
    //console.log(form);
    form.addEventListener("submit", function(e) {
        let pilotName = document.getElementById("pilotName");
        let copilotName = document.querySelector("[name='copilotName']");
        let fuelLevel = document.querySelector("[name='fuelLevel']");
        let cargoMass = document.querySelector("[name='cargoMass']");
        let faultyList = document.getElementById("faultyItems");
        formSubmission(document, faultyList, pilotName, copilotName, fuelLevel, cargoMass);
        e.preventDefault();
    });

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let randomPlanet = pickPlanet(listedPlanets);
       addDestinationInfo(document, randomPlanet.name, randomPlanet.diameter, randomPlanet.star, randomPlanet.distance, randomPlanet.moons, randomPlanet.image);
   })
});

