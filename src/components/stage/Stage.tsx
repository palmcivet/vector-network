export function Stage() {
  let canvasRef: HTMLCanvasElement | undefined;

  return (
    <div class="w-full h-full rounded-md border-2 border-gray-200">
      <canvas class="w-full h-full" ref={canvasRef}></canvas>
    </div>
  );
}
