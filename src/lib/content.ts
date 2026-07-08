import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx';
import { generateArticleJsonLd } from '@/lib/json-ld';

export type ResourceType = 'blog';

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

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function getContentDir(): string {
  return path.join(CONTENT_ROOT, 'blog');
}

function parseMdxFile(filePath: string): ResourceMeta {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, '.mdx');
  const stats = readingTime(content);

  return {
    slug,
    type: 'blog',
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
  const dir = getContentDir();
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const metas = files.map((file) => parseMdxFile(path.join(dir, file)));
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

/** Get related blog posts — same tag first, then most recent, excluding the given slug */
export function getRelatedResources(slug: string, tag: string, limit = 3): (Resource & { path: string })[] {
  const sameTag = RESOURCES.filter((r) => r.slug !== slug && r.tag === tag);
  const others = RESOURCES.filter((r) => r.slug !== slug && r.tag !== tag);
  const combined = [...sameTag, ...others].slice(0, limit);
  return combined.map((r) => ({ ...r, path: getResourcePath(r) }));
}

/** Get all unique tags across blog posts */
export function getAllTags(): string[] {
  const tags = new Set(RESOURCES.map((r) => r.tag));
  return [...tags].sort();
}

export function getResourcePath(resource: Pick<Resource, 'slug'>): string {
  return `/resources/blog/${resource.slug}`;
}

/** Full MDX compilation for article pages — returns meta, compiled content, and JSON-LD */
export async function getCompiledArticle(slug: string) {
  const dir = getContentDir();
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const meta: ResourceMeta = {
    slug,
    type: 'blog',
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
