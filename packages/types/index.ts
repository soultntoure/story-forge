// Shared TypeScript types for StoryForge

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Story {
  id: string;
  title: string;
  description?: string;
  userId: string;
  currentVersion: number;
  status: 'draft' | 'completed' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryVersion {
  id: string;
  storyId: string;
  versionNumber: number;
  content: StoryContent; // Flexible JSONB structure
  createdAt: Date;
}

export interface StoryContent {
  pages: StoryPage[];
  metadata?: StoryMetadata;
}

export interface StoryPage {
  elements: StoryElement[];
  pageNumber: number;
  narration?: string; // AI-generated narrative text for this page
}

export type StoryElement = TextElement | ImageElement | VoiceElement | ChoiceElement | PuzzleElement;

export interface TextElement {
  type: 'text';
  id: string;
  value: string;
  position?: { x: number; y: number };
  style?: Record<string, any>;
}

export interface ImageElement {
  type: 'image';
  id: string;
  url: string;
  caption?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export interface VoiceElement {
  type: 'voice';
  id: string;
  url: string; // URL to voice recording
  transcript?: string;
  position?: { x: number; y: number };
}

export interface ChoiceElement {
  type: 'choice';
  id: string;
  question: string;
  options: { text: string; nextStoryId?: string; nextVersionNumber?: number }[];
  position?: { x: number; y: number };
}

export interface PuzzleElement {
  type: 'puzzle';
  id: string;
  puzzleType: 'jigsaw' | 'riddle' | 'match';
  data: Record<string, any>; // Specific data for the puzzle type
  solution: string;
  position?: { x: number; y: number };
}

export interface StoryMetadata {
  characters?: Character[];
  themes?: string[];
  values?: string[];
  keywords?: string[];
  aiPromptsUsed?: string[];
}

export interface Character {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

// Real-time Collaboration Types
export interface CollaborationEvent {
  type: 'ADD_ELEMENT' | 'UPDATE_ELEMENT' | 'DELETE_ELEMENT' | 'UPDATE_NARRATION';
  payload: any; // Specific payload based on event type
  storyId: string;
  versionId: string;
  userId: string;
  timestamp: number;
}
