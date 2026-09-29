import { PROCESS } from './formations';
import type { Story } from './kit';

/**
 * Every story a 3D stage on the page can play, by the key the section names.
 * One since 2026-09-29: the editor plays inside the process, at step 6.
 */
export type StoryKey = 'process';

export const STORIES: Record<StoryKey, Story> = { process: PROCESS };
