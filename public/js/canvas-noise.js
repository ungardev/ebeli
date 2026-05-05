/**
 * Ébeli Canvas Noise Background
 * Subtle warm gradient noise effect inspired by monopo.vn
 * Vanilla JS implementation - no dependencies
 */

(function () {
  'use strict';

  console.log('[CanvasNoise] Initializing...');

  // Configuration
  const CONFIG = {
    // Colors - warm blend for Ébeli (warm white to amber to soft coral)
    colors: [
      { r: 255, g: 250, b: 240 }, // #FFFAF0 warm white
      { r: 255, g: 172, b: 46 }, // #FFAC2E warm amber
      { r: 165, g: 45, b: 37 }, // #A52D25 soft coral
    ],
    // Opacity for the gradient blobs
    opacity: 0.4,
    // Animation speed (lower = slower)
    speed: 0.001,
    // Blob size (higher = larger blobs)
    size: 1.8,
    // Number of gradient blobs
    blobCount: 7,
    // Whether to use simplex noise (more organic) or simple noise
    useSimplex: true,
  };

  // State
  let canvas, ctx;
  let width, height;
  let time = 0;
  let animationId;
  let isVisible = true;

  // Simplex noise implementation (simplified)
  const SimplexNoise = (function () {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;

    const grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];

    const p = [];
    for (let i = 0; i < 256; i++) {
      p[i] = Math.floor(Math.random() * 256);
    }

    const perm = [];
    for (let i = 0; i < 512; i++) {
      perm[i] = p[i & 255];
    }

    function dot2(g, x, y) {
      return g[0] * x + g[1] * y;
    }

    return function (xin, yin) {
      let n0, n1, n2;
      const s = (xin + yin) * F2;
      const i = Math.floor(xin + s);
      const j = Math.floor(yin + s);
      const t = (i + j) * G2;
      const X0 = i - t;
      const Y0 = j - t;
      const x0 = xin - X0;
      const y0 = yin - Y0;
      let i1, j1;
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } else {
        i1 = 0;
        j1 = 1;
      }
      const x1 = x0 - i1 + G2;
      const y1 = y0 - j1 + G2;
      const x2 = x0 - 1 + 2 * G2;
      const y2 = y0 - 1 + 2 * G2;
      const ii = i & 255;
      const jj = j & 255;
      const gi0 = perm[ii + perm[jj]] % 12;
      const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
      const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
      let t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 < 0) n0 = 0;
      else {
        t0 *= t0;
        n0 = t0 * t0 * dot2(grad3[gi0], x0, y0);
      }
      let t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 < 0) n1 = 0;
      else {
        t1 *= t1;
        n1 = t1 * t1 * dot2(grad3[gi1], x1, y1);
      }
      let t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 < 0) n2 = 0;
      else {
        t2 *= t2;
        n2 = t2 * t2 * dot2(grad3[gi2], x2, y2);
      }
      return 70 * (n0 + n1 + n2);
    };
  })();

  // Blob class for gradient orbs
  class Blob {
    constructor(index) {
      this.index = index;
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseRadius =
        (Math.min(width, height) * 0.3 +
          Math.random() * Math.min(width, height) * 0.4) *
        CONFIG.size;
      this.radius = this.baseRadius;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.colorIndex = Math.floor(Math.random() * CONFIG.colors.length);
      this.noiseOffsetX = Math.random() * 1000;
      this.noiseOffsetY = Math.random() * 1000;
      this.noiseOffsetR = Math.random() * 1000;
    }

    update(dt) {
      // Use noise to create organic movement
      const noiseX = SimplexNoise(
        this.x * 0.001 + this.noiseOffsetX,
        time * CONFIG.speed
      );
      const noiseY = SimplexNoise(
        this.y * 0.001 + this.noiseOffsetY,
        time * CONFIG.speed
      );

      this.x += noiseX * 1.5 + this.vx;
      this.y += noiseY * 1.5 + this.vy;

      // Pulse radius
      const noiseR = SimplexNoise(
        this.index + this.noiseOffsetR,
        time * CONFIG.speed * 0.5
      );
      this.radius = this.baseRadius * (0.9 + noiseR * 0.2);

      // Wrap around edges
      if (this.x < -this.radius) this.x = width + this.radius;
      if (this.x > width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = height + this.radius;
      if (this.y > height + this.radius) this.y = -this.radius;
    }

    draw(ctx) {
      const color = CONFIG.colors[this.colorIndex];
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius
      );

      gradient.addColorStop(
        0,
        `rgba(${color.r}, ${color.g}, ${color.b}, ${CONFIG.opacity})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(${color.r}, ${color.g}, ${color.b}, ${CONFIG.opacity * 0.5})`
      );
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize blobs
  let blobs = [];

  function initBlobs() {
    blobs = [];
    for (let i = 0; i < CONFIG.blobCount; i++) {
      blobs.push(new Blob(i));
    }
  }

  // Create or get canvas
  function createCanvas() {
    console.log('[CanvasNoise] Creating canvas...');
    let existingCanvas = document.getElementById('ebeli-canvas-bg');
    if (existingCanvas) {
      console.log('[CanvasNoise] Canvas already exists, using it');
      canvas = existingCanvas;
    } else {
      console.log('[CanvasNoise] Creating new canvas element');
      canvas = document.createElement('canvas');
      canvas.id = 'ebeli-canvas-bg';
      canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 1s ease;
      `;
      document.body.appendChild(canvas);
      console.log('[CanvasNoise] Canvas appended to body');
    }
    ctx = canvas.getContext('2d');
    console.log('[CanvasNoise] Canvas context:', ctx ? 'OK' : 'FAILED');
  }

  // Resize handler
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initBlobs();
  }

  // Animation loop
  let lastTime = 0;
  function animate(currentTime) {
    if (!isVisible) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    const dt = currentTime - lastTime;
    lastTime = currentTime;
    time += dt;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw blobs
    for (const blob of blobs) {
      blob.update(dt);
      blob.draw(ctx);
    }

    animationId = requestAnimationFrame(animate);
  }

  // Show canvas with fade
  function showCanvas() {
    if (canvas && canvas.style.opacity !== '1') {
      canvas.style.opacity = '1';
    }
  }

  // Visibility handling
  function handleVisibility() {
    if (document.hidden) {
      isVisible = false;
    } else {
      isVisible = true;
      lastTime = performance.now();
    }
  }

  // Public API
  window.EbeliCanvasBg = {
    init: function () {
      console.log('[CanvasNoise] Init called');
      try {
        createCanvas();
        resize();
        showCanvas();
        lastTime = performance.now();
        animate(lastTime);

        // Event listeners
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', handleVisibility);

        console.log('[CanvasNoise] Init complete, animation running');

        // Cleanup function
        return function destroy() {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          window.removeEventListener('resize', resize);
          document.removeEventListener('visibilitychange', handleVisibility);
          if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        };
      } catch (err) {
        console.error('[CanvasNoise] Init error:', err);
      }
    },

    setOpacity: function (opacity) {
      CONFIG.opacity = opacity;
    },

    setSpeed: function (speed) {
      CONFIG.speed = speed;
    },
  };
})();

// Auto-initialize when DOM is ready
console.log('[CanvasNoise] Document ready state:', document.readyState);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    console.log('[CanvasNoise] DOMContentLoaded fired, calling init');
    window.EbeliCanvasBg.init();
  });
} else {
  console.log('[CanvasNoise] DOM already loaded, calling init directly');
  window.EbeliCanvasBg.init();
}
