function updatePurposeTravelOptions() {
    const religionSelect = document.getElementById("religion");
    const purposeTravelSelect = document.getElementById("purpose-travel");
  
    const selectedReligion = religionSelect.value.toLowerCase();
  
    // Réinitialiser les options du but du voyage
    purposeTravelSelect.innerHTML = "<option value=''>Sélectionnez</option>";
  
    // Si la religion est islam ou muslim, afficher les options pour Omra et Hajj
    if (selectedReligion === "islam" || selectedReligion === "muslim") 
    {
      purposeTravelSelect.innerHTML += `
        <option value="work">Travail</option>
        <option value="transit">Transit</option>
        <option value="visit">Visite</option>
        <option value="umrah">Omra</option>
        <option value="residence">Résidence</option>
        <option value="hajj">Hajj</option>
      `;
    } else {
      // Pour toute autre religion, afficher uniquement les options standard
      purposeTravelSelect.innerHTML += `
        <option value="work">Travail</option>
        <option value="transit">Transit</option>
        <option value="visit">Visite</option>
        <option value="residence">Résidence</option>
      `;
    }
  }
  
function formatFields(input) {
  // Convertir le texte en majuscules pour le no
  if (input.id === "nom") {
    input.value = input.value.toUpperCase();
  }

  // Pour le prénom, convertir la première lettre en majuscule et le reste en minuscules
  if (input.id === "prenom") {
    input.value =
      input.value.charAt(0).toUpperCase() +
      input.value.slice(1).toLowerCase();
  }
}

// Add new functions to populate the select options for the name of the transport company and the destination
function populateTransportCompanyOptions() {
  const transportCompanySelect = document.getElementById("transport-company");
  const transportCompanies = [
    "",
    "Saudia (Saudi Arabian Airlines)",
    "Air Algérie",
    "Air France",
    "Lufthansa",
    "Turkish Airlines",
    "Emirates",
    "Qatar Airways",
    "Alitalia",
    "Royal Air Maroc",
    "Iberia",
    "British Airways",
    // Add more companies as needed
  ];

  transportCompanies.forEach((company) => {
    const option = document.createElement("option");
    option.value = company;
    option.textContent = company;
    transportCompanySelect.appendChild(option);
  });
}

function populateDestinationOptions() {
  const destinationSelect = document.getElementById("destination");
  const destinations = [
    "",
    "Saudi Arabia",
    "Tunisia",
    "Morocco",
    "Turkey",
    "Malaysia",
    "Maldives",
    "Qatar",
    "Jordan",
    "Lebanon",
    "Indonesia",
    "Serbia",
    "Bosnia and Herzegovina",
    "Montenegro",
    "Albania",
    "Georgia",
    "Armenia",
  ];

  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination;
    option.textContent = destination;
    destinationSelect.appendChild(option);
  });
}

function addTravelingPerson() {
  const tableBody = document.getElementById("traveling-persons-table").getElementsByTagName("tbody")[0];

  // Create a new row
  const newRow = tableBody.insertRow(tableBody.rows.length);

  // Add cells to the row
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);

  // Create input elements for each cell
  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.classList.add("form-control");
  cell1.appendChild(inputName);

  const inputSex = document.createElement("select");
  inputSex.classList.add("form-control");
  inputSex.innerHTML = `
     <option value="male">Masculin</option>
     <option value="female">Féminin</option>
  `;
  cell2.appendChild(inputSex);

  const inputDOB = document.createElement("input");
  inputDOB.type = "date";
  inputDOB.classList.add("form-control");
  cell3.appendChild(inputDOB);

  const inputRelation = document.createElement("input");
  inputRelation.type = "text";
  inputRelation.classList.add("form-control");
  cell4.appendChild(inputRelation);
}

function checkEmpty(input, errorId) {
  var errorMessage = document.getElementById(errorId);
  if (input.value.trim() === "") {
    input.classList.add("error-border");
    errorMessage.innerText = "Veuillez remplir ce champ.";
    return false;
  } else {
    input.classList.remove("error-border");
    errorMessage.innerText = "";
    return true;
  }
}

