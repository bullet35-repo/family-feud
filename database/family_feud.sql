CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) DEFAULT 'default.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    round INTEGER NOT NULL,
    question TEXT NOT NULL
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    answer TEXT NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
CREATE TABLE final_questions (
  id SERIAL PRIMARY KEY,
  question TEXT
);
CREATE TABLE final_answers (
  id SERIAL PRIMARY KEY,
  final_question_id INT,
  answer TEXT,
  points INT,
  FOREIGN KEY (final_question_id) REFERENCES final_questions(id)
);
CREATE TABLE user_points (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ROUND 1
INSERT INTO questions (round, question) VALUES
(1, 'Name a color in the rainbow'),                -- ID 1
(1, 'Name a mode of transportation'),              -- ID 2
(1, 'Name a popular pizza topping'),               -- ID 3
(1, 'Name something you find in a bathroom'),      -- ID 4
(1, 'Name a musical instrument'),                  -- ID 5
(1, 'Name a farm animal'),                         -- ID 6
(1, 'Name something you do before sleeping'),      -- ID 7
(1, 'Name a holiday where people dress up'),       -- ID 8
(1, 'Name a handheld gaming console'),             -- ID 9
(1, 'Name a famous superhero'),                    -- ID 10
(1, 'Name a room in a house'),                     -- ID 11
(1, 'Name something kids bring to school'),        -- ID 12
(1, 'Name something you eat with a fork'),         -- ID 13
(1, 'Name a board game'),                          -- ID 14
(1, 'Name something you might find in a park'),    -- ID 15
(1, 'Name a shape'),                               -- ID 16
(1, 'Name a type of weather'),                     -- ID 17
(1, 'Name something found in a kitchen'),          -- ID 18
(1, 'Name a popular ice cream flavor'),            -- ID 19
(1, 'Name a type of tree');                        -- ID 20

-- ROUND 1 Answers
INSERT INTO answers (question_id, answer, points) VALUES
-- Q1
(1, 'Red', 20), (1, 'Blue', 15), (1, 'Green', 8), (1, 'Yellow', 5), (1, 'Purple', 2),
-- Q2
(2, 'Car', 20), (2, 'Bus', 15), (2, 'Bicycle', 8), (2, 'Train', 5), (2, 'Plane', 2),
-- Q3
(3, 'Pepperoni', 20), (3, 'Cheese', 15), (3, 'Mushrooms', 8), (3, 'Sausage', 5), (3, 'Olives', 2),
-- Q4
(4, 'Toilet', 20), (4, 'Shower', 15), (4, 'Sink', 8), (4, 'Toothbrush', 5), (4, 'Soap', 2),
-- Q5
(5, 'Guitar', 20), (5, 'Piano', 15), (5, 'Drums', 8), (5, 'Violin', 5), (5, 'Flute', 2),
-- Q6
(6, 'Cow', 20), (6, 'Pig', 15), (6, 'Chicken', 8), (6, 'Sheep', 5), (6, 'Horse', 2),
-- Q7
(7, 'Brush teeth', 20), (7, 'Read', 15), (7, 'Pray', 8), (7, 'Watch TV', 5), (7, 'Set alarm', 2),
-- Q8
(8, 'Halloween', 20), (8, 'Carnival', 15), (8, 'Comic Con', 8), (8, 'Masquerade', 5), (8, 'Purim', 2),
-- Q9
(9, 'Nintendo Switch', 20), (9, 'Game Boy', 15), (9, 'PSP', 8), (9, 'DS', 5), (9, 'Steam Deck', 2),
-- Q10
(10, 'Superman', 20), (10, 'Spider-Man', 15), (10, 'Batman', 8), (10, 'Wonder Woman', 5), (10, 'Iron Man', 2),
-- Q11
(11, 'Living room', 20), (11, 'Bedroom', 15), (11, 'Kitchen', 8), (11, 'Bathroom', 5), (11, 'Dining room', 2),
-- Q12
(12, 'Backpack', 20), (12, 'Notebook', 15), (12, 'Pencil case', 8), (12, 'Lunchbox', 5), (12, 'Homework', 2),
-- Q13
(13, 'Pasta', 20), (13, 'Salad', 15), (13, 'Cake', 8), (13, 'Chicken', 5), (13, 'Rice', 2),
-- Q14
(14, 'Monopoly', 20), (14, 'Chess', 15), (14, 'Scrabble', 8), (14, 'Clue', 5), (14, 'Uno', 2),
-- Q15
(15, 'Tree', 20), (15, 'Bench', 15), (15, 'Slide', 8), (15, 'Dog', 5), (15, 'Picnic table', 2),
-- Q16
(16, 'Circle', 20), (16, 'Square', 15), (16, 'Triangle', 8), (16, 'Rectangle', 5), (16, 'Oval', 2),
-- Q17
(17, 'Sunny', 20), (17, 'Rainy', 15), (17, 'Snowy', 8), (17, 'Windy', 5), (17, 'Cloudy', 2),
-- Q18
(18, 'Spoon', 20), (18, 'Plate', 15), (18, 'Pot', 8), (18, 'Knife', 5), (18, 'Stove', 2),
-- Q19
(19, 'Vanilla', 20), (19, 'Chocolate', 15), (19, 'Strawberry', 8), (19, 'Mint', 5), (19, 'Cookie Dough', 2),
-- Q20
(20, 'Oak', 20), (20, 'Maple', 15), (20, 'Pine', 8), (20, 'Birch', 5), (20, 'Willow', 2);


-- ROUND 2
INSERT INTO questions (round, question) VALUES
(2, 'Name a type of pet people usually have'),       -- ID 21
(2, 'Name something you take on a camping trip'),    -- ID 22
(2, 'Name something you do on a rainy day'),         -- ID 23
(2, 'Name a popular social media app'),              -- ID 24
(2, 'Name something you find in a school classroom'),-- ID 25
(2, 'Name a popular vacation destination'),          -- ID 26
(2, 'Name a piece of furniture in a living room'),   -- ID 27
(2, 'Name a fruit you can eat with the skin on'),     -- ID 28
(2, 'Name a popular sport'),                         -- ID 29
(2, 'Name something you can see in the sky'),        -- ID 30
(2, 'Name something you do with your hands'),        -- ID 31
(2, 'Name a game you play with a ball'),             -- ID 32
(2, 'Name a famous landmark'),                       -- ID 33
(2, 'Name a type of music'),                         -- ID 34
(2, 'Name a famous movie character'),                -- ID 35
(2, 'Name something in your pocket'),                -- ID 36
(2, 'Name a type of chocolate'),                     -- ID 37
(2, 'Name a common pet bird'),                       -- ID 38
(2, 'Name something in a grocery store'),            -- ID 39
(2, 'Name something you need for a party');          -- ID 40

-- ROUND 2 Answers
INSERT INTO answers (question_id, answer, points) VALUES
-- Q21
(21, 'Dog', 20), (21, 'Cat', 15), (21, 'Fish', 8), (21, 'Bird', 5), (21, 'Hamster', 2),
-- Q22
(22, 'Tent', 20), (22, 'Sleeping bag', 15), (22, 'Food', 8), (22, 'Flashlight', 5), (22, 'Bug spray', 2),
-- Q23
(23, 'Watch movies', 20), (23, 'Read a book', 15), (23, 'Sleep', 8), (23, 'Drink hot chocolate', 5), (23, 'Clean the house', 2),
-- Q24
(24, 'Facebook', 20), (24, 'Instagram', 15), (24, 'TikTok', 8), (24, 'Twitter', 5), (24, 'Snapchat', 2),
-- Q25
(25, 'Desk', 20), (25, 'Blackboard', 15), (25, 'Chalk', 8), (25, 'Books', 5), (25, 'Teacher', 2),
-- Q26
(26, 'Hawaii', 20), (26, 'Paris', 15), (26, 'New York', 8), (26, 'Tokyo', 5), (26, 'London', 2),
-- Q27
(27, 'Couch', 20), (27, 'Coffee table', 15), (27, 'Chair', 8), (27, 'Lamp', 5), (27, 'Bookshelf', 2),
-- Q28
(28,'Apple', 20), (28, 'Banana', 15), (28, 'Peach', 8), (28, 'Plum', 5), (28, 'Tomato', 2),
-- Q29
(29, 'Soccer', 20), (29, 'Basketball', 15), (29, 'Baseball', 8), (29, 'Tennis', 5), (29, 'Football', 2),
-- Q30
(30, 'Cloud', 20), (30, 'Bird', 15), (30, 'Plane', 8), (30, 'Sun', 5), (30, 'Stars', 2),
-- Q31
(31, 'Write', 20), (31, 'Draw', 15), (31, 'Clap', 8), (31, 'Snap', 5), (31, 'Wave', 2),
-- Q32
(32, 'Soccer', 20), (32, 'Basketball', 15), (32, 'Tennis', 8), (32, 'Football', 5), (32, 'Volleyball', 2),
-- Q33
(33, 'Eiffel Tower', 20), (33, 'Great Wall of China', 15), (33, 'Statue of Liberty', 8), (33, 'Pyramids', 5), (33, 'Colosseum', 2),
-- Q34
(34, 'Pop', 20), (34, 'Rock', 15), (34, 'Classical', 8), (34, 'Jazz', 5), (34, 'Country', 2),
-- Q35
(35, 'Harry Potter', 20), (35, 'Batman', 15), (35, 'Superman', 8), (35, 'Spiderman', 5), (35, 'Iron Man', 2),
-- Q36
(36, 'Keys', 20), (36, 'Phone', 15), (36, 'Wallet', 8), (36, 'Coins', 5), (36, 'Pen', 2),
-- Q37
(37, 'Milk chocolate', 20), (37, 'Dark chocolate', 15), (37, 'White chocolate', 8), (37, 'Peanut butter chocolate', 5), (37, 'Mint chocolate', 2),
-- Q38
(38, 'Parrot', 20), (38, 'Canary', 15), (38, 'Cockatoo', 8), (38, 'Budgie', 5), (38, 'Lovebird', 2),
-- Q39
(39, 'Bread', 20), (39, 'Milk', 15), (39, 'Eggs', 8), (39, 'Butter', 5), (39, 'Cheese', 2),
-- Q40
(40, 'Party hats', 20), (40, 'Cake', 15), (40, 'Balloons', 8), (40, 'Games', 5), (40, 'Decorations', 2);

-- ROUND 3
INSERT INTO questions (round, question) VALUES
(3, 'Name a famous historical figure from ancient Egypt'),          -- ID 41
(3, 'Name a type of rock or mineral'),                             -- ID 42
(3, 'Name an Olympic sport that requires a horse'),                -- ID 43
(3, 'Name a country with a large desert region'),                   -- ID 44
(3, 'Name an important event during the American Civil War'),      -- ID 45
(3, 'Name a rare disease or condition'),                           -- ID 46
(3, 'Name a popular painting from the Renaissance period'),        -- ID 47
(3, 'Name a philosopher from ancient Greece'),                     -- ID 48
(3, 'Name a mathematical constant'),                               -- ID 49
(3, 'Name an element on the periodic table'),                      -- ID 50
(3, 'Name a scientific theory related to the origin of life'),      -- ID 51
(3, 'Name an inventor from the Industrial Revolution'),            -- ID 52
(3, 'Name a famous classical composer'),                           -- ID 53
(3, 'Name a country where the official language is French'),       -- ID 54
(3, 'Name a famous battle from World War I or II'),                -- ID 55
(3, 'Name a genre of music that originated in the 20th century'),  -- ID 56
(3, 'Name a famous novel written by Jane Austen'),                 -- ID 57
(3, 'Name a famous astronomer or astrophysicist'),                 -- ID 58
(3, 'Name a prominent physicist from the 20th century'),           -- ID 59
(3, 'Name a country that has hosted the Summer Olympics');         -- ID 60

-- ROUND 3 Answers
INSERT INTO answers (question_id, answer, points) VALUES
-- Q41
(41, 'Cleopatra', 20), (41, 'Tutankhamun', 15), (41, 'Ramses II', 8), (41, 'Nefertiti', 5), (41, 'Hatshepsut', 2),
-- Q42
(42, 'Diamond', 20), (42, 'Gold', 15), (42, 'Emerald', 8), (42, 'Ruby', 5), (42, 'Sapphire', 2),
-- Q43
(43, 'Equestrian eventing', 20), (43, 'Show jumping', 15), (43, 'Dressage', 8), (43, 'Polo', 5), (43, 'Tent pegging', 2),
-- Q44
(44, 'Australia', 20), (44, 'Sahara Desert (Algeria)', 15), (44, 'Saudi Arabia', 8), (44, 'Egypt', 5), (44, 'Mexico', 2),
-- Q45
(45, 'Battle of Gettysburg', 20), (45, 'Emancipation Proclamation', 15), (45, 'Battle of Antietam', 8), (45, 'Abraham Lincoln’s assassination', 5), (45, 'Siege of Vicksburg', 2),
-- Q46
(46, 'Ebola', 20), (46, 'Huntington’s disease', 15), (46, 'Cystic fibrosis', 8), (46, 'Progeria', 5), (46, 'Parkinson’s disease', 2),
-- Q47
(47, 'The Last Supper', 20), (47, 'Mona Lisa', 15), (47, 'School of Athens', 8), (47, 'Creation of Adam', 5), (47, 'Birth of Venus', 2),
-- Q48
(48, 'Socrates', 20), (48, 'Plato', 15), (48, 'Aristotle', 8), (48, 'Epicurus', 5), (48, 'Pythagoras', 2),
-- Q49
(49, 'Pi', 20), (49, 'Euler’s number (e)', 15), (49, 'Golden ratio', 8), (49, 'Square root of 2', 5), (49, 'Infinity', 2),
-- Q50
(50, 'Oxygen', 20), (50, 'Carbon', 15), (50, 'Hydrogen', 8), (50, 'Nitrogen', 5), (50, 'Helium', 2),
-- Q51
(51, 'Theory of Evolution', 20), (51, 'Big Bang Theory', 15), (51, 'Germ Theory', 8), (51, 'Quantum Theory', 5), (51, 'Relativity Theory', 2),
-- Q52
(52, 'James Watt', 20), (52, 'George Stephenson', 15), (52, 'Richard Trevithick', 8), (52, 'Isambard Kingdom Brunel', 5), (52, 'Henry Ford', 2),
-- Q53
(53, 'Beethoven', 20), (53, 'Mozart', 15), (53, 'Bach', 8), (53, 'Chopin', 5), (53, 'Tchaikovsky', 2),
-- Q54
(54, 'France', 20), (54, 'Belgium', 15), (54, 'Canada', 8), (54, 'Switzerland', 5), (54, 'Luxembourg', 2),
-- Q55
(55, 'D-Day', 20), (55, 'Battle of Stalingrad', 15), (55, 'Battle of the Bulge', 8), (55, 'Pearl Harbor', 5), (55, 'Battle of Midway', 2),
-- Q56
(56, 'Jazz', 20), (56, 'Blues', 15), (56, 'Rock and Roll', 8), (56, 'Hip-hop', 5), (56, 'Reggae', 2),
-- Q57
(57, 'Pride and Prejudice', 20), (57, 'Sense and Sensibility', 15), (57, 'Emma', 8), (57, 'Mansfield Park', 5), (57, 'Northanger Abbey', 2),
-- Q58
(58, 'Galileo Galilei', 20), (58, 'Carl Sagan', 15), (58, 'Neil deGrasse Tyson', 8), (58, 'Stephen Hawking', 5), (58, 'Edwin Hubble', 2),
-- Q59
(59, 'Albert Einstein', 20), (59, 'Marie Curie', 15), (59, 'Niels Bohr', 8), (59, 'Richard Feynman', 5), (59, 'Enrico Fermi', 2),
-- Q60
(60, 'China', 20), (60, 'United States', 15), (60, 'Germany', 8), (60, 'Russia', 5), (60, 'Brazil', 2);

