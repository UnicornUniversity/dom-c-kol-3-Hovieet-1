
/**
 * Hlavní funkce pro generování zaměstnanců
 * @param {Object} dtoIn
 * @param {number} dtoIn.count - počet zaměstnanců
 * @param {Object} dtoIn.age - věkové rozmezí
 * @param {number} dtoIn.age.min
 * @param {number} dtoIn.age.max
 * @returns {Array} pole zaměstnanců
 */
function main(dtoIn) {
  // 1. Načtení vstupu
  const { count, age } = dtoIn;

  // 2. Datové zdroje
  const maleNames = [
    "Jan","Petr","Josef","Pavel","Martin","Tomáš","Lukáš","Karel",
    "Milan","Michal","Jiří","David","Ondřej","Filip","Adam","Radek",
    "Marek","Roman","Jaroslav","Václav","Dominik","Patrik","Jakub",
    "Matěj","Štěpán"
  ];

  const femaleNames = [
    "Jana","Petra","Marie","Eva","Anna","Lenka","Lucie","Kateřina",
    "Hana","Alena","Markéta","Veronika","Tereza","Barbora","Nikola",
    "Simona","Ivana","Monika","Zuzana","Klára","Adéla","Kristýna",
    "Denisa","Eliška","Karolína"
  ];

  const surnames = [
    "Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Krejčí",
    "Kučera","Veselý","Horák","Němec","Marek","Pokorný","Pospíšil",
    "Hájek","Jelínek","Král","Růžička","Beneš","Fiala","Sedláček",
    "Doležal","Zeman","Kolář","Navrátil","Čermák","Urban","Vaněk",
    "Konečný","Šimek","Kratochvíl","Bláha","Tichý","Kříž","Pavlík",
    "Mach","Kopecký","Malý","Holub","Čech","Štěpánek","Kadlec",
    "Soukup","Beran","Havel","Bartoš","Polák","Musil","Křížek",
    "Valenta"
  ];

  const workloads = [10, 20, 30, 40];

  /** Vrátí náhodnou položku z pole */
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Vygeneruje náhodný věk */
  function getRandomAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Vygeneruje birthdate z věku */
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

  /** Upravení příjmení podle pohlaví */
  function adjustSurnameByGender(surname, gender) {
    if (gender === "female") {
      if (surname.endsWith("ý")) {
        return surname.slice(0, -1) + "á";
      }
      return surname + "ová";
    }
    return surname;
  }

  // 3. Generování
  const dtoOut = [];

  for (let i = 0; i < count; i++) {
    const gender = Math.random() < 0.5 ? "male" : "female";

    const name =
      gender === "male"
        ? getRandomItem(maleNames)
        : getRandomItem(femaleNames);

    let surname = getRandomItem(surnames);
    surname = adjustSurnameByGender(surname, gender);

    const randomAge = getRandomAge(age.min, age.max);
    const birthdate = generateBirthdate(randomAge);

    const workload = getRandomItem(workloads);

    dtoOut.push({
      name,
      surname,
      gender,
      birthdate,
      workload
    });
  }

  // 4. výstup 
  return dtoOut;
}
module.exports = { main };