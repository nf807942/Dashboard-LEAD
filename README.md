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

`npm run build:prod` pour compiler le projet Angular dans le dossier `dist/dashboard`.  
Il faut ensuite copier le contenu de ce dossier dans `nforgeron/dashboard` pour déployer le frontend sur le serveur. 

Les fichiers du backend laravel doivent être placé dans `nforgeron/dashboard-backend`  
_Il faut seulement envoyer les fichiers qui ont changés depuis le prochain déploiement_  

_Vérifier qu'il y a les droits d'écriture sur `dashboard` (sinon `ssh i3m-lead-0243.u-bourgogne.fr -l nforgeron` puis `chmod -c -R 777 dashboard`)._  

Lancer `composer update` dans `dashboard-backend` si les packages ont été modifiés.  

Changer les parametres de la base de données dans  `dashboard-backend/.env`.  
Lancer `php composer migrate` dans `dashboard-backend` pour faire les migrations de la base.  
Lancer `php artisan migrate:fresh --seed` dans `dashboard-backend` si on veut faire une migrations complete, ceci effacera toute les données  actuelles.  