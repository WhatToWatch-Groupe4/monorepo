# What to Whatch monorepo

Ce dépôt git est le monorepo du projet WhatToWatch du groupe 4.
Il contient deux projets, une Api écrit en NestJS disponnible dans le dossier `apps/api` et le projet frontend écrit en react dans le dossier `apps/web`.
## Prerequires

Pour lancer les projets en local il faut installer au préalable.
- Node 14
- Yarn
- Postgres (docker-compose disponnible au besoin)
- Un clé api TheMovieDB v3

Pour récupèrer un clé API v3, il suffit de créer un compte sur [https://www.themoviedb.org](https://www.themoviedb.org) et de bien vérifier son compte.
Ensuite, se rendre dans les  [paramètres de l'api de son compte](https://www.themoviedb.org/settings/api) et suivre la procédure.
## Run in dev

Il faut s'assurer de bien définir les `.env` disponnible dans les deux projets, des exemples sont diponnibles : 
- `apps/web/.env.example` -> `apps/web/.env`
- `apps/api/.env.example` -> `apps/api/.env`

```bash
yarn install # Installe les dépendances 
yarn dev # Lancer les projets
```

La Dockerization est prévu pour simplifier ça mise en place.

## Run in production


