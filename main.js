/**
 * Hlavní funkce programu
 * @param {Object} dtoIn - vstupní data
 * @returns {Object} dtoOut - výstupní data (seznam zaměstnanců)
 */

function main(dtoIn) {
  // 1. Načtení vstupu
  const { count, ageRange } = dtoIn;

  // 2. Datové zdroje (jména, příjmení, úvazky)
  const maleNames = [
    "Jan", "Petr", "Josef", "Pavel", "Martin", "Tomáš", "Lukáš", "Karel",
    "Milan", "Michal", "Jiří", "David", "Ondřej", "Filip", "Adam", "Radek",
    "Marek", "Roman", "Jaroslav", "Václav", "Dominik", "Patrik", "Jakub",
    "Matěj", "Štěpán"
  ];

  const femaleNames = [
    "Jana", "Petra", "Marie", "Eva", "Anna", "Lenka", "Lucie", "Kateřina",
    "Hana", "Alena", "Markéta", "Veronika", "Tereza", "Barbora", "Nikola",
    "Simona", "Ivana", "Monika", "Zuzana", "Klára", "Adéla", "Kristýna",
    "Denisa", "Eliška", "Karolína"
  ];

  const surnames = [
    "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Krejčí",
    "Kučera", "Veselý", "Horák", "Němec", "Marek", "Pokorný", "Pospíšil",
    "Hájek", "Jelínek", "Král", "Růžička", "Beneš", "Fiala", "Sedláček",
    "Doležal", "Zeman", "Kolář", "Navrátil", "Čermák", "Urban", "Vaněk",
    "Konečný", "Šimek", "Kratochvíl", "Bláha", "Tichý", "Kříž", "Pavlík",
    "Mach", "Kopecký", "Malý", "Holub", "Čech", "Štěpánek", "Kadlec",
    "Soukup", "Beran", "Havel", "Bartoš", "Polák", "Musil", "Křížek",
    "Valenta"
  ];

  const workloads = [10, 20, 30, 40];

  // 3. Pomocné funkce 

  // Vrátí náhodnou položku z pole
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Vygeneruje náhodný věk v rozsahu
  function getRandomAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Vygeneruje datum narození podle věku (ISO formát)
  function generateBirthdate(age) {
    const today = new Date();

    const minDate = new Date(
      today.getFullYear() - age - 1,
      today.getMonth(),
      today.getDate()
    );

    const maxDate = new Date(
      today.getFullYear() - age,
      today.getMonth(),
      today.getDate()
    );

    const randomTime =
      minDate.getTime() +
      Math.random() * (maxDate.getTime() - minDate.getTime());

    return new Date(randomTime).toISOString();
  }

  // Upraví příjmení podle pohlaví (ženská varianta)
  function adjustSurnameByGender(surname, gender) {
    if (gender === "female") {
      if (surname.endsWith("ý")) {
        return surname.slice(0, -1) + "á";
      }
      return surname + "ová";
    }
    return surname;
  }

  // 4. Generování zaměstnanců 
  const dtoOut = [];

  for (let i = 0; i < count; i++) {
    // Náhodné pohlaví
    const gender = Math.random() < 0.5 ? "male" : "female";

    // Výběr jména podle pohlaví
    const name =
      gender === "male"
        ? getRandomItem(maleNames)
        : getRandomItem(femaleNames);

    // Výběr a úprava příjmení
    let surname = getRandomItem(surnames);
    surname = adjustSurnameByGender(surname, gender);

    // Generování věku a data narození
    const age = getRandomAge(ageRange.min, ageRange.max);
    const birthdate = generateBirthdate(age);

    // Náhodný úvazek
    const workload = getRandomItem(workloads);

    // Vytvoření zaměstnance
    dtoOut.push({
      name,
      surname,
      gender,
      birthdate,
      workload
    });
  }

  // 5. Výstup 
  return {
    dtoOut
  };
}

// TESTOVÁNÍ 
const dtoIn = {
  count: 2,
  ageRange: {
    min: 20,
    max: 60
  }
};

const result = main(dtoIn);

// výpis do konzole
console.log(JSON.stringify(result, null, 2));