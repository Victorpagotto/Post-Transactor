import * as express from 'express';

class app {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.init();
  }

  private init() {
    this.app.use(express.json());
    this.app.get('/ping', (_req, res) => res.status(200).json({ message: 'Post transactor API running healthy.' }));
  }

  public start(port: number): void {
    this.app.listen(port, () => console.log(`Running on port ${port}`));
  }
}

const appInstance = new app();

export { appInstance };

export default app;