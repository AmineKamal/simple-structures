export class Task {
  private f: () => any;
  private b?: () => boolean;
  private count?: number;
  private type?: 'timeout' | 'interval';
  private ms?: number;
  private cb?: () => any;
  private timeout?: NodeJS.Timeout;
  private interval?: NodeJS.Timeout;

  public constructor(f: () => any) {
    this.f = f;
  }

  public start() {
    return new Promise<any>(resolve => {
      this._run(resolve);
    });
  }

  private _run(cb: () => any) {
    if (!this.type || !this.ms) return;

    switch (this.type) {
      case 'interval':
        this.interval = setInterval(() => this.exec(), this.ms);
        break;

      case 'timeout':
        this.timeout = setTimeout(() => this.exec(), this.ms);
        break;
    }

    this.cb = cb;
  }

  public in(ms: number) {
    this.type = 'timeout';
    this.ms = ms;
    return this;
  }

  public every(ms: number) {
    this.type = 'interval';
    this.ms = ms;
    return this;
  }

  public stop() {
    if (this.interval) clearInterval(this.interval);
    if (this.timeout) clearTimeout(this.timeout);
    if (this.cb) this.cb();

    this.cb = undefined;
    this.timeout = undefined;
    this.interval = undefined;
    this.b = undefined;
    this.count = undefined;
    this.type = undefined;
    this.ms = undefined;
  }

  public until(b: () => boolean) {
    this.b = b;
    return this;
  }

  public times(count: number) {
    this.count = count;
    return this;
  }

  private exec() {
    this.f();
    if ((this.b && this.b()) || (this.count && --this.count <= 0) || this.type === 'timeout') this.stop();
  }
}

export function run(f: () => any) {
  return new Task(f);
}