function validateForm() {
  var fields = [
    "nom",
    "prenom",
    "passport",
    "mother-name",
    "prev-nationality",
    "present-nationality",
    "sex",
    "status",
    "sect",
    "religion",
    "place-issue",
    "qualification",
    "profession",
    "home-address",
    "business-address",
    "purpose-travel",
    "date-of-birth",
// Add the new field for the destination
  ];

  var isValid = true;
  fields.forEach(function (field) {
    var input = document.getElementById(field);
    var errorMessage = document.getElementById(field + "-error");
    if (!checkEmpty(input, field + "-error")) {
      isValid = false;
    }
  });

  // Validation of the new fields
  if (!validateDateOfBirth(dobInput, dobError)) {
    isValid = false;
  }

  // Validation of the new fields
  if (!validateDateOfExpiry(doeInput, doeError)) {
    isValid = false;
  }

  return isValid;
}

// Call the new functions to populate the select options
populateTransportCompanyOptions();
populateDestinationOptions();

// Validation de la date de naissance
function validateDateOfBirth(input, errorElement) {
  var dob = input.value;
  var birthDate = new Date(dob);
  var currentDate = new Date();

  if (isNaN(birthDate.getTime())) {
    errorElement.textContent = 'Veuillez entrer une date de naissance valide.';
    return false;
  } else {
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      errorElement.textContent = 'Vous devez avoir plus de 18 ans pour soumettre cette demande.';
      return false;
    }
  }

  // Réinitialise le message d'erreur s'il n'y a pas d'erreur
  errorElement.textContent = '';
  return true;
}

function openImageUploader() {
    document.getElementById("profile-picture").click();
  }

  function displayImage(event) {
    const image = document.getElementById("preview-image");
    const file = event.target.files[0];

                                                
    //  const maxSize = 320 * 320; 

    // if (file.size > maxSize) {
    //   alert(
    //     "La taille de l'image est trop grande. Veuillez choisir une image plus petite."
    //   );
    //   return;
    // }

    // // Si la taille du fichier est acceptable, afficher l'image dans le rectangle
    image.src = URL.createObjectURL(file);
  }

  function updateTravelAndSectOptions() {
    const religionSelect = document.getElementById("religion");
    const purposeTravelSelect = document.getElementById("purpose-travel");
    const sectSelect = document.getElementById("sect");
  
    const selectedReligion = religionSelect.value.toLowerCase();
  
    // Réinitialiser les options pour le but du voyage et le sect
    purposeTravelSelect.innerHTML = "<option value=''>Sélectionnez</option>";
    sectSelect.innerHTML = "<option value=''>Sélectionnez un sect</option>";
  
    // Logique pour le but du voyage en fonction de la religion
    if (selectedReligion === "islam" || selectedReligion === "muslim") 
    {
      purposeTravelSelect.innerHTML += `
        <option value="work">Travail</option>
        <option value="transit">Transit</option>
        <option value="visit">Visite</option>
        <option value="umrah">Omra</option>
        <option value="residence">Résidence</option>
        <option value="hajj">Hajj</option>
      `;
    } else {
      // Pour toute autre religion, afficher uniquement les options standard
      purposeTravelSelect.innerHTML += `
        <option value="work">Travail</option>
        <option value="transit">Transit</option>
        <option value="visit">Visite</option>
        <option value="residence">Résidence</option>
      `;
    }
  
    // Logique pour le sect en fonction de la religion
    if (selectedReligion === "islam") {
      sectSelect.innerHTML += `
        <option value="Maliky">المالكي</option>
        <option value="Hanbali">الحنبلي</option>
        <option value="Chafiai">الشافعي</option>
        <option value="Hanafi">الحنفي</option>
      `;
    } else if (selectedReligion === "christianity") {
      sectSelect.innerHTML += `
        <option value="Catholic">Catholicisme</option>
        <option value="Orthodox">Christianisme orthodoxe</option>
        <option value="Protestant">Christianisme protestant</option>
        <option value="Anglican">Christianisme anglican</option>
        <!-- Ajoutez d'autres sectes/chapelles du christianisme -->
      `;
    } else if (selectedReligion === "judaism") {
      sectSelect.innerHTML += `
        <option value="Orthodox">Judaïsme orthodoxe</option>
        <option value="Reform">Judaïsme réformé</option>
        <option value="Conservative">Judaïsme conservateur</option>
        <option value="Hasidic">Judaïsme hassidique</option>
        <!-- Ajoutez d'autres branches du judaïsme -->
      `;
    } else if (selectedReligion === "atheist") {
      sectSelect.innerHTML += `
        <option value="Agnostic">Agnostique</option>
        <option value="Secular Humanist">Humaniste séculaire</option>
        <!-- Ajoutez d'autres sectes/branches pour les athées -->
      `;
    } else {
      sectSelect.innerHTML += `
        <option value="Non applicable">Non applicable</option>
        <!-- Ajoutez d'autres options pour les religions non spécifiées -->
      `;
    }
  }
  

  // Liste des villes par nationalité
