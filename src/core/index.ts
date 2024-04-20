import { Application, EventEmitter, Graphics } from 'pixi.js';
import { buildStrokeStyle, buildVectorRenderPath } from '@/core/renderer';

type Event = '';

const OFFSET = 20;

export class App extends EventEmitter<Event> {
  private app: Application;

  private graphics: Graphics;

  constructor() {
    super();

    this.app = new Application();
    this.graphics = new Graphics();
    this.graphics.x += OFFSET;
    this.graphics.y += OFFSET;
    this.app.stage.addChild(this.graphics);
  }

  public async mount(element: HTMLCanvasElement) {
    await this.app.init({
      antialias: true,
      resolution: window.devicePixelRatio,
      resizeTo: element,
      canvas: element,
      background: 0xffffff,
    });
  }

  public unmount() {
    this.app.destroy();
  }

  public updateData(data: VectorNetwork) {
    this.graphics.clear();
    const strokePath = buildVectorRenderPath(data.vertices, data.segments);
    this.graphics.path(strokePath);
    this.graphics.stroke(buildStrokeStyle());
  }

  public clearData() {
    this.graphics.clear();
  }
}

export const core = new App();
