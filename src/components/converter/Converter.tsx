export function Converter() {
  return (
    <div class="w-full h-full flex flex-col gap-2 lg:gap-4">
      <div class="h-[42px] flex justify-center items-center capitalize text-xl font-medium">
        Figma VectorNetwork
      </div>
      <div class="h-full overflow-hidden rounded-md border-2 border-gray-200 shadow-sm focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50">
        <textarea
          class="block w-full h-full font-mono p-2 border-0 focus:border-0 focus:ring-0 resize-none"
          spellcheck={false}
          placeholder="Paste JSON data ..."
        ></textarea>
      </div>
    </div>
  );
}
