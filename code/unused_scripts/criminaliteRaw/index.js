const fs = require('fs');
const csvParser = require('csv-parse');
const jsonexport = require('jsonexport');
const csvString = require('csv-string');

let args = process.argv.slice(2);
let criminaliteFilePath;
let populationFilePath;


if(args.length < 2)
{
    console.log("1st arg: path of the population csv file | 2nd arg: path of the criminality csv file");
    return;
}
populationFilePath = args[0];
criminaliteFilePath = args[1];



// Read the file 
getIdCanton(populationFilePath, linkTables);

/**
 * 
 * write file 
 * @param {[object]} data 
 */
function writeFile(data)
{
    console.log(data);
    // write file
    jsonexport(data, {
        rowDelimiter: ';'
    }, function(err, csv) {
        if (err) return console.log(err);

        fs.writeFile('ouputCriminaliteV2.csv', csv, (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error('myfile already exists');
                    return;
                }
                throw err;
            }
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
                //console.log(cantonCriminalite[i]['Année'], "=", infoCantons[j]['Année']);
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
            // no correspondance
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
                console.error('file does not exist');
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
