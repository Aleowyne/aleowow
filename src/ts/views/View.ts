import Controller from "../controllers/Controller";
import FileController from "../controllers/FileController";

export default class View implements Observer {
  private _controller: Controller;
  private _container: HTMLElement;

  private _url: string;
  public get url(): string { return this._url; }

  /**
   * Constructeur
   * @param controller Contrôleur
   */
  constructor(controller: Controller) {
    this._controller = controller;
    this._controller.addObserver(this);
    this._container = document.getElementById("app");
    this.initView();
  }

  /**
   * Initialisation de la vue
   */
  private initView() {
    // Récupération de l'URL de la page
    window.addEventListener("hashchange", () => { 
      this._url = window.location.hash.substring(1); 
      this.notify();
    });

    this._url = window.location.hash.substring(1);
    this.notify();
  }

  /**
   * Notification
   */
  notify() {
    this.router();
  }

  /**
   * Routeur
   */
  private router() {
    switch (true) {
      // Route "/admin"
      case /^admin$/gi.test(this._url):
        this.displayAdmin();
        break;
    }
  }

  /**
   * Affichage de la page administrateur
   */
  displayAdmin() {
    let content = "";

    content = `<input type="file" id="import-gold">`;

    this._container.innerHTML = content;

    // Télédéchargement du fichier JSON des golds
    document.getElementById('import-gold').addEventListener('change', (event: Event) => { 
      const file = new FileController((<HTMLInputElement>event.target).files[0]);
      file.uploadJSONFile("./src/php/api/uploadFileGold.php");
    });
  }
}
