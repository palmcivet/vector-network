import { BendIcon, MoveIcon, PaintIcon, PenIcon, PencilIcon } from '@/shared/icon';

const TOOLS = {
  Move: <MoveIcon />,
  Pen: <PenIcon />,
  Pencil: <PencilIcon />,
  Bend: <BendIcon />,
  Paint: <PaintIcon />,
};

export function Toolbar() {
  return (
    <div class="flex justify-center flex-row gap-2">
      {Object.entries(TOOLS).map(([name, icon]) => (
        <div
          role="button"
          class="rounded-lg border border-gray-300 bg-white text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
          onclick={() => name}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
