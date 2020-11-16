<?php

  class Database {
    private $server = "";
    private $database = "";
    private $user = "";
    private $password = "";
    
    var $link = null;
    
    /**
     * Constructeur
     * @param type $server Adresse du serveur
     * @param type $database Nom de la base de données
     * @param type $user Utilisateur
     * @param type $password Mot de passe de l'utilisateur
     */
    protected function __construct($server, $database, $user, $password) {
      $this->server = $server;
      $this->database = $database;
      $this->user = $user;
      $this->password = $password;
    }
    
    /**
     * Destructeur
     */
    function __destruct() {
      $this->disconnect();
    }
    
    /**
     * Connexion à la base de données
     * @return True si la connexion a réussi, false sinon
     */
    protected function connect() {
      $valueReturn = true;

      try {
        $this->link = new PDO("mysql:host=".$this->server.";dbname=".$this->database, $this->user, $this->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        $this->link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->link->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      }
      catch (Exception $e) {
        $valueReturn = false;
      }

      return $valueReturn;
    }
    
    /**
     * Déconnexion de la base de données
     */
    protected function disconnect() {
      $this->link = null;
    }
    
    /**
     * Exécute une requête de type SELECT
     * @param type $request Requête SQL à exécuter
     * @param type $params Liste de paramètres à intégrer à la requête ( ['name' => 'nom paramètre', 'value' => 'valeur du paramètre', 'type' => 'type du paramètre'] )
     * @param type $result Résultat obtenu
     * @return True si la requête a retourné des résultats, false sinon
     */
    public function get($request, &$result, $params = array()) {
      $valueReturn = false;
      
      if ($this->link) {
        if (count($params)) {
          $query = $this->link->prepare($request);

          foreach ($params as $param) {
            $query->bindValue($param['name'], $param['value'], $this->getPDOType($param['type']));
          }

          $statement = $query->execute();

          if ($statement) {			
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
          }
        }
        else {
          $statement = $this->link->query($request);

          if ($statement) {
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
          }
        }
      
        if (count($result)) {
          $valueReturn = true;
        }
      }
      
      return $valueReturn;
    }
    
    /**
     * Exécute une requête de type UPDATE, INSERT, DELETE (sans retour de résultat)
     * @param $request Requête à exécuter
     * @param $params Liste de paramètres à intégrer à la requête ( ['name' => 'nom paramètre', 'value' => 'valeur du paramètre', 'type' => 'type du paramètre'] )
     * @return True si la requête a été exécutée, false sinon
     */
    public function execute($request, $params = array()) {
      $valueReturn = false;
              
      if ($this->link) {
        if (count($params)) {
          $query = $this->link->prepare($request);

          foreach ($params as $param) {
            $query->bindValue($param['name'], $param['value'], $this->getPDOType($param['type']));
          }

          $valueReturn = $query->execute() !== false;
        }
        else {
          $valueReturn = $this->link->query($request) !== false;
        }
      }
      
      return $valueReturn;
    }

    function getPDOType($type) {
      $valueReturn = '';

      if ($type == 'bool') {
        $valueReturn = PDO::PARAM_BOOL;
      }
      else if ($type == 'int') {
        $valueReturn = PDO::PARAM_INT;
      }
      else {
        $valueReturn = PDO::PARAM_STR;
      }

      return $valueReturn;
    }
  }