const citiesByNationality = {
  // Liste des villes par nationalité
  algerie: [
    "Alger",
    "Oran",
    "Constantine",
    "Annaba",
    "Batna",
    "Sétif",
    "Sidi Bel Abbès",
    "Skikda",
    "Biskra",
    "Blida",
    // Ajoutez d'autres villes d'Algérie
  ],
  france: [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Montpellier",
    "Bordeaux",
    "Lille",
  ],
  usa: [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ],
  germany: [
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
  ],
  japan: [
    "Tokyo",
    "Yokohama",
    "Osaka",
    "Nagoya",
    "Sapporo",
    "Kobe",
    "Kyoto",
    "Fukuoka",
    "Kawasaki",
    "Saitama",
  ],
  china: [
    "Shanghai",
    "Beijing",
    "Guangzhou",
    "Shenzhen",
    "Tianjin",
    "Wuhan",
    "Dongguan",
    "Chongqing",
    "Chengdu",
    "Nanjing",
  ],
  india: [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
  ],
  uk: [
    "London",
    "Birmingham",
    "Manchester",
    "Glasgow",
    "Liverpool",
    "Newcastle",
    "Nottingham",
    "Leeds",
    "Sheffield",
    "Bristol",
  ],
  brazil: [
    "São Paulo",
    "Rio de Janeiro",
    "Brasília",
    "Salvador",
    "Fortaleza",
    "Belo Horizonte",
    "Manaus",
    "Curitiba",
    "Recife",
    "Porto Alegre",
  ],
  canada: [
    "Toronto",
    "Montreal",
    "Vancouver",
    "Calgary",
    "Edmonton",
    "Ottawa",
    "Winnipeg",
    "Quebec City",
    "Hamilton",
    "Kitchener",
  ],
  australia: [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Adelaide",
    "Gold Coast",
    "Canberra",
    "Newcastle",
    "Geelong",
    "Hobart",
  ],
  // Vous pouvez ajouter d'autres nationalités avec leurs villes correspondantes ici


};

// Fonction pour mettre à jour les options du lieu de naissance
function updatePlaceOfBirthOptions(nationality) {
  const placeOfBirthSelect = document.getElementById("place-of-birth");
  // Effacer les options existantes
  placeOfBirthSelect.innerHTML = '<option value="">Sélectionner un lieu de naissance</option>';
  
  // Remplir avec les villes correspondant à la nationalité sélectionnée
  const cities = citiesByNationality[nationality];
  if (cities) {
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      placeOfBirthSelect.appendChild(option);
    });
  }
}
function populateProfessions() {
  const professionSelect = document.getElementById("profession");
  const professions = [
    "Ingénieur",
    "Enseignant",
    "Médecin",
    "Avocat",
    "Artiste",
    "Étudiant",
    "Entrepreneur",
    "Scientifique",
    "Designer",
    "Informaticien",
    "Journaliste",
    "Artisan",
    "Athlète",
    "Écrivain",
    "Consultant",
    "Pompier",
    "Policière",
    "Architecte",
    "Vendeur",
    "Cuisinier",
    // Ajoutez d'autres professions au besoin
  ];

  professions.forEach(profession => {
    const option = document.createElement("option");
    option.value = profession;
    option.textContent = profession;
    professionSelect.appendChild(option);
  });
}

