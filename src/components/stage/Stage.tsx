export function Stage() {
  let canvasRef: HTMLCanvasElement | undefined;

  return (
    <div class="flex justify-center px-16">
      <div class="flex md:w-[768px] lg:w-[1024px] xl:w-[1440px] justify-center">
        <div class="sm:w-full lg:max-w-[1024px] rounded border-lightBlue border border-solid transition-all">
          <canvas class="w-full h-full" ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
