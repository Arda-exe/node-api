# Games API

## Projectbeschrijving

Een RESTful API voor het beheren van videogames en hun ontwikkelaars, gebouwd met Node.js, Express en MySQL. De API biedt volledige CRUD-operaties voor games en developers, met ondersteuning voor paginering, zoeken, filteren, sorteren en statistieken.

## Installatie

1. Clone de repository en installeer dependencies:
```bash
npm install
```

2. Configureer MySQL met XAMPP:
   - Download en installeer [XAMPP](https://www.apachefriends.org/)
   - Start de XAMPP Control Panel
   - Start de **MySQL** service
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Maak database aan met naam: `games_api`

3. Configureer environment variables:
   - Kopieer `.env.example` naar `.env`
   - Pas de database password aan in `.env` (standaard leeg bij XAMPP):
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=games_api
```

4. Start de server:
```bash
npm start
```

De API is nu beschikbaar op `http://localhost:3000`

## Features

### Minimum Requirements
- Twee CRUD interfaces (Games + Developers)
- Basisvalidatie
- Paginering (limit & offset)
- Zoekfunctionaliteit
- Root documentatiepagina (HTML)

### Extra Features
- Geavanceerde validatie (URL formaat, jaar ranges)
- Sorteren (rating, price, release_year, title)
- Geavanceerde filters (price/rating ranges, meerdere genres)
- Statistieken endpoint
- Relatie endpoint (games per developer)
- Security headers (helmet)
- Input sanitization

## Bronvermelding

Deze API is ontwikkeld met gebruikmaking van:
- Node.js en Express.js officiële documentatie
- MySQL2 package documentatie
- MDN Web Docs voor JavaScript
- copilot voor documentatie pagina en plannen/controle van code
