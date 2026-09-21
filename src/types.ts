export interface Monument {
  id: string;
  name: string;
  kannadaName: string;
  shortHistory: string;
  kannadaHistory: string;
  architecturalStyle: string;
  kannadaStyle: string;
  didYouKnow: string;
  kannadaDidYouKnow: string;
  century: string;
  dynasty: string;
  location: string;
  district: string;
  lat: number;
  lng: number;
  image: string;
  sampleImages: string[];
  audioBlurbEn: string;
  audioBlurbKn: string;
  recommendedVisitTime: string;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  nearbyIds: string[];
  highlights: string[];
  asiProtectedId: string;
}

export interface ClassificationPrediction {
  monument: Monument;
  confidence: number;
}

export interface ClassificationResult {
  top1: ClassificationPrediction;
  top3: ClassificationPrediction[];
  isLowConfidence: boolean;
  inferenceTimeMs: number;
  backbone: 'MobileNetV2' | 'EfficientNet-B0';
  timestamp: string;
  extractedFeaturesCount?: number;
}

export interface DamageScanResult {
  id: string;
  timestamp: string;
  title: string;
  stoneType: string;
  condition: 'intact' | 'cracked' | 'eroded';
  severity: 'Low' | 'Medium' | 'High';
  affectedAreaPercent: number;
  rawImageUrl: string;
  heatmapOverlayUrl: string;
  asiRecommendation: string;
  suggestedIntervention: string;
  urgencyWindow: string;
  technicalNotes: string[];
}

export interface VisitTimingSlot {
  hour: number;
  timeLabel: string;
  crowdDensity: number; // 0-100
  movingAvgDensity: number; // smoothed
  temperatureC: number;
  recommendationLevel: 'Optimal' | 'Fair' | 'Peak Crowded';
  lightConditions: string;
}

export interface MonumentVisitPlan {
  monumentId: string;
  hourlySlots: VisitTimingSlot[];
  bestWindow: string;
  recommendedAction: string;
  crowdIndexNow: number;
  sandstoneHeatLevel: 'Cool' | 'Warm' | 'Extreme Heat';
}

export type NavigationTab = 
  | 'home' 
  | 'monuments' 
  | 'damage-scan' 
  | 'visit-planner' 
  | 'circuit-map'
  | 'ai-guide'
  | 'pitch-deck';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedQuestions?: string[];
  relatedMonumentId?: string;
}
