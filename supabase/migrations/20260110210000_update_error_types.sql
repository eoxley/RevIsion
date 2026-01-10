-- Update error types to match GCSE evaluation agent specification
-- Changes from: concept_gap, calculation_error, terminology_confusion, incomplete_answer, off_topic, none
-- To: recall_gap, concept_gap, confusion, exam_technique, guessing, null

-- Drop and recreate the check constraint on evaluation_log
ALTER TABLE public.evaluation_log
DROP CONSTRAINT IF EXISTS evaluation_log_error_type_check;

ALTER TABLE public.evaluation_log
ADD CONSTRAINT evaluation_log_error_type_check
CHECK (error_type IN ('recall_gap', 'concept_gap', 'confusion', 'exam_technique', 'guessing') OR error_type IS NULL);
