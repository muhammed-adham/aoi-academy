const marks = [];

export function mark(step) {
  marks.push({ step, ms: Math.round(performance.now()) });
}

export function hasMark(prefix) {
  return marks.some((m) => m.step.startsWith(prefix));
}

try {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === 'first-contentful-paint') mark('first contentful paint (browser)');
    });
  }).observe({ type: 'paint', buffered: true });
} catch (error) {

}

export function logSummaryOnLoad(getLanguage) {
  window.addEventListener('load', () =>
    setTimeout(() => {
      mark('window load');
      const navigation = performance.getEntriesByType('navigation')[0];
      const rows = [];
      if (navigation) {
        rows.push({ step: 'server responded (TTFB)', ms: Math.round(navigation.responseStart) });
        rows.push({ step: 'HTML parsed (domInteractive)', ms: Math.round(navigation.domInteractive) });
      }
      marks.forEach((m) => rows.push(m));
      rows.sort((a, b) => a.ms - b.ms);

      const revealed = marks.find((m) => m.step.startsWith('page revealed'));
      console.groupCollapsed(
        `AOI timing: ${location.pathname} | language: ${getLanguage()}` +
          (revealed ? ` | page visible after ${revealed.ms} ms` : '')
      );
      console.table(rows);

      const slowest = performance
        .getEntriesByType('resource')
        .map((r) => ({
          resource: r.name.replace(location.origin, '').slice(0, 70),
          'finished at (ms)': Math.round(r.responseEnd),
          'duration (ms)': Math.round(r.duration),
        }))
        .sort((a, b) => b['duration (ms)'] - a['duration (ms)'])
        .slice(0, 5);
      console.log('Slowest 5 resources:');
      console.table(slowest);
      console.groupEnd();
    }, 0)
  );
}
