import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWatchShow } from '@/composables/useWatchShow';

describe('useWatchShow', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open');
  });

  it('opens the network official site if it exists', () => {
    const { watchShow } = useWatchShow();
    const mockShow = {
      network: { officialSite: 'https://www.hbo.com/succession' }
    };
    watchShow(mockShow);
    expect(window.open).toHaveBeenCalledWith('https://www.hbo.com/succession', '_blank');
  });

  it('falls back to show official site if network site is missing', () => {
    const { watchShow } = useWatchShow();
    const mockShow = {
      network: null,
      officialSite: 'https://www.netflix.com/title/80057281'
    };
    watchShow(mockShow);
    expect(window.open).toHaveBeenCalledWith('https://www.netflix.com/title/80057281', '_blank');
  });
});
