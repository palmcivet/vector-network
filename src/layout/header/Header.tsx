import { ForkmeIcon } from '@/components/forkme';
import { version } from '../../../package.json';

export function Header() {
  return (
    <div class="sc-container shadow-sm">
      <div class="relative">
        <div class="flex w-full justify-center items-center py-4">
          <span class="font-extrabold text-2xl px-4">Vector Network</span>
          <span>
            <code class="rounded-md bg-lightBlue px-2 py-1 text-sm">v{version}</code>
          </span>
        </div>

        <ForkmeIcon url={''} />
      </div>
    </div>
  );
}