// Appelez cette fonction pour peupler le champ de sélection des professions
populateProfessions();
function populateQualifications() {
  const qualificationSelect = document.getElementById("qualification");
  const qualifications = [
    "Baccalauréat",
    "Licence",
    "Master",
    "Doctorat",
    "Diplôme d'études secondaires",
    "Certification professionnelle",
    "Formation professionnelle",
    "Diplôme technique",
    "Certificat d'apprentissage",
    "Études postdoctorales",
    "Certificat de compétence",
    // Ajoutez d'autres qualifications au besoin
  ];

  qualifications.forEach(qualification => {
    const option = document.createElement("option");
    option.value = qualification;
    option.textContent = qualification;
    qualificationSelect.appendChild(option);
  });
}

// Appelez cette fonction pour peupler le champ de sélection des qualifications
populateQualifications();
function populatePlaceOfIssue() {
  const placeIssueSelect = document.getElementById("place-issue");
  const placesOfIssue = [
    "Mairie",
    "Bureau de l'état civil",
    "Consulat",
    "Préfecture",
    "Ambassade",
    "Tribunal",
    "Service des passeports",
    // Ajoutez d'autres lieux de délivrance au besoin
  ];

  placesOfIssue.forEach(place => {
    const option = document.createElement("option");
    option.value = place;
    option.textContent = place;
    placeIssueSelect.appendChild(option);
  });
}

// Appelez cette fonction pour peupler le champ de sélection des lieux de délivrance
populatePlaceOfIssue();
function validateDOB() {
  const dobInput = document.getElementById("date-of-birth");
  const dob = new Date(dobInput.value);
  const today = new Date();
  const minAge = 18; // Âge minimum autorisé

  // Vérifier si la date de naissance est valide
  if (isNaN(dob)) {
    // Afficher un message d'erreur si la date n'est pas valide
    alert("Veuillez saisir une date de naissance valide.");
    dobInput.value = ""; // Réinitialiser la valeur du champ
    return false;
  }

  // Vérifier si la personne a l'âge minimum requis
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < minAge) {
    // Afficher un message si la personne est trop jeune
    alert("Vous devez avoir au moins 18 ans pour vous inscrire.");
    dobInput.value = ""; // Réinitialiser la valeur du champ
    return false;
  }

  return true; // La date de naissance est valide
}
function validateDOB(input) {
  const dob = new Date(input.value);
  const today = new Date();
  const minAge = 18; // Âge minimum autorisé

  // Vérifier si la date de naissance est valide
  if (isNaN(dob)) {
    const dobError = document.getElementById("dob-error");
    dobError.textContent = "Veuillez saisir une date de naissance valide.";
    return;
  }

  // Vérifier si la personne a l'âge minimum requis
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < minAge) {
    const dobError = document.getElementById("dob-error");
    dobError.textContent = "Vous devez avoir au moins 18 ans pour vous inscrire.";
    return;
  }

  // Si tout est valide, effacez les éventuels messages d'erreur
  const dobError = document.getElementById("dob-error");
  dobError.textContent = "";
}
function validateDates() {
  const dateOfIssue = new Date(document.getElementById("date-of-issue").value);
  const dateOfExpiry = new Date(document.getElementById("date-of-expiry").value);

  if (dateOfIssue >= dateOfExpiry) {
    // La date d'expiration doit être postérieure à la date de délivrance
    alert("La date d'expiration doit être postérieure à la date de délivrance.");
    document.getElementById("date-of-issue").value = ""; // Réinitialiser la valeur si nécessaire
    document.getElementById("date-of-expiry").value = ""; // Réinitialiser la valeur si nécessaire
  }
}
function validateDates() {
  const arrivalDate = new Date(document.getElementById("date-of-arrival").value);
  const departureDate = new Date(document.getElementById("date-of-departure").value);

  if (arrivalDate > departureDate) {
    alert("La date de départ doit être postérieure à la date d'arrivée.");
    document.getElementById("date-of-departure").value = ""; // Réinitialiser la valeur si nécessaire
  }
}
