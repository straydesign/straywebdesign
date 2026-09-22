#!/usr/bin/env bash
# Regenerate the captures the social cards draw.
#
# The cards render through satori, which decodes PNG and JPEG and hands back a
# blank box for the WebP in public/images/devices/ without raising anything. So
# the same captures get a JPEG twin here, sized for a card rather than a page.
set -euo pipefail
cd "$(dirname "$0")/.."

for slug in andys bullfrog presqueisle seacave; do
  magick "public/images/devices/laptop-$slug.webp" -resize 1440x900 -strip -quality 86 \
    "public/images/social/laptop-$slug.jpg"
  magick "public/images/devices/phone-$slug.webp" -resize 450x883 -strip -quality 88 \
    "public/images/social/phone-$slug.jpg"
  echo "  $slug"
done
