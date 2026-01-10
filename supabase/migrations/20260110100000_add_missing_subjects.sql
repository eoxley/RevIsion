-- Add missing subjects that are in the UI but not in the database

INSERT INTO public.subjects (code, name, display_name, category, is_compulsory, typical_paper_count) VALUES
  ('DRAMA', 'Drama', 'Drama', 'arts', false, 2),
  ('DT', 'Design and Technology', 'Design & Technology', 'other', false, 2),
  ('FOOD_TECH', 'Food Preparation and Nutrition', 'Food Technology', 'other', false, 2)
ON CONFLICT (code) DO NOTHING;
