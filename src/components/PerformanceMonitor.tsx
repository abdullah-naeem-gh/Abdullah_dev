import { useEffect, useState } from 'react';

interface PerformanceData {
  fps: number;
  memoryUsage: number;
  renderTime: number;
}

const PerformanceMonitor = () => {
  const [perfData, setPerfData] = useState<PerformanceData>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0
  });
  const [isVisible, setIsVisible] = useState(process.env.NODE_ENV === 'development');

  useEffect(() => {
    if (!isVisible) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        const memoryUsage = (performance as typeof performance & { memory?: { usedJSHeapSize: number } }).memory 
          ? Math.round((performance as typeof performance & { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1024 / 1024)
          : 0;
        const renderTime = Math.round(now - lastTime);

        setPerfData({ fps, memoryUsage, renderTime });
        frameCount = 0;
        lastTime = now;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>FPS: {perfData.fps}</div>
      <div>Memory: {perfData.memoryUsage}MB</div>
      <div>Render: {perfData.renderTime}ms</div>
      <button 
        onClick={() => setIsVisible(false)}
        className="mt-1 text-xs text-gray-400 hover:text-white"
      >
        Hide
      </button>
    </div>
  );
};

export default PerformanceMonitor;
