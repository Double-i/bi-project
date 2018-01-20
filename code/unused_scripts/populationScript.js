const fs = require('fs');
const csvParser = require('csv-parse');
const jsonexport = require('jsonexport');
const csvString = require('csv-string');
const arg = require('commander');

arg
    .usage('-p <path_pop_file>')
    .option('-p, --popFile <value>', 'Path to the raw population csv file')
    .option('-o, --output [value]', 'Path to the output file, default: outputPopulation.csv')
    .parse(process.argv);

let inputPath = arg.popFile;
let outputPath = arg.output || 'outputPopulation.csv';


// Read the file 
fs.readFile(inputPath, 'utf8', (err, data) => {
    //if there is an error stop the script
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('file does not exist');
            return;
        }
        throw err;
    }
    console.log("processing data...");

    //parse file into csv format, if there is an error, stop the script
    csvParser(data, {
        columns: true, //there is header columns into the file
        delimiter: ';' //csv delimiter
    }, function(err, data) {
        if (err) {
            console.error(err);
            return;
        }

        let output = sumRows(data);
        jsonexport(output, {
            rowDelimiter: ';'
        }, function(err, csv) {
            if (err) return console.log(err);

            fs.writeFile(outputPath, csv, (err, fd) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                        console.error('myfile already exists');
                        return;
                    }
                    throw err;
                }
                console.log("Finished");
                console.log(outputPath + " has been created");
            });
        });

    });
});


/**
 * return the "middle" age * the population of this kind of population
 * 
 * @param {int} nbPopulation population of the kind of population
 * @param {[int]} minMaxAge the minimum and  age of this kind of population
 
 */
function calcTotalAge( nbPopulation, minMaxAge)
{
    let maxAge = parseInt(minMaxAge[1]);
    let minAge = parseInt(minMaxAge[0]);
   
    if(minMaxAge.length == 2)
    {
      
       return nbPopulation * (maxAge + minAge)/2 ;
    } 
   
    return minAge * parseInt(nbPopulation);
}
/**
 * 
 * @param {Object} cantonsPopulation all the lines of the files in Object format
 */
function sumRows(cantonsPopulation)
{
    let formatedData = [];
    let ageRegex = /[0-9]+/g;

    //info of the previous row
    let previousCanton;
    let previousAnnee;

    let totalTypePop;
    let totalAutoriResi;
    let totalSexe;
    let totalAge;
    let totalPop;

    let supFields = ['Population total'];
    let row = {};
    let idx = 1;
    
    for (let i = 0; i < cantonsPopulation.length; i++){

        let currentCanton   = cantonsPopulation[i]['Canton'];
        let currentAnnee    = cantonsPopulation[i]['Année'];
      
        if(currentCanton != previousCanton || currentAnnee  != previousAnnee ){
           
            if( Object.keys(row).length >= 1 ){
                row['Id']       = idx;
                idx++;
                row['Canton']   = previousCanton;
                row['Année']    = previousAnnee;

                console.log(row['âge moyen']);
                // make an avg of the age of canton
                row['âge moyen'] =  parseInt(row['âge moyen']) / parseInt(row['Population total']);
            
                formatedData.push(row)
            }
            row = {};
            row['âge moyen'] = 0;
            for(let j = 0 ; j < supFields.length; j++)
            {
                row[supFields[j]] = 0;
                
            }   
        }

        //info of the current row
        let currentTypePop      = cantonsPopulation[i]['Type de population'];
        let currentAutoriResi   = cantonsPopulation[i]['Autorisation de résidence'];
        let currentSexe         = cantonsPopulation[i]['Sexe'];
        let currentClasseAge    = cantonsPopulation[i]['Classe d\'âge'];
        let currentPop          = cantonsPopulation[i]['Population résidante permanente et non permanente']
        //console.log(currentTypePop, currentAutoriResi, currentSexe, currentClasseAge, currentPop);

        // array of the max age and min age of the current raw
        let currentMinMaxAge    = currentClasseAge.match(ageRegex);
        

        //if the kind of type Pop, Auto. resid. or gender wasnt added to the row we set it to 0
        if(currentPop > 0)
        {
           
            if(supFields.indexOf(currentTypePop)  == -1){
                row[currentTypePop] = 0;
                supFields.push(currentTypePop);
            } 
            if(supFields.indexOf(currentAutoriResi) == -1 ){
                
                row[currentAutoriResi] = 0;

                supFields.push(currentAutoriResi);
            } 
            if( supFields.indexOf(currentSexe) == -1  )
            {
                row[currentSexe] = 0;
                supFields.push(currentSexe);
            }
        }
        
       
        row['âge moyen'] = parseInt(row['âge moyen']) + calcTotalAge(currentPop, currentMinMaxAge);
    
        row[currentTypePop] = parseInt( row[currentTypePop ]) + parseInt(currentPop);
        row[currentAutoriResi] = parseInt( row[currentAutoriResi]) + parseInt(currentPop);
        row[currentSexe] = parseInt( row[currentSexe]) + parseInt(currentPop);
        row['Population total'] = parseInt( row['Population total']) + parseInt(currentPop);
    
        previousCanton  = currentCanton;
        previousAnnee   = currentAnnee;
        
    }
    row['Id']       = idx;
    row['Canton']   = previousCanton;
    row['Année']    = previousAnnee;
    row['âge moyen'] =  parseInt(row['âge moyen']) / parseInt(row['Population total']);
    formatedData.push(row);
    
    return formatedData;
}