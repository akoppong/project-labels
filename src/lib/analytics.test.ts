import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { trackEvent } from './analytics';

describe('trackEvent', () => {
  afterEach(() => {
    delete (window as Window & { umami?: unknown }).umami;
  });

  it('calls umami.track when umami is available', () => {
    const track = jest.fn();
    (window as Window & { umami: { track: typeof track } }).umami = { track };

    trackEvent('csv_uploaded', { source: 'sample' });

    expect(track).toHaveBeenCalledWith('csv_uploaded', { source: 'sample' });
  });

  it('is a no-op when umami is not loaded', () => {
    expect(() => trackEvent('csv_uploaded')).not.toThrow();
  });
});
