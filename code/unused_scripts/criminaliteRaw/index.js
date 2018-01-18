const fs = require('fs');
const csvParser = require('csv-parse');
const jsonexport = require('jsonexport');
const csvString = require('csv-string');



// Read the file 
fs.readFile('outputCantons.csv', 'utf8', (err, data) => {
    //if there is an error stop the script
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('file does not exist outputCantons.csv');
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
        getIdCanton(linkTables);
    });
});

function writeFile(data)
{
    console.log(data);
    // write file
    jsonexport(data, {
        rowDelimiter: ';'
    }, function(err, csv) {
        if (err) return console.log(err);

        fs.writeFile('crimOutput.csv', csv, (err, fd) => {
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
 * 
 * @param {[Object]} cantonCrim all the lines of the files in Object format
 */
function linkTables(infoCantons )
{
    let formatedData=[];
    fs.readFile('criminaliteRaw.csv', 'utf8', (err, data) => {
        //if there is an error stop the script
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('file does not exist criminaliteRaw');
                return;
            }
            throw err;
        }
       
        //parse file from csv format to  array of js objects, if there is an error, stop the script
        csvParser(data, {
            columns: true, //there is header columns into the file
            delimiter: ';' //csv delimiter
        }, function(err, cantonCriminalite) {
            if (err) {
                console.error(err);
                return;
            }
            
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
                
                        formatedData.push(cantonCriminalite[i]);
                        break;
                    }
                }
                // no correspondance
            }
            writeFile(formatedData);
        });
    });

  
}
function getIdCanton(callback)
{
    let idAnneeCanton = [];
    fs.readFile('outputCantons.csv', 'utf8', (err, data) => {
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
    });
}