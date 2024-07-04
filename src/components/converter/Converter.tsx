import { createSignal, onMount } from 'solid-js';
import { core } from '@/core';
import { isVectorNetwork } from '@/shared';

export function Converter() {
  const [vectorNetwork, setVectorNetwork] = createSignal<string>('');

  const renderVectorNetwork = (data: VectorNetwork) => {
    setVectorNetwork(JSON.stringify(data, undefined, 2));
    core.updateData(data);
  };

  const onChangeVectorNetwork = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const data = JSON.parse(target.value);

    if (!isVectorNetwork(data)) {
      console.error('[vector] Invalid JSON data.');
      core.clearData();
      return;
    }

    renderVectorNetwork(data);
  };

  onMount(async () => {
    try {
      const response = await fetch('./simple.json');
      const data: object = await response!.json();

      if (!isVectorNetwork(data)) {
        console.error('[vector] Invalid JSON data.');
        core.clearData();
        return;
      }

      renderVectorNetwork(data);
    } catch (error) {
      console.error('[vector]', error);
    }
  });

  return (
    <div class="w-full h-full flex flex-col gap-2 lg:gap-4">
      <div class="h-[42px] flex justify-center items-center capitalize text-xl font-medium">
        VectorNetwork
      </div>
      <div class="h-full overflow-hidden rounded-md border-2 border-gray-200 shadow-sm focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50">
        <textarea
          class="w-full h-full overflow-auto text-nowrap font-mono p-2 break-keep border-0 focus:border-0 focus:ring-0 resize-none focus-visible:outline-none"
          spellcheck={false}
          value={vectorNetwork()}
          onChange={onChangeVectorNetwork}
          rows={6}
          placeholder="Paste JSON data ..."
        ></textarea>
      </div>
    </div>
  );
}
