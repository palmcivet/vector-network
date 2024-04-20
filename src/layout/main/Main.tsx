import { Toolbar } from '@/components/toolbar';
import { Stage } from '@/components/stage';
import { Converter } from '@/components/converter';

export function Main() {
  return (
    <div class="sc-container h-full md:h-7/8 py-8">
      <div class="sc-container-inner h-full px-1 flex flex-col lg:flex-row gap-6">
        <div class="w-full lg:w-2/3 h-full flex flex-col gap-4">
          <Toolbar />
          <Stage />
        </div>
        <div class="w-full lg:w-1/3">
          <Converter />
        </div>
      </div>
    </div>
  );
}
