import { EDITOR } from './editor-story';
import { PROCESS } from './formations';
import type { Story } from './kit';

/** Every story a 3D stage on the page can play, by the key the section names. */
export type StoryKey = 'process' | 'editor';

export const STORIES: Record<StoryKey, Story> = { process: PROCESS, editor: EDITOR };
