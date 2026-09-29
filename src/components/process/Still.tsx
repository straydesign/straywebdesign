/**
 * One beat of a 3D story, held: the reduced-motion and no-WebGL stand-in.
 * Rendered by scripts/process-3d/stills.mjs, light and dark.
 */
export default function Still({ pose, prefix = 'pose' }: { pose: number; prefix?: 'pose' | 'editor' }) {
  return (
    <figure className="process__still" aria-hidden="true">
      <picture>
        <source srcSet={`/process-3d/stills/${prefix}-${pose}-dark.webp`} media="(prefers-color-scheme: dark)" />
        <img src={`/process-3d/stills/${prefix}-${pose}-light.webp`} alt="" width={1200} height={900} loading="lazy" decoding="async" />
      </picture>
    </figure>
  );
}
