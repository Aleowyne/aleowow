<?php
  require_once __DIR__.'/../config/ConfigLoader.php';

  $config = new ConfigLoader();

  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/x-www-form-urlencoded") {
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    if (isset($decoded["password"])) {
      if ($decoded["password"] !== $config->getAuthConfig()["hash"]) {
        header("HTTP/1.0 401 Error: Unauthorized.");
        throw new Exception("Error 401. Unauthorized.");
      }
    }
    else {
      header("HTTP/1.0 400 Error: Bad request.");
      throw new Exception("Error 400. Bad request.");
    }
  }
  else {
      header("HTTP/1.0 400 Error: Bad request.");
      throw new Exception("Error 400. Bad request.");
  }