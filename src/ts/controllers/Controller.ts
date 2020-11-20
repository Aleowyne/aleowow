import Subject from "../patterns/Subject";

export default class Controller extends Subject {
  /**
   * Constructeur
   */
  constructor() {
    super();
  }


  /**
   * Authentifier un utilisateur
   * @param password Mot de passe hashé
   */
  async login(password: string): Promise<any> {
    let data = { password: password };

    try {
      let response = await fetch("./src/php/api/loginAdmin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(data)
      });

      if (response.status === 401 || response.status === 400) {
        return Promise.reject(response.json);
      }

      return response;
    }
    catch (error) {
      return error;
    }
  }

  /**
   * Récupérer un template HTML
   * @param path Chemin du fichier
   */
  async getTemplate(path: string): Promise<string> {
    try {
      let response = await fetch(path);
      return response.text();
    }
    catch (error) {
      return error;
    }
  }


  /**
   * Récupérer un cookie
   * @param name Nom du cookie
   */
  getCookie(name: string): string {
    name = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');

    for (let cookie of cookies) {
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length);
      }
    }
    return "";
  }

  /**
   * Créer un cookie
   * @param name Nom du cookie 
   * @param value Valeur du cookie 
   * @param days Nombre de jours de validité du cookie 
   */
  setCookie(name: string, value: any, days: number) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/aleowow/;SameSite=Strict;Secure";
  }
}