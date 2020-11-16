<?php

  class ConfigLoader {
    private string $env;
    private array $config;

    public function __construct() {
      // Environnement = [dev | test | prod]
      $this->env = "dev";
      $this->config = $this->loadConfig($this->env.".json");
    }

    private function loadConfig(string $configFilePath): array {
      $configFile = file_get_contents($configFilePath, true);
      return json_decode($configFile, true);
    }

    public function getDatabaseConfig(): array {
      return $this->config[0]["database"];
    }
  }