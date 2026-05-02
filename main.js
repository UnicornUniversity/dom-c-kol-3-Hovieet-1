const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

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

/**
 * Vrátí náhodnou položku z pole.
 */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Vygeneruje náhodné datum narození podle věkového rozmezí.
 */
function generateBirthdate(minAge, maxAge) {
  const now = Date.now();

  const oldestDate = now - maxAge * MS_PER_YEAR;
  const youngestDate = now - minAge * MS_PER_YEAR;

  const randomTime =
    oldestDate + Math.random() * (youngestDate - oldestDate);

  return new Date(randomTime).toISOString();
}

/**
 * Upraví příjmení podle pohlaví.
 */
function adjustSurnameByGender(surname, gender) {
  if (gender === "female") {
    if (surname.endsWith("ý")) {
      return surname.slice(0, -1) + "á";
    }

    return surname + "ová";
  }

  return surname;
}

/**
 * Vygeneruje jednoho zaměstnance.
 */
function generateEmployee(age) {
  const gender = Math.random() < 0.5 ? "male" : "female";

  const name =
    gender === "male"
      ? getRandomItem(maleNames)
      : getRandomItem(femaleNames);

  const surname = adjustSurnameByGender(getRandomItem(surnames), gender);

  return {
    name,
    surname,
    gender,
    birthdate: generateBirthdate(age.min, age.max),
    workload: getRandomItem(workloads)
  };
}

/**
 * Hlavní funkce pro generování zaměstnanců.
 */
export function main(dtoIn) {
  const dtoOut = [];

  for (let i = 0; i < dtoIn.count; i++) {
    dtoOut.push(generateEmployee(dtoIn.age));
  }

  return dtoOut;
}
