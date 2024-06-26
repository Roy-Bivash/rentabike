# RENT A BIKE

### Groupe : 
- Clement HARTMANN
- Bivash ROY
- Youssef EL AZZAOUI

---

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/)
- [NestJS CLI](https://nestjs.com/) (peut être installé lors du processus)

### Démarrage

#### 1. MySQL :
Dans le dossier `./database`, vous trouverez un fichier nommé `rentabike_3.sql`. Utilisez ce fichier pour configurer votre serveur MySQL.

#### 2. Backend :
  * Mettez à jour le fichier `.env` :
    - Un exemple de fichier `.env` est disponible sous le nom `backend/.env_exemple`.
    - Mettez à jour ce fichier avec les informations de connexion de votre serveur MySQL :
    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USER=root
    DATABASE_PASS=An0ther@1
    DATABASE_NAME=rentabike_3
    ```

  * Placez-vous dans le dossier `backend` :
    ```sh
    cd ./backend
    ```
  * Installez NestJS :
    ```sh
    npm install -g @nestjs/cli
    ```
  * Téléchargez les dépendances :
    ```sh
    npm install
    ```
  * Lancez le serveur en mode développement :
    ```sh
    npm run start:dev
    ```

#### 3. Frontend :
  * Placez-vous dans le dossier `frontend_web` :
    ```sh
    cd ./frontend_web
    ```
  * Téléchargez les dépendances :
    ```sh
    npm install
    ```
  * Lancez le serveur frontend :
    ```sh
    npm run host
    ```

#### 4. Utilisation sur Mobile :
Si vous souhaitez utiliser l'application sur votre mobile via votre réseau local, vous devez mettre l'adresse IP de votre machine dans le fichier `frontend_web/src/config.js`. Remplacez `localhost` dans `SERVER_URL` par l'adresse IP de votre machine. Par exemple :

```js
export default {
    SERVER_URL: "http://129.342.44.43:3000",
    CLIENT_URL: "http://localhost:5173",
};
```

Ensuite, ouvrez un navigateur sur votre téléphone et accédez à l'adresse IP de votre machine avec le port spécifié. Par exemple, entrez `http://129.342.44.43:5173` dans la barre d'adresse du navigateur de votre téléphone.



#### Compte déja créer sur la base de données :
client : client@mail.com -> mdp:client

admin :  admin@mail.com -> mdp:admin

reparateur :  reparateur@mail.com -> mdp:reparateur

