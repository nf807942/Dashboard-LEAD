# DASHBOARD

## Backend : Laravel

### Installation

`composer install` pour télécharger et installer les dépendances du projet. 

### Développement

`php artisan serve` pour lancer le serveur de développement.
`php artisan make:model {name} -mfsc` pour générer un model avec controleur + seeder + factory.
`php artisan migrate:fresh --seed` pour faire les migrations de la base.

## Frontend : Angular

### Installation

`npm install` pour télécharger et installer les dépendances du projet. 

### Développement

`npm run start` pour lancer le serveur de développement.

## Déploiement sur serveur apache

`npm run build:prod` pour compiler le projet Angular dans le dossier `laravel-backend/public/angular` et `laravel-backend/resources/views/angular.blade.php`
Il faut ensuite copier le contenu du dossier `laravel-backend` dans `nforgeron/public_html/dashboard` pour le déployer sur le serveur.

_Il faut seulement envoyer les fichiers qui ont changés après le prochain déploiement_
_Vérifier qu'il y a les droits d'écriture sur `dashboard` (sinon `ssh i3m-lead-0243.u-bourgogne.fr -l nforgeron` puis `chmod -c -R 777 dashboard`)._