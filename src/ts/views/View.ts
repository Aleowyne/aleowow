import Controller from "../controllers/Controller";
import FileController from "../controllers/FileController";

export default class View implements Observer {
  private _controller: Controller;
  private _container: HTMLElement;
  private _cryptoJS: any;
  private _parser: DOMParser;
  private _authHash: string;

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

    this._cryptoJS = require("crypto-js");
    this._authHash = "";
    this._parser = new DOMParser();

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
        this._controller.login(this._controller.getCookie("auth"))
          .then(() => {
            // Affichage de la page admin
            this.displayAdmin();
          })
          .catch(() => {
            // Affichage de la page de login
            this.displayLogin();
          });

        break;
    }
  }

  /**
   * Affichage de la page administrateur
   */
  private async displayAdmin() {
    try {
      let response: string = await this._controller.getTemplate("./public/templates/admin.html");
      let doc: Document = this._parser.parseFromString(response, 'text/html');
      this._container.innerHTML = doc.querySelector("template").innerHTML;

      // Télédéchargement du fichier JSON des golds
      document.getElementById('import').addEventListener('change', (event: Event) => {
        const file = new FileController((<HTMLInputElement>event.target).files[0]);
        file.uploadJSONFile("./src/php/api/uploadFileGold.php");
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  /**
   * Affichage de la page de connexion admin
   */
  private async displayLogin() {
    try {
      let response: string = await this._controller.getTemplate("./public/templates/login.html");
      let doc: Document = this._parser.parseFromString(response, 'text/html');
      this._container.innerHTML = doc.querySelector("template").innerHTML;

      let loginForm = document.querySelector("form#loginForm");

      loginForm.addEventListener("submit", async event => {
        event.preventDefault();

        let button = document.querySelector("button[type='submit']");
        button.setAttribute("disabled", "true");
        button.innerHTML = `<span role="status" aria-hidden="true"></span> Patientez...`;

        let password = this._cryptoJS.SHA512((<HTMLInputElement>document.getElementById("pass")).value).toString();

        try {
          await this._controller.login(password);

          // Création d'un cookie avec le mdp hashé pour une durée de 3 jours
          this._controller.setCookie("auth", password, 3);
          this._authHash = password;
          this.router();
        }
        catch (error) {
          this.displayLogin();
        }
      });
    }
    catch (error) {
      console.log(error);
    }
  }
}