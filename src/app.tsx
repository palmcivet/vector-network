import { Header } from '@/layout/header';
import { Main } from '@/layout/main';

export function App() {
  return (
    <main class="lg:h-screen flex flex-col min-w-sm">
      <Header />
      <Main />
    </main>
  );
}
