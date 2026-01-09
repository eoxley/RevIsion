-- RevIsion VARK Questions Seed Data
-- Extended questionnaire with 32 questions (8 per category)

-- Category 1: Learning Preferences (Questions 1-8)
INSERT INTO public.questions (question_number, question_text, scenario, category) VALUES
(1, 'When learning something new, you prefer to:', 'You are starting a new hobby or skill.', 'learning_preferences'),
(2, 'You remember things best when you:', NULL, 'learning_preferences'),
(3, 'When someone gives you directions, you prefer:', NULL, 'learning_preferences'),
(4, 'When buying a new phone, you would:', NULL, 'learning_preferences'),
(5, 'To learn how a computer program works, you would:', NULL, 'learning_preferences'),
(6, 'When assembling furniture, you prefer:', NULL, 'learning_preferences'),
(7, 'When learning a new language, you find it easiest to:', NULL, 'learning_preferences'),
(8, 'When understanding a complex topic, you prefer:', NULL, 'learning_preferences');

-- Category 2: Study Habits (Questions 9-16)
INSERT INTO public.questions (question_number, question_text, scenario, category) VALUES
(9, 'When preparing for an exam, you typically:', 'You have a major test coming up next week.', 'study_habits'),
(10, 'Your ideal study environment is:', NULL, 'study_habits'),
(11, 'When you need to memorize information, you:', NULL, 'study_habits'),
(12, 'During long study sessions, you:', NULL, 'study_habits'),
(13, 'When reviewing notes, you prefer to:', NULL, 'study_habits'),
(14, 'You find it easiest to concentrate when:', NULL, 'study_habits'),
(15, 'When studying a textbook chapter, you:', NULL, 'study_habits'),
(16, 'To stay focused while studying, you:', NULL, 'study_habits');

-- Category 3: Communication (Questions 17-24)
INSERT INTO public.questions (question_number, question_text, scenario, category) VALUES
(17, 'When explaining something to a friend, you:', 'A friend asks you to explain a concept you understand well.', 'communication'),
(18, 'In a group discussion, you prefer to:', NULL, 'communication'),
(19, 'When presenting information, you like to use:', NULL, 'communication'),
(20, 'When someone is explaining something, you:', NULL, 'communication'),
(21, 'To share your ideas effectively, you:', NULL, 'communication'),
(22, 'When collaborating on a project, you prefer to:', NULL, 'communication'),
(23, 'When giving feedback to others, you tend to:', NULL, 'communication'),
(24, 'In meetings or classes, you are most engaged when:', NULL, 'communication');

-- Category 4: Problem Solving (Questions 25-32)
INSERT INTO public.questions (question_number, question_text, scenario, category) VALUES
(25, 'When facing a new problem, you typically:', 'You encounter a challenging problem that needs solving.', 'problem_solving'),
(26, 'To understand how something works, you:', NULL, 'problem_solving'),
(27, 'When making a decision, you prefer to:', NULL, 'problem_solving'),
(28, 'When troubleshooting an issue, you:', NULL, 'problem_solving'),
(29, 'To solve a math problem, you prefer to:', NULL, 'problem_solving'),
(30, 'When planning a project, you:', NULL, 'problem_solving'),
(31, 'When learning from mistakes, you:', NULL, 'problem_solving'),
(32, 'To analyze information, you prefer to:', NULL, 'problem_solving');

-- Question 1 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 1), 'A', 'Watch videos or demonstrations', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 1), 'B', 'Listen to explanations or podcasts', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 1), 'C', 'Read instructions or guides', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 1), 'D', 'Try it out hands-on immediately', 'kinesthetic', 1);

-- Question 2 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 2), 'A', 'See images, diagrams, or charts', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 2), 'B', 'Hear information spoken aloud', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 2), 'C', 'Write them down or read notes', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 2), 'D', 'Associate them with physical activities', 'kinesthetic', 1);

-- Question 3 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 3), 'A', 'A map or visual diagram', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 3), 'B', 'Verbal step-by-step instructions', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 3), 'C', 'Written directions you can follow', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 3), 'D', 'To walk the route yourself first', 'kinesthetic', 1);

