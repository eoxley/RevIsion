-- Backfill student_vark_profiles from existing results
-- This ensures all historical VARK data is synced for email compatibility

INSERT INTO public.student_vark_profiles (
  student_id,
  visual_score,
  auditory_score,
  read_write_score,
  kinesthetic_score,
  primary_styles,
  is_multimodal,
  dominant_style,
  visual_strength,
  auditory_strength,
  read_write_strength,
  kinesthetic_strength,
  assessed_at,
  last_recalculated_at
)
SELECT
  r.user_id as student_id,
  r.visual_percentage as visual_score,
  r.auditory_percentage as auditory_score,
  r.read_write_percentage as read_write_score,
  r.kinesthetic_percentage as kinesthetic_score,
  r.primary_styles,
  r.is_multimodal,
  r.primary_styles[1] as dominant_style,
  CASE
    WHEN r.visual_percentage >= 35 THEN 'very_strong'
    WHEN r.visual_percentage >= 25 THEN 'strong'
    WHEN r.visual_percentage >= 15 THEN 'moderate'
    ELSE 'mild'
  END as visual_strength,
  CASE
    WHEN r.auditory_percentage >= 35 THEN 'very_strong'
    WHEN r.auditory_percentage >= 25 THEN 'strong'
    WHEN r.auditory_percentage >= 15 THEN 'moderate'
    ELSE 'mild'
  END as auditory_strength,
  CASE
    WHEN r.read_write_percentage >= 35 THEN 'very_strong'
    WHEN r.read_write_percentage >= 25 THEN 'strong'
    WHEN r.read_write_percentage >= 15 THEN 'moderate'
    ELSE 'mild'
  END as read_write_strength,
  CASE
    WHEN r.kinesthetic_percentage >= 35 THEN 'very_strong'
    WHEN r.kinesthetic_percentage >= 25 THEN 'strong'
    WHEN r.kinesthetic_percentage >= 15 THEN 'moderate'
    ELSE 'mild'
  END as kinesthetic_strength,
  r.created_at as assessed_at,
  now() as last_recalculated_at
FROM public.results r
WHERE r.user_id IS NOT NULL
ON CONFLICT (student_id) DO UPDATE SET
  visual_score = EXCLUDED.visual_score,
  auditory_score = EXCLUDED.auditory_score,
  read_write_score = EXCLUDED.read_write_score,
  kinesthetic_score = EXCLUDED.kinesthetic_score,
  primary_styles = EXCLUDED.primary_styles,
  is_multimodal = EXCLUDED.is_multimodal,
  dominant_style = EXCLUDED.dominant_style,
  visual_strength = EXCLUDED.visual_strength,
  auditory_strength = EXCLUDED.auditory_strength,
  read_write_strength = EXCLUDED.read_write_strength,
  kinesthetic_strength = EXCLUDED.kinesthetic_strength,
  last_recalculated_at = now();
