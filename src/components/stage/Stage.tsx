import { onCleanup, onMount } from 'solid-js';
import { core } from '@/core';

export function Stage() {
  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    const canvas = canvasRef!;
    core.mount(canvas);
  });

  onCleanup(() => {
    core.unmount();
  });

  return (
    <div class="w-full h-full overflow-auto rounded-md border-2 border-gray-200">
      <canvas class="w-full h-full" ref={canvasRef}></canvas>
    </div>
  );
}
