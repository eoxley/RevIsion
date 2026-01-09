// VARK Scoring Algorithm

export interface VARKScores {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
}

export interface ScoringResult {
  rawScores: VARKScores;
  percentages: VARKScores;
  primaryStyles: string[];
  isMultimodal: boolean;
}

interface QuestionOption {
  id: string;
  learning_style: string;
  weight: number;
}

interface Response {
  selected_options: string[];
  question_id: string;
}

// Threshold for determining if a style is primary (85% of highest)
const MULTIMODAL_THRESHOLD = 0.85;

export function calculateVARKScores(
  responses: Response[],
  optionsMap: Map<string, QuestionOption>
): ScoringResult {
  const rawScores: VARKScores = {
    visual: 0,
    auditory: 0,
    readWrite: 0,
    kinesthetic: 0,
  };

  // Calculate raw scores from responses
  for (const response of responses) {
    for (const optionId of response.selected_options) {
      const option = optionsMap.get(optionId);
      if (!option) continue;

      const weight = option.weight || 1;
      switch (option.learning_style) {
        case "visual":
          rawScores.visual += weight;
          break;
        case "auditory":
          rawScores.auditory += weight;
          break;
        case "read_write":
          rawScores.readWrite += weight;
          break;
        case "kinesthetic":
          rawScores.kinesthetic += weight;
          break;
      }
    }
  }

  // Calculate total and percentages
  const total =
    rawScores.visual +
    rawScores.auditory +
    rawScores.readWrite +
    rawScores.kinesthetic;

  const percentages: VARKScores = {
    visual: total > 0 ? Math.round((rawScores.visual / total) * 100) : 0,
    auditory: total > 0 ? Math.round((rawScores.auditory / total) * 100) : 0,
    readWrite: total > 0 ? Math.round((rawScores.readWrite / total) * 100) : 0,
    kinesthetic: total > 0 ? Math.round((rawScores.kinesthetic / total) * 100) : 0,
  };

  // Determine primary styles
  const { primaryStyles, isMultimodal } = determinePrimaryStyles(rawScores);

  return {
    rawScores,
    percentages,
    primaryStyles,
    isMultimodal,
  };
}

function determinePrimaryStyles(scores: VARKScores): {
  primaryStyles: string[];
  isMultimodal: boolean;
} {
  const styleEntries: [string, number][] = [
    ["visual", scores.visual],
    ["auditory", scores.auditory],
    ["read_write", scores.readWrite],
    ["kinesthetic", scores.kinesthetic],
  ];

  // Sort by score descending
  styleEntries.sort((a, b) => b[1] - a[1]);

  const highestScore = styleEntries[0][1];
  if (highestScore === 0) {
    return { primaryStyles: [], isMultimodal: false };
  }

  const threshold = highestScore * MULTIMODAL_THRESHOLD;

  // Find all styles that meet the threshold
  const primaryStyles = styleEntries
    .filter(([, score]) => score >= threshold)
    .map(([style]) => style);

  return {
    primaryStyles,
    isMultimodal: primaryStyles.length > 1,
  };
}

export function getStyleColor(style: string): string {
  const colors: Record<string, string> = {
    visual: "#3b82f6", // blue-500
    auditory: "#22c55e", // green-500
    read_write: "#eab308", // yellow-500
    kinesthetic: "#ef4444", // red-500
  };
  return colors[style] || "#94a3b8";
}

export function getStyleLabel(style: string): string {
  const labels: Record<string, string> = {
    visual: "Visual",
    auditory: "Auditory",
    read_write: "Read/Write",
    kinesthetic: "Kinesthetic",
  };
  return labels[style] || style;
}
