# Contributing

Pour ce projet, nous allons suivre le workflow [Gitflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow). Cela signifie que nous avons une branche de production (main), et une branche de développement (develop).
Le projet a été découpé en plusieurs issues. 
Le développement de chaque issue est effectué sous des branches "feature", qui une fois terminées, seront fusionnées dans la branche de développement (develop). Lorsqu'une nouvelle version est publiée, nous fusionnons la branche de développement (develop) dans la branche de production (main).



## Nom des branches

Le nom des branches doit respecter le modèle de Gitflow. C'est à dire un préfix défini selon le besoin (voir liste ci-dessous) et le nom de la branche écrit en `snake_case`.

- Branche de production: **main**
- Branche de développement: **develop**
- Préfixe branche de fonctionnalité (feature) : **feature/**
- Préfixe branche de correction de bug: **bugfix/**
- Préfixe branche de fin de version (regroupement de fonctionnalités): **release/**

## Les commits

Les commits doivent respecter un format très précis. Ce format permet de faciliter la lecture de l'historique des commits.
Ils sont toujours écrit en anglais.

Chaque commit se composera d'un `header`, un `body` et un `footer`. Le header devra renseigner un type (type), une portée (scope) et le sujet (subject). La portée est optionnelle.

La longueur d'un commit ne devra pas non plus dépasser 100 caractères.

Voici un exemple:

    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>
    
Pour un "breaking change", il faut rajouter un `!` juste après la portée (scope).

### Type
Le type doit faire partie de la liste suivante:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Portée (Scope)
La portée (scope) doit faire partie de la liste suivante:
- **api**
- **web**
- **all**

### Sujet (Subject)

- Il doit utiliser le présent de l'impératif ( "change" not "changed" nor "changes")
- Ne pas commencer par une majuscule 
- Ne pas finir par un point
