# Données 

## Données brutes

Toutes les données brutes de ce projet proviennent du site [opendata.swiss](https://opendata.swiss). Ce site permet de choisir les données à exporter comme par exemple sur combien d'année prendre les données, vous trouverez donc ci-dessous les colonnes qui ont été choisies pour cette étude.

Les données ont été importées en français, le <b>11.01.2018</b> pour le fichier sur la population des cantons  et le  <b>18.01.2018</b> pour la criminalité. 


### Population

Les données sur la population regroupent pour chaque canton et année, le nombre d'habitants, par sexe et par autorisation de résidence (Suisse - permis B - Permis C etc.). 

#### Liens
- [page de présentation du dataset](https://opendata.swiss/fr/dataset/permanent-and-non-permanent-resident-population-by-canton-sex-residence-permit-age-class-and-citizen)
- [page d'accès au dataset](https://www.pxweb.bfs.admin.ch/pxweb/fr/px-x-0103010000_101/px-x-0103010000_101/px-x-0103010000_101.px)


#### Données sélectionnées

Les données ont été importées en sélectionnant les colonnes suivantes. Les données avec ont été importées avec l'option "Fichier texte (séparateur: point-virgule) avec en-tête"

![Données sélectionnées](./img/popSelect.png)

| Nom                                        | Description                                                                                |
|--------------------------------------------|--------------------------------------------------------------------------------------------|
| Année                                      | Simplement l'année à laquelle a été enregistrer le nombre de personnes (int)               |
| Canton                                     | Le canton de l'enregistrements du nombre d'habitants (string)                              |
| Type de population*                        | Ce champ descrit s'il s'agit de la population permanente ou non (string)                   |
| Autorisation de résidence                  | Définit s'il s'agit d'étranger ou de Suisse (Suisse - permis B - permis C etc.) -( string) |
| Sexe                                       | le sexe de l'echantillon de la population correspondant à la ligne   (string)              |
| Population permenante et non-permanente*   | le nombre de personne - la population  (int)                                               | 


Les données sur la nationalités n'ont pas été sélectionnées car le site opendata.swiss n'autorise l'affichage/import que de 2.5 millions enregistrements, or, une fois toutes sélectionnées, les nationalités, en ajoutent près de 30 millions. 




### Ciminalité

Les données sur la criminalités, quant à elles, regroupe le nombre de crimes illucidés/non-illucidés faits par canton et par année. 

#### Liens
- [page de présentation du dataset](https://opendata.swiss/en/dataset/criminal-offences-registered-by-the-police-according-to-the-swiss-criminal-code-by-canton-level-of-c)
- [page d'accès au dataset](https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-1903020100_101/-/px-x-1903020100_101.px)


 #### Données sélectionnées
 
Les données ont été importées en sélectionnant les colonnes suivantes. Les données avec ont été importées avec l'option "Fichier texte (séparateur: point-virgule) avec en-tête"

![Données sélectionnées](./img/crimSelect.png)

| Nom                                              | Description                                                            |
|--------------------------------------------------|------------------------------------------------------------------------|
| Année                                            | L'année des données (int)                                              |
| Canton                                           | Le canton concerné    (string)                                         |
| Degré de réalisation - Total Degré d'élucidation | Nombre d'infractions du canton pour l'année   (int)                    |
| Degré de réalisation - Total Non élucidées       | Nombre d'infractions élucidées (int)                                   |
| Degré de réalisation - Total Elucidées           | Nombre d'infractions commis non élucidées (int)                        |



## Données traitées

 Afin de générer les données dont nous avons besoins pour notre étude, nous avons utilisé deux scripts Javascript. les opérations effectuées pour traiter les données sont expliquées [ici](../code/readme.md).

 Les données traitées sont disponibles dans le dossier `data/processed/`


## Instructions à suivre
Pour réproduire ces données, importez les deux fichiers CSV depuis le site avec les colonnes comme indiqué dans les parties `Données sélectionnées` depuis le site Opendata.swiss ou prenez-les directement depuis le dossier `/data/raw/` de ce repo. Suivez ensuite ces instructions:
- Ouvrez les fichiers avec un éditeur et supprimez les deux première lignes. (il s'agit du titre du dataset ainsi que d'une ligne vide)
- Importez le repo ou le dossier avec les scripts `code/scripts/`.
- Lancez un invite de commande et déplacer vous jusqu'au dossier `code/scripts/`
- Lancez le script sur la population (`code/scripts/populationScript.js`) puis le second (`code/scripts/criminaliteScript.js`). (Suivez les instructions d'utilisation des scripts disponibles [ici](../code/readme.md) )

