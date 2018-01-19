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
## Raw data
 * [Raw data](/raw/readme.md)
 * Includes URL, description and date accessed

Toutes les données brutes de ce projet ont été prises du site [opendata.swiss](https://opendata.swiss) (le 11.01.2018). Ce site autorise notamment le choix des données à exporter (pour par exemple avoir les données uniquement d'un canton), vous trouverez donc ci-dessous les colonnes qui ont été importer pour cette étude.

Les données ont été importer en français, le 11.01.2018 pour la population (et crimnalité v1) et le 18.01.2018 pour la criminalité (V2) 


### Population

Les données sur la population regroupent pour chaque cantons le nombre d'habitants par année, par sexe et par autorisation de résidence (Suisse - permis B - Permis C etc.). 

#### Liens
![page de présentation du dataset](https://opendata.swiss/fr/dataset/permanent-and-non-permanent-resident-population-by-canton-sex-residence-permit-age-class-and-citizen)
![page d'accès au dataset](https://www.pxweb.bfs.admin.ch/pxweb/fr/px-x-0103010000_101/px-x-0103010000_101/px-x-0103010000_101.px)


#### Données sélectionnées
| Nom                                        | Description                                                                     |
|--------------------------------------------|---------------------------------------------------------------------------------|
| Année                                      | Simplement l'année à laquelle a été enregistrer le nombre de personnes          |
| Canton                                     | Le canton de l'enregistrements du nombre d'habitants                            |
| Type de population*                        | Ce champ descrit s'il s'agit de la population permanente ou non                 |
| Autorisation de résidence                  | Définit s'il s'agit d'étranger ou de Suisse (Suisse - permis B - permis C etc.) |
| Sexe                                       | le sexe de l'echantillon de la population correspondant à la ligne              |
| Population permenante et non-permanente*   | le nombre de personne - la population                                           |




Les données ont été importées depuis ![la page d'accès au dataset](https://www.pxweb.bfs.admin.ch/pxweb/fr/px-x-0103010000_101/px-x-0103010000_101/px-x-0103010000_101.px) en sélectionnant les colonnes suivantes. Les données avec ont été importées avec l'option "Fichier texte (séparateur: point-virgule) avec en-tête"

![Données sélectionnées](./raw/img/popSelect.png)

Les données sur la nationalités n'ont pas été sélectionnées car le site opendata.swiss n'autorise l'affichage/import que de 2.5 millons d'enregistrements. Or, une fois toutes sélectionnées, les nationalités en ajoutent près de 30 millions. 

#### Provenance des données

#### Transformations apportées
- Tout d'abord, ouvrir le fichier et supprimer les 2 premières lignes du fichier (il s'agit en principe du titre du dataset ainsi qu'une ligne vide)


### Ciminalité

Les données sur la criminalités, quant à elles, regroupe le nombre de crimes/infractions (ou tentative) illucidés/non-illucidés faits par canton et année. 

#### URL
![page de présentation du dataset](https://opendata.swiss/en/dataset/criminal-offences-registered-by-the-police-according-to-the-swiss-criminal-code-by-canton-level-of-c)
![page d'accès au dataset](https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-1903020100_101/-/px-x-1903020100_101.px)


 #### données sélectionnées

| Nom                                              | Description                                                            |
|--------------------------------------------------|------------------------------------------------------------------------|
| Année                                            | Simplement l'année à laquelle a été enregistrer le nombre de personnes |
| Canton                                           | Le canton concerné                                                     |
| Degré de réalisation - Total Degré d'élucidation | nombre d'infractions du canton pour l'année                            |
| Degré de réalisation - Total Non élucidées       | nombre d'infractions élucidées                                         |
| Degré de réalisation - Total Elucidées           | nombre d'infractions/crimes commis non élucidées                       |


;Degré de réalisation - Total Degré d'élucidation - Total;Degré de réalisation - Total Non élucidées;Degré de réalisation - Total Elucidées

![Données sélectionnées](./raw/img/crimSelectV2.png)




#### Provenance des données


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
