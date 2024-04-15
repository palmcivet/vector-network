export function Converter() {
  return (
    <div class="flex justify-center px-16">
      <div class="flex md:w-[768px] lg:w-[1024px] xl:w-[1440px] justify-center">
        <div class="sm:w-full lg:max-w-[1024px] rounded">
          <div class="overflow-hidden rounded-md border border-gray-300 shadow-sm focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50">
            <textarea
              class="block w-full h-auto font-mono p-2 border-0 focus:border-0 focus:ring-0"
              rows="5"
              spellcheck={false}
              placeholder="Figma VectorNetwork"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