-- Question 4 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 4), 'A', 'Look at photos and compare designs', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 4), 'B', 'Ask a friend for their recommendation', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 4), 'C', 'Read reviews and specifications', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 4), 'D', 'Go to a store and try different models', 'kinesthetic', 1);

-- Question 5 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 5), 'A', 'Watch a video tutorial', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 5), 'B', 'Have someone explain it to you', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 5), 'C', 'Read the documentation', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 5), 'D', 'Experiment with the program directly', 'kinesthetic', 1);

-- Question 6 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 6), 'A', 'Follow the picture diagrams', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 6), 'B', 'Have someone talk you through it', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 6), 'C', 'Read the written instructions carefully', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 6), 'D', 'Start putting pieces together to figure it out', 'kinesthetic', 1);

-- Question 7 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 7), 'A', 'Use flashcards with images', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 7), 'B', 'Listen to native speakers and repeat', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 7), 'C', 'Study vocabulary lists and grammar rules', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 7), 'D', 'Practice through immersive conversations', 'kinesthetic', 1);

-- Question 8 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 8), 'A', 'See diagrams, flowcharts, or mind maps', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 8), 'B', 'Discuss it with others or listen to lectures', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 8), 'C', 'Read detailed explanations and take notes', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 8), 'D', 'Work through examples and practice problems', 'kinesthetic', 1);

-- Question 9 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 9), 'A', 'Create visual summaries or diagrams', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 9), 'B', 'Join study groups or explain concepts aloud', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 9), 'C', 'Rewrite and organize your notes', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 9), 'D', 'Practice with past papers and exercises', 'kinesthetic', 1);

-- Question 10 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 10), 'A', 'A quiet space with good lighting and visual aids', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 10), 'B', 'Somewhere you can talk things through or play background audio', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 10), 'C', 'A desk with books, notebooks, and pens', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 10), 'D', 'A flexible space where you can move around', 'kinesthetic', 1);

-- Question 11 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 11), 'A', 'Create mental images or use visual mnemonics', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 11), 'B', 'Repeat information out loud or create songs', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 11), 'C', 'Write it down multiple times', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 11), 'D', 'Associate with physical movements or locations', 'kinesthetic', 1);

-- Question 12 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 12), 'A', 'Look at colorful notes and diagrams', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 12), 'B', 'Take breaks to discuss with others', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 12), 'C', 'Alternate between reading and writing', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 12), 'D', 'Take frequent breaks to move around', 'kinesthetic', 1);

-- Question 13 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 13), 'A', 'Use highlighters and color-code information', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 13), 'B', 'Read them aloud or record yourself', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 13), 'C', 'Rewrite them in a more organized format', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 13), 'D', 'Walk around while reviewing them', 'kinesthetic', 1);

-- Question 14 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 14), 'A', 'Looking at organized, visual materials', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 14), 'B', 'Listening to explanations or discussions', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 14), 'C', 'Reading and writing in silence', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 14), 'D', 'Doing something active with the material', 'kinesthetic', 1);

-- Question 15 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 15), 'A', 'Focus on charts, graphs, and illustrations', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 15), 'B', 'Read aloud or discuss key points', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 15), 'C', 'Take detailed written notes', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 15), 'D', 'Work through practical examples', 'kinesthetic', 1);

-- Question 16 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 16), 'A', 'Use visual timers and organized layouts', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 16), 'B', 'Play instrumental music or white noise', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 16), 'C', 'Make lists and check off completed items', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 16), 'D', 'Use a fidget tool or take activity breaks', 'kinesthetic', 1);

-- Question 17 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 17), 'A', 'Draw a diagram or show pictures', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 17), 'B', 'Explain it verbally in detail', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 17), 'C', 'Write out the explanation', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 17), 'D', 'Demonstrate it physically', 'kinesthetic', 1);

-- Question 18 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 18), 'A', 'Use a whiteboard to illustrate points', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 18), 'B', 'Participate actively in conversation', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 18), 'C', 'Take notes and share written summaries', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 18), 'D', 'Stand up and use gestures while talking', 'kinesthetic', 1);

