<?php
  include_once(__DIR__.'/Database.php');
  include_once(__DIR__.'/../config/ConfigLoader.php');

  class DatabaseAleowow extends Database {
    private static $handle = null;

    /**
     * Constructeur
     */
    protected function __construct() {
      $config = new ConfigLoader();
      
      parent::__construct($config->getDatabaseConfig()["hostname"], $config->getDatabaseConfig()["database"], 
                          $config->getDatabaseConfig()["username"], $config->getDatabaseConfig()["password"]);

      parent::connect();
    }

    public static function getInstance() {
      if (is_null(self::$handle)) {
        self::$handle = new DatabaseAleowow();
      }
          
      return self::$handle;
    }
  }