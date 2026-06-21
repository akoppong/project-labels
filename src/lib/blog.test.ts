import { afterEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'node:fs';
import { getAllPostSlugs, getAllPublishedPosts, getPost } from './blog';

afterEach(() => {
  jest.restoreAllMocks();
});

// Minimal MDX fixtures for edge-case tests that don't need a real file.
const DRAFT_MDX = `---
title: Draft Post
slug: draft-post
description: A draft
publishedAt: 2026-06-01
updatedAt: 2026-06-01
keyword: draft
intent: informational
draft: true
---
Draft content`;

const PUBLISHED_WITH_TAGS_MDX = `---
title: Published Post
slug: test-post
description: A published post
publishedAt: 2026-06-01
updatedAt: 2026-06-01
keyword: test
intent: informational
tags:
  - barcode
  - csv
draft: false
---
# Content`;

const PUBLISHED_NO_TAGS_MDX = `---
title: No Tags Post
slug: no-tags
description: Post without tags field
publishedAt: 2026-06-01
updatedAt: 2026-06-01
keyword: notags
intent: informational
draft: false
---
Content`;

describe('getPost', () => {
  it('returns null when the MDX file does not exist', () => {
    expect(getPost('this-slug-does-not-exist-xyz')).toBeNull();
  });

  it('returns a parsed post for a real content file', () => {
    const post = getPost('bulk-barcode-generator-from-spreadsheet');
    expect(post).not.toBeNull();
    expect(post?.title).toBeTruthy();
    expect(typeof post?.contentHtml).toBe('string');
    expect(Array.isArray(post?.tags)).toBe(true);
  });

  it('returns null for a draft post', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => DRAFT_MDX);
    expect(getPost('draft-post')).toBeNull();
  });

  it('defaults tags to empty array when the frontmatter tags field is absent', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => PUBLISHED_NO_TAGS_MDX);
    const post = getPost('no-tags');
    expect(post?.tags).toEqual([]);
  });

  it('returns tags as a string array when the field is present', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => PUBLISHED_WITH_TAGS_MDX);
    const post = getPost('test-post');
    expect(post?.tags).toEqual(['barcode', 'csv']);
  });
});

describe('getAllPostSlugs', () => {
  it('returns slugs for all MDX files in the content directory', () => {
    const slugs = getAllPostSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain('bulk-barcode-generator-from-spreadsheet');
  });

  it('returns an empty array when the content directory does not exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(getAllPostSlugs()).toEqual([]);
  });
});

describe('getAllPublishedPosts', () => {
  it('returns all published posts sorted newest-first by publishedAt', () => {
    const posts = getAllPublishedPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].publishedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i].publishedAt).getTime()
      );
    }
  });

  it('excludes draft posts from results', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['draft.mdx'] as unknown as fs.Dirent[]);
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => DRAFT_MDX);
    expect(getAllPublishedPosts()).toEqual([]);
  });
});