-- Question 19 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 19), 'A', 'Slides with images, charts, and graphics', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 19), 'B', 'Stories and verbal explanations', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 19), 'C', 'Handouts with detailed text', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 19), 'D', 'Interactive demonstrations', 'kinesthetic', 1);

-- Question 20 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 20), 'A', 'Watch for visual cues and expressions', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 20), 'B', 'Listen carefully and ask questions', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 20), 'C', 'Take detailed notes', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 20), 'D', 'Nod and use hand gestures to stay engaged', 'kinesthetic', 1);

-- Question 21 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 21), 'A', 'Create visual presentations or infographics', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 21), 'B', 'Give a verbal pitch or presentation', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 21), 'C', 'Write a detailed report or document', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 21), 'D', 'Build a prototype or demonstration', 'kinesthetic', 1);

-- Question 22 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 22), 'A', 'Work on visual aspects like design and layout', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 22), 'B', 'Have regular discussions and brainstorming', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 22), 'C', 'Write documentation and plans', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 22), 'D', 'Work on hands-on building and testing', 'kinesthetic', 1);

-- Question 23 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 23), 'A', 'Show examples of what you mean', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 23), 'B', 'Explain your thoughts verbally', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 23), 'C', 'Write detailed comments or suggestions', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 23), 'D', 'Demonstrate the correct approach', 'kinesthetic', 1);

-- Question 24 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 24), 'A', 'Visual presentations are being used', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 24), 'B', 'There is active discussion', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 24), 'C', 'Notes and materials are provided', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 24), 'D', 'There are hands-on activities', 'kinesthetic', 1);

-- Question 25 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 25), 'A', 'Visualize the problem and potential solutions', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 25), 'B', 'Talk through the problem with others', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 25), 'C', 'Write out the problem and research solutions', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 25), 'D', 'Try different approaches until one works', 'kinesthetic', 1);

-- Question 26 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 26), 'A', 'Look at diagrams and schematics', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 26), 'B', 'Have someone explain how it works', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 26), 'C', 'Read the manual or instructions', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 26), 'D', 'Take it apart and explore', 'kinesthetic', 1);

-- Question 27 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 27), 'A', 'Create a visual comparison chart', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 27), 'B', 'Discuss options with trusted advisors', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 27), 'C', 'Make a written pros and cons list', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 27), 'D', 'Test out options before deciding', 'kinesthetic', 1);

-- Question 28 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 28), 'A', 'Look for visual error messages or patterns', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 28), 'B', 'Call support or ask someone for help', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 28), 'C', 'Search for written solutions online', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 28), 'D', 'Try various fixes to see what works', 'kinesthetic', 1);

-- Question 29 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 29), 'A', 'Draw diagrams or graphs', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 29), 'B', 'Talk through the steps out loud', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 29), 'C', 'Write out each step methodically', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 29), 'D', 'Use physical objects or manipulatives', 'kinesthetic', 1);

-- Question 30 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 30), 'A', 'Create visual timelines or flowcharts', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 30), 'B', 'Discuss the plan with team members', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 30), 'C', 'Write detailed project documentation', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 30), 'D', 'Start with a prototype or rough draft', 'kinesthetic', 1);

-- Question 31 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 31), 'A', 'Replay the situation visually in your mind', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 31), 'B', 'Discuss what went wrong with others', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 31), 'C', 'Write notes about what to do differently', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 31), 'D', 'Practice the correct approach', 'kinesthetic', 1);

-- Question 32 Options
INSERT INTO public.question_options (question_id, option_label, option_text, learning_style, weight) VALUES
((SELECT id FROM public.questions WHERE question_number = 32), 'A', 'Create graphs, charts, or visual representations', 'visual', 1),
((SELECT id FROM public.questions WHERE question_number = 32), 'B', 'Talk through the data with colleagues', 'auditory', 1),
((SELECT id FROM public.questions WHERE question_number = 32), 'C', 'Write summaries and detailed reports', 'read_write', 1),
((SELECT id FROM public.questions WHERE question_number = 32), 'D', 'Work with real examples and case studies', 'kinesthetic', 1);
