import { GitHubIcon } from '@/shared/github';
import { version } from '../../../package.json';

export function Header() {
  return (
    <div class="flex justify-center px-16 shadow-sm">
      <div class="flex md:w-[768px] lg:w-[1024px] xl:w-[1440px] flex-justify-between py-4">
        <div class="flex w-full flex-justify-center">
          <span class="font-600 text-xl px-4">Vector Network</span>
          <span class="">
            <code class="rounded-md bg-lightBlue px-2 py-1 text-sm">v{version}</code>
          </span>
        </div>

        <GitHubIcon url={''} />
      </div>
    </div>
  );
}
