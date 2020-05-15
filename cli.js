const
    app = require('./app'),
    yargs = require('yargs')



// developing help screen
const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Search For Type Of Crimes, Examples:[Theft, Battery, Murder, Alcohol]',
        builder: (yargs) => {
            return yargs.option('s', {
                alias: 'search',
                describe: 'Search Type'
            })
        },
        handler: (argv) => { app.getPlayerCrimesApi(argv.search) }
    })

    .help('help')
    .argv


