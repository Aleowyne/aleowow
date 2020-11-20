export default class FileController {
  private _file: File;
  public get file(): File { return this._file };

  /**
   * Constructeur
   */
  constructor(file: File) {
    this._file = file;
  }

  /**
   * Télédéchargement d'un fichier JSON
   */
  async uploadJSONFile(inputFilePhp: RequestInfo) {
    // Si le fichier n'est pas de type JSON
    if (this._file.type !== "application/json") {
      console.log("Erreur type de fichier");
      return;
    }

    // Récupération du contenu du fichier
    const fileContent:string = await this._file.text();

    // Envoi du contenu du fichier vers le serveur
    try {
      let response = await fetch(inputFilePhp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(fileContent)
      });

      let json = await response.json();
      console.log(json); // Test
    }
    catch(error) {
      console.log("Erreur " + error);
    } 
  }
}