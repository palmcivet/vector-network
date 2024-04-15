import { Header } from '@/components/header';
import { Toolbar } from '@/components/toolbar';
import { Stage } from '@/components/stage';
import { Converter } from '@/components/converter';

export function App() {
  return (
    <main class="app flex flex-col gap-6">
      <Header />
      <Toolbar />
      <Stage />
      <Converter />
    </main>
  );
}
