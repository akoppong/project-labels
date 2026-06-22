import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from '@jest/globals';
import { JsonLd } from './json-ld';

afterEach(cleanup);

function getScriptContent(): string {
  const el = document.querySelector('script[type="application/ld+json"]');
  if (!el) throw new Error('No JSON-LD script tag found');
  return el.innerHTML;
}

describe('JsonLd', () => {
  it('renders a script tag with type application/ld+json', () => {
    render(<JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite' }} />);
    expect(document.querySelector('script[type="application/ld+json"]')).not.toBeNull();
  });

  it('serializes the data object as valid JSON', () => {
    const data = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'CSV to Labels' };
    render(<JsonLd data={data} />);
    expect(JSON.parse(getScriptContent())).toEqual(data);
  });

  it('escapes < and > so a </script> sequence cannot break out of the tag', () => {
    render(<JsonLd data={{ value: '</script><script>alert(1)</script>' }} />);
    const raw = getScriptContent();
    expect(raw).not.toContain('</script>');
    expect(JSON.parse(raw)).toEqual({ value: '</script><script>alert(1)</script>' });
  });

  it('escapes & characters', () => {
    render(<JsonLd data={{ value: 'foo & bar' }} />);
    const raw = getScriptContent();
    expect(raw).not.toContain(' & ');
    expect(JSON.parse(raw)).toEqual({ value: 'foo & bar' });
  });
});
