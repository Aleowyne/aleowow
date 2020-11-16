<?php
  class DataGold {
    // Identifiant du personnage
    private int $id;
    public function getId(): int { return $this->id; }
    
    // Nom du personnage
    private string $name;
    public function getName(): string { return $this->name; }

    // Serveur du personnage
    private Realm $realm;
    public function getRealm(): Realm { return $this->realm; }

    // Classe du personnage
    private ClassCharacter $classCharacter;
    public function getClassCharacter(): ClassCharacter { return $this->classCharacter; }

    // Race du personnage
    private RaceCharacter $raceCharacter;
    public function getRaceCharacter(): RaceCharacter { return $this->raceCharacter; }

    // Ilvl du personnage
    private int $ilvl;
    public function getIlvl(): int { return $this->ilvl; }
    public function setIlvl(int $ilvl) { $this->ilvl = $ilvl; }

    /**
     * Constructeur
     */
    public function __construct(array $data = null) {
      $this->id = 0;
      $this->name = "";
      $this->realm = new Realm();
      $this->classCharacter = new ClassCharacter();
      $this->raceCharacter = new RaceCharacter();
      $this->ilvl = 0;

      $this->fromArray($data);
    }

    /**
     * Import des données depuis un tableau (objet JSON)
     */
    public function fromArray(array $data) {
      if ($data) {
        $this->id = isset($data['id_character']) ? $data['id_character'] : $this->id;
        $this->name = isset($data['name_character']) ? $data['name_character'] : $this->name;

        $this->realm = (isset($data['id_realm']) && isset($data['name_realm'])) 
                        ? new Realm(['id' => $data['id_realm'], 'name' => $data['name_realm']]) 
                        : $this->realm;

        $this->classCharacter = (isset($data['id_class']) && isset($data['name_class'])) 
                                 ? new ClassCharacter(['id' => $data['id_class'], 'name' => $data['name_class']]) 
                                 : $this->classCharacter;

        $this->raceCharacter = (isset($data['id_race']) && isset($data['name_race'])) 
                                ? new RaceCharacter(['id' => $data['id_race'], 'name' => $data['name_race']]) 
                                : $this->raceCharacter;

        $this->ilvl = isset($data['ilvl']) ? $data['ilvl'] : $this->ilvl;
      }
    }

    /**
     * Export des données vers un tableau (objet JSON)
     */
    public function toArray() : array {
      return array(
        'id' => $this->id,
        'name' => $this->name,
        'realm' => $this->realm->toArray(),
        'classCharacter' => $this->classCharacter->toArray(),
        'raceCharacter' => $this->raceCharacter->toArray(),
        'ilvl' => $this->ilvl
      );
    }
  }
