-- Insert developers
INSERT INTO developers (name, country, founded_year, website) VALUES
('Nintendo', 'Japan', 1889, 'https://www.nintendo.com'),
('CD Projekt Red', 'Poland', 1994, 'https://www.cdprojektred.com'),
('Valve Corporation', 'USA', 1996, 'https://www.valvesoftware.com'),
('FromSoftware', 'Japan', 1986, 'https://www.fromsoftware.jp'),
('Rockstar Games', 'USA', 1998, 'https://www.rockstargames.com');

-- Insert games
INSERT INTO games (title, description, genre, release_year, platform, rating, price, developer_id) VALUES
('The Legend of Zelda: Breath of the Wild', 'An open-world action-adventure game set in Hyrule', 'Adventure', 2017, 'Nintendo Switch', 9.5, 59.99, 1),
('Super Mario Odyssey', 'A 3D platformer where Mario travels across various kingdoms', 'Platformer', 2017, 'Nintendo Switch', 9.2, 59.99, 1),
('Animal Crossing: New Horizons', 'A life simulation game on a deserted island', 'Simulation', 2020, 'Nintendo Switch', 8.8, 49.99, 1),
('Cyberpunk 2077', 'An open-world RPG set in Night City', 'RPG', 2020, 'PC', 7.5, 49.99, 2),
('The Witcher 3: Wild Hunt', 'An action RPG following Geralt of Rivia', 'RPG', 2015, 'Multi-platform', 9.8, 39.99, 2),
('Half-Life 2', 'A groundbreaking first-person shooter', 'FPS', 2004, 'PC', 9.6, 9.99, 3),
('Portal 2', 'A puzzle-platform game with innovative mechanics', 'Puzzle', 2011, 'Multi-platform', 9.4, 19.99, 3),
('Counter-Strike: Global Offensive', 'A competitive multiplayer FPS', 'FPS', 2012, 'PC', 8.9, 0.00, 3),
('Elden Ring', 'An action RPG in a dark fantasy world', 'RPG', 2022, 'Multi-platform', 9.7, 59.99, 4),
('Dark Souls III', 'A challenging action RPG', 'RPG', 2016, 'Multi-platform', 9.3, 39.99, 4),
('Sekiro: Shadows Die Twice', 'An action-adventure game set in feudal Japan', 'Action', 2019, 'Multi-platform', 9.5, 49.99, 4),
('Grand Theft Auto V', 'An open-world action-adventure game', 'Action', 2013, 'Multi-platform', 9.6, 29.99, 5),
('Red Dead Redemption 2', 'An epic tale of life in America at the dawn of the modern age', 'Action', 2018, 'Multi-platform', 9.8, 59.99, 5),
('Grand Theft Auto: San Andreas', 'A classic open-world action game', 'Action', 2004, 'Multi-platform', 9.1, 14.99, 5),
('Max Payne 3', 'A third-person shooter with bullet time mechanics', 'Shooter', 2012, 'Multi-platform', 8.5, 19.99, 5);
