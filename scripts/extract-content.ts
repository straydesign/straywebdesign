import { RESOURCES } from '../src/lib/resources';
import * as fs from 'fs';
import * as path from 'path';

const typeToDir: Record<string, string> = {
  blog: 'blog',
  'white-paper': 'white-papers',
  'case-study': 'case-studies',
};

const schemaMap: Record<string, string> = {
  blog: 'BlogPosting',
  'white-paper': 'TechArticle',
  'case-study': 'Article',
};

for (const resource of RESOURCES) {
  const dir = path.join(process.cwd(), 'content', typeToDir[resource.type]);
  fs.mkdirSync(dir, { recursive: true });

  // Escape quotes in title/description for YAML
  const safeTitle = resource.title.replace(/"/g, '\\"');
  const safeDesc = resource.description.replace(/"/g, '\\"');

  const frontmatter = [
    '---',
    `title: "${safeTitle}"`,
    `description: "${safeDesc}"`,
    `date: "${resource.date}"`,
    `tag: "${resource.tag}"`,
    `type: "${resource.type}"`,
    `author: "Tom Sesler"`,
    `schema: "${schemaMap[resource.type]}"`,
    '---',
  ].join('\n');

  const content = `${frontmatter}\n\n${resource.content}\n`;
  const filePath = path.join(dir, `${resource.slug}.mdx`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ ${typeToDir[resource.type]}/${resource.slug}.mdx`);
}

console.log(`\nExtracted ${RESOURCES.length} articles.`);
