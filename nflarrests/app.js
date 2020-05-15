const
    nflarrests = require('nflarrests')
    inquirer = require('inquirer')

// Search Crime By Crime Type, Theft is default.  
async function getPlayerCrimesApi(search = "Theft") {
    const crimesToSearch = await nflarrests.searchCrime(search)

    // FIRST THING THAT GETS PRINTED
    print("typeOfCrime", crimesToSearch)

    const getPlayerInfo = await playerChoicePrompt(crimesToSearch)

    // Get Player Name
    const playerName = getPlayerInfo.Name

    // Split Player Name Into First & Last
    const nameSplit = playerName.split(" ");

    firstName = nameSplit[0];
    lastName = nameSplit[1];

    searchSpecficPlayer(firstName, lastName);
}

async function searchSpecficPlayer(firstName, lastName) {

    const playerNameToSearch = await nflarrests.searchPlayerInfo(firstName, lastName)

    // Print Player Info
    print("SpecificPlayer", playerNameToSearch);
}

async function playerChoicePrompt(crimesToSearch) {

    const displayPlayers = crimesToSearch.map(crimes => {
        return { Name: `${crimes.Name}` }
    })


    // Storing Names Onto Array
    let playersNameArr = [];
    displayPlayers.forEach(name => {
        playersNameArr.push(name.Name)
    })

    return inquirer.prompt([{
        type: 'list',
        name: 'Name',
        message: 'Which player would you like to find more information on?',
        choices: playersNameArr
    }])
}

// Print Function
const print = (crimeType, nflarrests) => {
    console.log("\n---- Crime Committed ----")
    if (crimeType == "typeOfCrime") {
        nflarrests.forEach(crime => {
            console.log(`${crime.Name}, Theft Count: ${crime.arrest_count}`)
        });
        console.log("\n")
    }
    if (crimeType == "SpecificPlayer") {
        nflarrests.forEach(crime => {
            console.log(`Player Name: ${crime.Name}\nTeam Name: ${crime.Team_name}\nDate Of Crime: ${crime.Date}`)
            console.log(`Crime Category: ${crime.Crime_category}\nPosition Name: ${crime.Position_name}\nEncounter Of Crime: ${crime.Encounter}`)
            console.log(`Description Of Crime: ${crime.Description}\nOutcome: ${crime.Outcome}\n`)
        });
    }
}

module.exports = { getPlayerCrimesApi }