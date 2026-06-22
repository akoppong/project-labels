'use client';

import { useEffect, useRef, useState } from 'react';

let bwipPromise: Promise<typeof import('bwip-js/browser')> | null = null;

function getBwipjs() {
  if (!bwipPromise) {
    bwipPromise = import('bwip-js/browser').catch((err) => {
      bwipPromise = null;
      throw err;
    });
  }
  return bwipPromise;
}

export function BarcodeCanvas({ code }: { code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    getBwipjs().then((bwipjs) => {
      if (cancelled) return;
      try {
        bwipjs.toCanvas(canvas, {
          bcid: 'code128',
          text: code,
          scale: 3,
          height: 12,
          includetext: false
        });
      } catch {
        if (!cancelled) setFailed(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code]);

  if (failed) {
    return <span className="text-xs break-all">{code}</span>;
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`Barcode for ${code}`}
      className="w-full"
    />
  );
}
