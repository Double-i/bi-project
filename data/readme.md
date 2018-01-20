# data
!!!!!!!!  
TODO
- PRECISER COMMENT OPENDATA A RECUPERER LES DONNEES
- Vérifier si données sélectionnées
- export les images



- explication installation
- simplification code & clean
- ajouter la possiblité de mettre des arguments pour les noms des fichiers
- 


 !!!!!!!!!
## Données brutes
 * [Raw data](/raw/readme.md)
 * Includes URL, description and date accessed


Toutes les données brutes de ce projet proviennent du site [opendata.swiss](https://opendata.swiss) (le 11.01.2018). Ce site permet de choisir les données à exporter comme par exemple sur combien d'année prendre les données, vous trouverez donc ci-dessous les colonnes qui ont été choisies pour cette étude.

Les données ont été importées en français, le <b>11.01.2018</b> pour le fichier sur la population des cantons (et crimnalité v1) et le 18.01.2018 pour la criminalité (V2). 


### Population

Les données sur la population regroupent pour chaque canton et année, le nombre d'habitants, par sexe et par autorisation de résidence (Suisse - permis B - Permis C etc.). 

#### Liens
![page de présentation du dataset](https://opendata.swiss/fr/dataset/permanent-and-non-permanent-resident-population-by-canton-sex-residence-permit-age-class-and-citizen)
![page d'accès au dataset](https://www.pxweb.bfs.admin.ch/pxweb/fr/px-x-0103010000_101/px-x-0103010000_101/px-x-0103010000_101.px)


#### Données sélectionnées

Les données ont été importées en sélectionnant les colonnes suivantes. Les données avec ont été importées avec l'option "Fichier texte (séparateur: point-virgule) avec en-tête"

![Données sélectionnées](./raw/img/popSelect.png)

| Nom                                        | Description                                                                     |
|--------------------------------------------|---------------------------------------------------------------------------------|
| Année                                      | Simplement l'année à laquelle a été enregistrer le nombre de personnes          |
| Canton                                     | Le canton de l'enregistrements du nombre d'habitants                            |
| Type de population*                        | Ce champ descrit s'il s'agit de la population permanente ou non                 |
| Autorisation de résidence                  | Définit s'il s'agit d'étranger ou de Suisse (Suisse - permis B - permis C etc.) |
| Sexe                                       | le sexe de l'echantillon de la population correspondant à la ligne              |
| Population permenante et non-permanente*   | le nombre de personne - la population                                           |


Les données sur la nationalités n'ont pas été sélectionnées car le site opendata.swiss n'autorise l'affichage/import que de 2.5 millons enregistrements, or, une fois toutes sélectionnées, les nationalités, en ajoutent près de 30 millions. 




### Ciminalité

Les données sur la criminalités, quant à elles, regroupe le nombre de crimes illucidés/non-illucidés faits par canton et par année. 

#### Liens
![page de présentation du dataset](https://opendata.swiss/en/dataset/criminal-offences-registered-by-the-police-according-to-the-swiss-criminal-code-by-canton-level-of-c)
![page d'accès au dataset](https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-1903020100_101/-/px-x-1903020100_101.px)


 #### Données sélectionnées
 
Les données ont été importées en sélectionnant les colonnes suivantes. Les données avec ont été importées avec l'option "Fichier texte (séparateur: point-virgule) avec en-tête"

![Données sélectionnées](./raw/img/crimSelectV2.png)

| Nom                                              | Description                                                            |
|--------------------------------------------------|------------------------------------------------------------------------|
| Année                                            | L'année des données                                                    |
| Canton                                           | Le canton concerné                                                     |
| Degré de réalisation - Total Degré d'élucidation | Nombre d'infractions du canton pour l'année                            |
| Degré de réalisation - Total Non élucidées       | Nombre d'infractions élucidées                                         |
| Degré de réalisation - Total Elucidées           | Nombre d'infractions commis non élucidées                              |



## Processed data
 * [Processed data](processed/readme.md)
 * File should be named so it is easy to see which [script](../code/) has generated the data
 * Processed data should be [tidy](https://github.com/jtleek/datasharing)

## Study design
 * How data were collected...
 * ...

## Code book
 * Description of variables and their units
 * ...

## Instruction list
 * How to go from raw data to tidy data

 Afin de générer les données dont nous avons besoins pour notre étude nous avons utiliser deux scripts Javascript.

 ## Population
Voici à quoi ressembles les données obtenues depuis le site Opendata.swiss. 

| Année | Canton                | Type de population                  | Autorisation de résidence                              | Sexe  | Classe d'age | Pop. rési. perm. et non perm. |
|-------|-----------------------|-------------------------------------|--------------------------------------------------------|-------|--------------|-------------------------------|
| 2010  | Zürich                | Population résidante permanente     | Suisse                                                 | Homme | 0-4 ans      | 27340                         |
| 2010  | Zürich                | Population résidante permanente     | Fonctionnaire international sans immunité diplomatique | Homme | 25-29 ans    | 24684                         |
| 2010  | Appenzell Innerrhoden | Population résidante non permanente | Fonctionnaire international sans immunité diplomatique | Homme | 40-44 ans    | 5                             | 

Comme vous pouvez le voir, chaque ligne offre pas mal d'informations et sont déjà formatées. Afin de simplifier le dataset et de le rendre utilisable pour notre étude. Nous allons regrouper les données par année et cantons. Afin d'obtenir ceci.

| âge moyen^^1^^ | Population total^^2^^ | Pop. rési. perm.^^2^^ | Suisse^^2^^ | Homme^^2^^ | Pop. rési. non perm.^^2^^ | Id^^2^^ | Canton^^3^^       | Année^^2^^ | Fonctionnaire interna. sans immunité diplo.^^2^^ |
|--------------------|------------------|------------------|--------|-------|----------------------|----|-----------------------|-------|---------------------------------------------|
| 13.861833000153775 | 52024            | 27340            | 52024  | 52024 | 24684                | 1  | Zürich                | 2010  | 24684                                       |                               
| 42                 | 5                | 0                | 0      | 5     | 5                    | 2  | Appenzell Innerrhoden | 2010  | 5                                           | 

1. float
2. int 
3. String

 Des colonnes supplémentaires se sont ajoutées. 
1. Moyen d'âge (calcule expliqué en-dessous)
2. Population total 
3. Homme (issue de sexe. S'il y avait eu une ligne avec femme comme sexe une autre colonne Femme aurait également été ajoutée)
4. Suisse (issue de la colonne autorisation de résidence)
5. Fonctionnaire international sans immunité diplomatique (issue de la colonne autorisation de résidence)
6. ...

les colonnes 3 à 6 sont ajoutées en fonction des valeurs des colonnes `Type de population`, `Autorisation de résidence` et  `Sexe`.




*Age moyen: si on prend la classe d'âge 0-4 ans et que l'on fait la moyenne de cette âge (`(4+0)/2`) on obtient `2` on le multiple par le nombre de personne pour obtenir un nombre total d'année `2 * 27340 = 54680`. Nous additionnons le nombre total d'année des lignes ayant le même canton/année: `(25+29) / 2 * 24684 = 666468 => (54680 + 666468) = 721147`. Enfin nous le division par la population totale du cantons (Population total).

### Instruction à suivre
Tout d'abord, importez les deux CSV comme indiqué dans les parties `Données sélectionnées` depuis le site Opendata.swiss ou prenez-les directement depuis le dossier `/data/raw/`.

- Importer le repo.
- Lancez un invite de commande et déplacer vous jusqu'au dossier `code/scripts/`
- Suivez ensuite les instructions d'utilisation de scripts disponibles [ici](../code/readme.md)

 ## Criminalite


