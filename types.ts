
export enum View {
  HOME = 'HOME',
  VOICE_SUPPORT = 'VOICE_SUPPORT',
  TEXT_SUPPORT = 'TEXT_SUPPORT',
  TOOLS = 'TOOLS',
  RESOURCES = 'RESOURCES',
  PROFILE = 'PROFILE',
  COMMUNITY = 'COMMUNITY',
  PRAYER_WALL = 'PRAYER_WALL',
  TWELVE_STEPS = 'TWELVE_STEPS',
  SPONSOR_MATCH = 'SPONSOR_MATCH',
  SPONSOR_CHAT = 'SPONSOR_CHAT',
  TESTIMONIES = 'TESTIMONIES',
  SCRIPTURE_BANK = 'SCRIPTURE_BANK',
  OUTREACH = 'OUTREACH',
  PEER_CONNECT = 'PEER_CONNECT',
  JOURNAL = 'JOURNAL',
  MEETINGS = 'MEETINGS',
  VIDEO_CALL = 'VIDEO_CALL',
  MEETING_ROOM = 'MEETING_ROOM'
}

export type TestimonyCategory = 'Substances' | 'Food' | 'Sex' | 'Sexual Confusion' | 'Other';

export interface Testimony {
  id: string;
  userName: string;
  title: string;
  content: string;
  category: TestimonyCategory;
  praiseCount: number;
  timestamp: number;
}

export interface Sponsor {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarColor: string;
  soberTime: string;
  specialty: string[];
  availability: 'High' | 'Medium' | 'Limited';
  bio: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'other';
  senderName?: string;
  timestamp: number;
}

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  titlePrefix: 'Sister' | 'Brother' | '';
  soberDate: string; // ISO string
  bio: string;
  goals: Goal[];
  journalEntries: JournalEntry[];
  remindersEnabled: boolean;
  faithMode: boolean;
  avatarColor: string;
  avatarUrl?: string;
  isSponsor: boolean;
  assignedSponsorId?: string;
  pendingSponsorId?: string;
}

export interface Resource {
  title: string;
  description: string;
  phone: string;
  url: string;
}

export interface GroundingExercise {
  title: string;
  steps: string[];
}
