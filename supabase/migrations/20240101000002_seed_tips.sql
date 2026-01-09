-- RevIsion Study Tips Seed Data

-- Visual Learning Tips
INSERT INTO public.study_tips (learning_style, category, tip_title, tip_description, priority) VALUES
('visual', 'Note-taking', 'Use Color Coding', 'Assign different colors to different topics or concepts. Use highlighters, colored pens, or digital tools to make your notes visually organized.', 1),
('visual', 'Note-taking', 'Create Mind Maps', 'Draw mind maps to show relationships between concepts. Start with a central idea and branch out with related topics.', 2),
('visual', 'Studying', 'Watch Educational Videos', 'Use YouTube, Khan Academy, or course videos. Pause to sketch key concepts as you watch.', 1),
('visual', 'Studying', 'Use Flashcards with Images', 'Create flashcards that include diagrams, symbols, or pictures alongside text.', 2),
('visual', 'Exam Prep', 'Visualize Your Notes', 'Before an exam, close your eyes and try to picture your notes. Recall the layout, colors, and diagrams.', 1),
('visual', 'Exam Prep', 'Draw Concept Maps', 'Create a visual summary of all topics on one page. Use arrows to show connections.', 2);

-- Auditory Learning Tips
INSERT INTO public.study_tips (learning_style, category, tip_title, tip_description, priority) VALUES
('auditory', 'Note-taking', 'Record Lectures', 'Use your phone or a recorder to capture lectures. Listen back while commuting or exercising.', 1),
('auditory', 'Note-taking', 'Talk Through Your Notes', 'After class, explain your notes out loud to yourself or a study partner.', 2),
('auditory', 'Studying', 'Join Study Groups', 'Discuss topics with classmates. Teaching others helps reinforce your own understanding.', 1),
('auditory', 'Studying', 'Use Podcasts and Audiobooks', 'Find educational podcasts related to your subjects. Listen during downtime.', 2),
('auditory', 'Exam Prep', 'Create Audio Summaries', 'Record yourself explaining key concepts. Listen to these recordings before the exam.', 1),
('auditory', 'Exam Prep', 'Use Verbal Mnemonics', 'Create rhymes, songs, or acronyms to remember information. Say them out loud.', 2);

-- Read/Write Learning Tips
INSERT INTO public.study_tips (learning_style, category, tip_title, tip_description, priority) VALUES
('read_write', 'Note-taking', 'Write Detailed Notes', 'Take comprehensive written notes during class. Rewrite them after to reinforce learning.', 1),
('read_write', 'Note-taking', 'Summarize in Your Own Words', 'After reading a chapter, write a summary without looking at the text.', 2),
('read_write', 'Studying', 'Read Widely', 'Supplement lectures with textbooks, articles, and online resources. The more you read, the better.', 1),
('read_write', 'Studying', 'Keep a Study Journal', 'Write reflections on what you learned each day. Include questions and insights.', 2),
('read_write', 'Exam Prep', 'Write Practice Essays', 'For essay exams, practice writing full responses under timed conditions.', 1),
('read_write', 'Exam Prep', 'Create Written Outlines', 'Organize all exam topics into detailed written outlines with key points.', 2);

-- Kinesthetic Learning Tips
INSERT INTO public.study_tips (learning_style, category, tip_title, tip_description, priority) VALUES
('kinesthetic', 'Note-taking', 'Write by Hand', 'Use pen and paper instead of typing. The physical act of writing aids memory.', 1),
('kinesthetic', 'Note-taking', 'Use Sticky Notes', 'Write key concepts on sticky notes and arrange them physically on a wall or desk.', 2),
('kinesthetic', 'Studying', 'Take Frequent Breaks', 'Study in short bursts (25-30 minutes) with movement breaks. Walk, stretch, or exercise.', 1),
('kinesthetic', 'Studying', 'Use Physical Objects', 'When possible, use models, props, or real objects to understand concepts.', 2),
('kinesthetic', 'Exam Prep', 'Practice with Past Papers', 'Work through as many practice problems and past exams as possible.', 1),
('kinesthetic', 'Exam Prep', 'Walk While Reviewing', 'Review notes while walking or pacing. Movement helps kinesthetic learners retain information.', 2);
