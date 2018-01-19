# Code

Vous trouverez ici les deux scripts réalisés dans le but de formater les données pour l'analyse.
Le premier script, se trouvant dans le [dossier population](./processed/population), permet de traiter les données du fichier [populationRaw.csv](../data/raw/populationsRaw.csv)
Le deuxième script, quant à lui, se trouve dans le dossier [criminalite](./processed/criminalite) et traite les données du fichier [criminaliteRaw.csv](../data/raw/criminalite.csv).


## Installation des dépendance
Pré-requis: [node.js](https://nodejs.org/en/) (testé sur la v.8.9.1)


Une fois node.js installé, vous pouvez installer les dépendance du scripts. 
- ouvrez un terminal
- placez-vous dans le dossier du script à exécuter
- installez les dépendances avec `npm install`

## Utilisation des scripts

Vous pouvez maintenant exécuter le script désiré. 

Lancez la commande `node index.js -h` pour avoir des informations sur les arguments à renseigner 

Pour lancer le script sur la population, tappez la commande suivant:  (dans le cas où l'argument `-o` n'est pas renseigner le fichier de sortie sera `outputPopulation.csv` )


```javascript
node index.js -p <chemin/vers/populationRaw.csv> [-o <chemin/vers/fichierDeSortie.csv>]
```


Pour lancer le script sur la population, tappez la commande suivant:  (dans le cas où l'argument `-o` n'est pas renseigner le fichier de sortie sera `outputCriminalite.csv` )

```
node index.js -p <chemin/vers/populationProcessed.csv> -c <chemin/vers/criminaliteRaw.csv> [-o <chemin/vers/fichierDeSortie.csv>]
```


## Unused scripts
 * [Unused scripts](unused_scripts/readme.md)
 * Might be less commented but some comments help in any case
 * May be multiple versions
 * May include analyses that are later discarded

## Final scripts
 * [Final scripts](scripts/readme.md)
 * Clearly commented to explain what, when, why, and how
 * Should include processing details
