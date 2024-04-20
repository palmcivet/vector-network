import { ForkmeIcon } from '@/components/forkme';

export function Header() {
  return (
    <div class="sc-container shadow-sm">
      <div class="relative">
        <div class="flex w-full justify-center items-center py-4">
          <span class="font-extrabold text-2xl px-4">Figma Vector Network</span>
          <span>
            <code class="rounded-md bg-cyan px-2 py-1 text-sm">v{__APP_VERSION__}</code>
          </span>
        </div>

        <ForkmeIcon url={__APP_GITHUB__} />
      </div>
    </div>
  );
}
