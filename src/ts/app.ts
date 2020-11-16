import View from "./views/View";
import Controller from "./controllers/Controller";

class AppAleoWoW {
  private _controller: Controller;
  private _view: View;

  /**
   * Constructeur
   */
  constructor() {
    this._controller = new Controller();
    this._view = new View(this._controller);
  }
}

window.onload = () => {
  let app = new AppAleoWoW();
}