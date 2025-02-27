--Social Network API--

Acesta este un API RESTful simplu construit folosind Node.js, Express.js și PostgreSQL.
API-ul oferă operațiuni CRUD pentru Utilizatori, Grupuri și Mesaje.

--Instalare--
Înainte de a rula proiectul, asigură-te că ai instalat Node.js și PostgreSQL.

1. Clonează depozitul
Dacă folosești GitHub, poți clona proiectul:

git clone 
cd social-network-api
2.  Instalează dependențele
Execută comanda următoare pentru a instala pachetele necesare:

npm install

--Configurare Bază de Date--

1. Pornește PostgreSQL

Dacă PostgreSQL nu este deja activat, îl poți porni cu:

bash
Copiază
Editează
sudo systemctl start postgresql
Pasul 2: Creează baza de date
Deschide PostgreSQL:

bash
Copiază
Editează
sudo -i -u postgres
psql
Apoi creează baza de date:

sql
Copiază
Editează
CREATE DATABASE social_network_db;
Ieși din psql:

sql
Copiază
Editează
\q
3. Configurează credențialele PostgreSQL
Editează fișierul db.js și setează detaliile corecte pentru conectarea la baza de date:


const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      // Numele utilizatorului PostgreSQL
  host: 'localhost',     // Gazda bazei de date
  database: 'social_network_db', // Numele bazei de date
  password: 'parola_ta', // Parola PostgreSQL
  port: 5432,            // Portul default PostgreSQL
});

module.exports = pool;


--Rularea API-ului--
Pentru a porni serverul, rulează:


node index.js
Dacă totul este configurat corect, ar trebui să vezi:

Serverul rulează pe http://localhost:3000

Acum API-ul este disponibil la http://localhost:3000.

--Popularea Bazei de Date--

Pentru a popula baza de date cu exemple de utilizatori, grupuri și mesaje, rulează:


node seed.js
Acesta va insera date de exemplu în baza ta de date.

Poți verifica datele inserate în PostgreSQL tastand:


SELECT * FROM users;
SELECT * FROM subreddits;
SELECT * FROM messages;


--Endpoints API--

Users
GET /users → Obține toți utilizatorii.
GET /users/:user_id → Obține un utilizator după ID.
POST /users → Creează un nou utilizator.
PUT /users/:user_id → Actualizează un utilizator existent.
DELETE /users/:user_id → Șterge un utilizator.
Subreddits
GET /subreddits → Obține toate grupurile.
GET /subreddits/:subreddit_id → Obține un grup după ID.
POST /subreddits → Creează un nou grup.
PUT /subreddits/:subreddit_id → Actualizează un grup.
DELETE /subreddits/:subreddit_id → Șterge un grup.
Threads
GET /threads → Obține toate mesajele.
GET /threads/:thread_id → Obține un mesaj după ID.
POST /threads/:subreddit_id → Creează un nou mesaj.
PUT /threads/:thread_id → Actualizează un mesaj.
DELETE /threads/:thread_id → Șterge un mesaj.


TESTARILE LE-AM FACUT IN TERMINAL CACI POSTMAN-UL IMI FACEA PROBLEME, INSA IN TERMINAL TOTUL A DECURS DE MINUNE

Spre exemplu asta am folosit
Invoke-RestMethod -Uri http://localhost:3000/threads -Method GET
Invoke-RestMethod -Uri http://localhost:3000/threads/1 -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"author_id":1,"title":"Interesting Discussion","content":"Let\'s talk about the latest in technology!"}'

--Testarea API-ului cu curl--
  Obține toți utilizatorii
curl http://localhost:3000/users

Creează un nou utilizator

 Invoke-RestMethod -Uri http://localhost:3000/users -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"username":"Ana","email":"ana@ase.com","subscribed_subreddits":[]}'
>>
