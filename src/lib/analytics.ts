declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(eventName: string, data?: Record<string, unknown>): void {
  if (typeof window !== 'undefined') {
    window.umami?.track(eventName, data);
  }
}
