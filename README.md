# Games API

## Projectbeschrijving

Een RESTful API voor het beheren van videogames en hun ontwikkelaars, gebouwd met Node.js, Express en MySQL. De API biedt volledige CRUD-operaties voor games en developers, met ondersteuning voor paginering, zoeken, filteren, sorteren en statistieken.

## Installatie

1. Clone de repository en installeer dependencies:
```bash
npm install
```

2. Configureer MySQL:
   - Installeer XAMPP of MAMP en start MySQL
   - Open phpMyAdmin (http://localhost/phpmyadmin) of MySQL CLI
   - Maak database aan: `CREATE DATABASE games_api;`
   - Importeer `database/schema.sql` om tabellen aan te maken
   - Importeer `database/seed.sql` voor voorbeelddata

3. Configureer environment variables:
   - Kopieer `.env.example` naar `.env`
   - Pas de database credentials aan in `.env`:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=jouw_mysql_wachtwoord
DB_NAME=games_api
```

4. Start de server:
```bash
npm start
```

De API is nu beschikbaar op `http://localhost:3000`
API documentatie: `http://localhost:3000/index.html`

## Features

### Minimum Requirements
- ✅ Twee CRUD interfaces (Games + Developers)
- ✅ Basisvalidatie
- ✅ Paginering (limit & offset)
- ✅ Zoekfunctionaliteit
- ✅ Root documentatiepagina (HTML)

### Extra Features
- ✅ Geavanceerde validatie (URL formaat, jaar ranges)
- ✅ Sorteren (rating, price, release_year, title)
- ✅ Geavanceerde filters (price/rating ranges, meerdere genres)
- ✅ Statistieken endpoint
- ✅ Relatie endpoint (games per developer)
- ✅ Security headers (helmet)
- ✅ Input sanitization

## Bronvermelding

Deze API is ontwikkeld met gebruikmaking van:
- Node.js en Express.js officiële documentatie
- MySQL2 package documentatie
- MDN Web Docs voor JavaScript
