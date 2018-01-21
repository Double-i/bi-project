const fs = require('fs');
const csvParser = require('csv-parse');
const jsonexport = require('jsonexport');
const csvString = require('csv-string');
const arg = require('commander');

let criminaliteFilePath;
let populationFilePath;

// ask for args
arg
    .usage('-p <path_pop_file> -c <path_crimi_file>')
    .option('-p, --popFile <value>', 'Path to the processed population csv file')
    .option('-c, --crimiFile <value>', 'Path to the criminality raw csv file')
    .option('-o, --output [value]', 'Path to the output file, default: outputCriminalite.csv')
    .parse(process.argv);



populationFilePath = arg.popFile;
criminaliteFilePath = arg.crimiFile;
let outputPath = arg.output || 'outputCriminalite.csv';


// begin work...
getIdCanton(populationFilePath, linkTables);

/**
 * 
 * write file 
 * @param {[object]} data 
 */
function writeFile(data)
{
    // write file
    jsonexport(data, {
        rowDelimiter: ';'
    }, function(err, csv) {
        if (err) return console.log(err);

        fs.writeFile(outputPath, csv, (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error(outputPath+' already exists');
                    return;
                }
                throw err;
            }
            console.log("Finished");
            console.log(outputPath + " has been created");
        });
    });
}

/**
 * add a foreign key to each criminalite row . to match a row in the population csv, it compare the year and the canton if both are the same it add the id of population row into the criminalite row
 * 
 * @param {[Object]} cantonCrim all the lines of the files in Object format
 */
function linkTables(infoCantons )
{
    let formatedData=[];
    read(criminaliteFilePath, (cantonCriminalite) => 
    {
        let previousCantonId;
        for(let i = 0 ; i < cantonCriminalite.length; i++)
        {
            cantonCriminalite[i]['CantonId'] = -1; // if no correspodance
            for(let j = 0; j < infoCantons.length; j++)
            {
                if( cantonCriminalite[i]['Année'] == infoCantons[j]['Annee'] &&
                    cantonCriminalite[i]['Canton'] == infoCantons[j]['Canton'])
                {
                    cantonCriminalite[i]['CantonId'] = infoCantons[j]['Id'];
                    cantonCriminalite[i]['Id'] = i + 1; // because i begin at 0

                    //because we dont neeed this fields anymore (we have a relation directly to canton/annee in the other csv)
                    delete cantonCriminalite[i]['Année'];
                    delete cantonCriminalite[i]['Canton'];
                    
                    formatedData.push(cantonCriminalite[i]);
                    break; // it match so we get out of the for
                }
            }
        }
        writeFile(formatedData);
    });
}
/**
 * get id, canton and annee column from the population csv and add it into an array then call the callback with the array in arg 
 * 
 * @param {String}  
 * @param {Function} callback used after 
 */
function getIdCanton(filePath, callback)
{
    let idAnneeCanton = [];

    read(filePath, (data) => 
    {
        for(let i = 0;  i < data.length; i++)
        {
            idAnneeCanton.push({
                Id: data[i]['Id'],
                Canton: data[i]['Canton'],
                Annee: data[i]['Année']
            });
        }
        callback(idAnneeCanton);
    });
  
}
/**
 * Read file, parse it into array of js object then call the callback
 * 
 * @param {String} filePath 
 * @param {Function} callback 
 */
function read(filePath, callback)
{
    fs.readFile(filePath, 'utf8', (err, data) => {
        //if there is an error stop the script
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(filePath+' does not exist');
                return;
            }
            throw err;
        }

        //parse file into csv format, if there is an error, stop the script
        csvParser(data, {
            columns: true, //there is header columns into the file
            delimiter: ';' //csv delimiter
        }, function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            callback(data)
        });
    });
}
