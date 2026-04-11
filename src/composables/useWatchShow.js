export function useWatchShow() {

  const watchShow = (show) => {
    const site = show?.network?.officialSite || show?.officialSite;
    
    if (site) {
      window.open(site, '_blank');
    } else {
      console.warn("No official site found for this show.");
    }
  };

  return { watchShow };
}
