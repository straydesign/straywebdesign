import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx';
import { generateArticleJsonLd } from '@/lib/json-ld';

export type ResourceType = 'blog' | 'white-paper' | 'case-study';

export interface ResourceMeta {
  slug: string;
  type: ResourceType;
  title: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
  author: string;
  schema: string;
}

/** Backward-compatible shape — used by listing page, sitemap, OG images */
export interface Resource {
  slug: string;
  type: ResourceType;
  title: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
}

const TYPE_TO_DIR: Record<ResourceType, string> = {
  blog: 'blog',
  'white-paper': 'white-papers',
  'case-study': 'case-studies',
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function getContentDir(type: ResourceType): string {
  return path.join(CONTENT_ROOT, TYPE_TO_DIR[type]);
}

function parseMdxFile(filePath: string): ResourceMeta {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, '.mdx');
  const stats = readingTime(content);

  return {
    slug,
    type: data.type as ResourceType,
    title: data.title,
    description: data.description,
    readTime: `${Math.ceil(stats.minutes)} min read`,
    date: data.date,
    tag: data.tag,
    author: data.author ?? 'Tom Sesler',
    schema: data.schema ?? 'BlogPosting',
  };
}

function getAllMeta(): ResourceMeta[] {
  const types: ResourceType[] = ['blog', 'white-paper', 'case-study'];
  const metas: ResourceMeta[] = [];

  for (const type of types) {
    const dir = getContentDir(type);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      metas.push(parseMdxFile(path.join(dir, file)));
    }
  }

  // Sort by date descending (newest first)
  return metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Cached at module level — computed once per build
let _resources: Resource[] | null = null;

/** All resources as backward-compatible Resource objects */
export const RESOURCES: Resource[] = (() => {
  if (_resources) return _resources;
  _resources = getAllMeta().map(({ slug, type, title, description, readTime, date, tag }) => ({
    slug,
    type,
    title,
    description,
    readTime,
    date,
    tag,
  }));
  return _resources;
})();

export function getResourcesByType(type: ResourceType): Resource[] {
  return RESOURCES.filter((r) => r.type === type);
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

/** Get resources matching a specific tag */
export function getResourcesByTag(tag: string, limit?: number): Resource[] {
  const filtered = RESOURCES.filter((r) => r.tag === tag);
  return limit ? filtered.slice(0, limit) : filtered;
}

/** Get related resources — same tag first, then most recent, excluding the given slug */
export function getRelatedResources(slug: string, tag: string, limit = 3): (Resource & { path: string })[] {
  const sameTag = RESOURCES.filter((r) => r.slug !== slug && r.tag === tag);
  const others = RESOURCES.filter((r) => r.slug !== slug && r.tag !== tag);
  const combined = [...sameTag, ...others].slice(0, limit);
  return combined.map((r) => ({ ...r, path: getResourcePath(r) }));
}

/** Get all unique tags across resources */
export function getAllTags(): string[] {
  const tags = new Set(RESOURCES.map((r) => r.tag));
  return [...tags].sort();
}

export function getResourcePath(resource: Pick<Resource, 'type' | 'slug'>): string {
  return `/resources/${TYPE_TO_DIR[resource.type]}/${resource.slug}`;
}

/** Full MDX compilation for article pages — returns meta, compiled content, and JSON-LD */
export async function getCompiledArticle(type: ResourceType, slug: string) {
  const dir = getContentDir(type);
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const meta: ResourceMeta = {
    slug,
    type: data.type as ResourceType,
    title: data.title,
    description: data.description,
    readTime: `${Math.ceil(stats.minutes)} min read`,
    date: data.date,
    tag: data.tag,
    author: data.author ?? 'Tom Sesler',
    schema: data.schema ?? 'BlogPosting',
  };

  const { content: compiledContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  const jsonLd = generateArticleJsonLd(meta);

  return { meta, content: compiledContent, jsonLd };
}
