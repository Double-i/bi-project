# Code
Vous trouverez ici les deux scripts réalisés dans le but de formater les données pour l'analyse.



## Installation des dépendances
Pré-requis: [node.js](https://nodejs.org/en/) (testé sur la v.8.9.1)


Une fois node.js installé, vous pouvez installer les dépendances des scripts. 
- ouvrez un terminal
- placez-vous dans le dossier des scripts
- installez les dépendances avec `npm install`

## Utilisation des scripts

Vous pouvez maintenant exécuter le script désiré. 

Lancez la commande `node populationScript.js -h` pour avoir des informations sur les arguments à renseigner 

Pour lancer le script sur la population, tappez la commande suivant:  (dans le cas où l'argument `-o` n'est pas renseigner le fichier de sortie sera `outputPopulation.csv` )


```javascript
node index.js -p <chemin/vers/populationRaw.csv> [-o <chemin/vers/fichierDeSortie.csv>]
```


Pour lancer le script sur la criminalite, tappez la commande suivant:  (dans le cas où l'argument `-o` n'est pas renseigner le fichier de sortie sera `outputCriminalite.csv` )

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

## Traitements effectués
### Population
Voici à quoi ressemblent les données obtenues depuis le site Opendata.swiss. 

| Année | Canton                | Type de population                  | Autorisation de résidence                              | Sexe  | Classe d'age | Pop. rési. perm. et non perm. |
|-------|-----------------------|-------------------------------------|--------------------------------------------------------|-------|--------------|-------------------------------|
| 2010  | Zürich                | Population résidante permanente     | Suisse                                                 | Homme | 0-4 ans      | 27340                         |
| 2010  | Zürich                | Population résidante permanente     | Fonctionnaire international sans immunité diplomatique | Homme | 25-29 ans    | 24684                         |
| 2010  | Appenzell Innerrhoden | Population résidante non permanente | Fonctionnaire international sans immunité diplomatique | Homme | 40-44 ans    | 5                             | 

Comme vous pouvez le voir, chaque ligne offre pas mal d'informations et sont déjà formatées. Afin de simplifier le dataset et de le rendre utilisable pour notre étude. Nous allons regrouper les données par année et cantons. Afin d'obtenir ceci.

| 1.âge moyen        | 2.Population total | 3.Pop. rési. perm. | 4.Suisse      | 5.Homme      | 6.Pop. rési. non perm. | 7.Id | 8.Canton              | 9.Année | 10.Fonctionnaire interna. sans immunité diplo. |
|--------------------|--------------------|--------------------|---------------|--------------|------------------------|------|-----------------------|---------|------------------------------------------------|
| 13.861833000153775 | 52024              | 27340              | 52024         | 52024        | 24684                  | 1    | Zürich                | 2010    | 24684                                          |      
| 42                 | 5                  | 0                  | 0             | 5            | 5                      | 2    | Appenzell Innerrhoden | 2010    | 5                                              | 

 Des colonnes supplémentaires se sont ajoutées. les colonnes 3 à 6 sont ajoutées en fonction des valeurs des colonnes `Type de population`, `Autorisation de résidence` et  `Sexe`. 
1. Moyen d'âge (calcule expliqué en-dessous)
2. Population total 
3. Homme (issue de sexe. S'il y avait eu une ligne avec femme comme sexe une autre colonne Femme aurait également été ajoutée)
4. Suisse (issue de la colonne autorisation de résidence)
5. Fonctionnaire international sans immunité diplomatique (issue de la colonne autorisation de résidence)
6. ...



*Age moyen: si on prend la classe d'âge 0-4 ans et que l'on fait la moyenne de cette âge (`(4+0)/2`) on obtient `2` on le multiple par le nombre de personne pour obtenir un nombre total d'année `2 * 27340 = 54680`. Nous additionnons le nombre total d'année des lignes ayant le même canton/année: `(25+29) / 2 * 24684 = 666468 => (54680 + 666468) = 721147`. Enfin nous le divisons par la population totale du canton `721147 / 52024 = 13.86..`. 

 ### Criminalité
En ce qui concerne les données sur la criminalité, aucune opération n'a été effectuée mise à part l'ajout pour chaque ligne d'un id ainsi que d'une clé étrangère correspondant à un ligne de la table population en fonction de l'année et du canton. 