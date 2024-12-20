import { Prisma } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export const guestUsers: Prisma.UserCreateManyInput[] = [
  {
    id: createId(),
    name: "Jonas Schmedtmann",
    role: "GUEST",
    email: "hello@jonas.io",
    nationality: "Portugal",
    nationalID: "3525436345",
    countryFlag: "https://flagcdn.com/pt.svg",
  },
  {
    id: createId(),
    name: "Jonathan Smith",
    role: "GUEST",
    email: "johnsmith@test.eu",
    nationality: "Great Britain",
    nationalID: "4534593454",
    countryFlag: "https://flagcdn.com/gb.svg",
  },
  {
    id: createId(),
    name: "Jonatan Johansson",
    role: "GUEST",
    email: "jonatan@example.com",
    nationality: "Finland",
    nationalID: "9374074454",
    countryFlag: "https://flagcdn.com/fi.svg",
  },
  {
    id: createId(),
    name: "Jonas Mueller",
    role: "GUEST",
    email: "jonas@example.eu",
    nationality: "Germany",
    nationalID: "1233212288",
    countryFlag: "https://flagcdn.com/de.svg",
  },
  {
    id: createId(),
    name: "Jonas Anderson",
    role: "GUEST",
    email: "anderson@example.com",
    nationality: "Bolivia (Plurinational State of)",
    nationalID: "0988520146",
    countryFlag: "https://flagcdn.com/bo.svg",
  },
  {
    id: createId(),
    name: "Jonathan Williams",
    role: "GUEST",
    email: "jowi@gmail.com",
    nationality: "United States of America",
    nationalID: "633678543",
    countryFlag: "https://flagcdn.com/us.svg",
  },

  // GPT
  {
    id: createId(),
    name: "Emma Watson",
    role: "GUEST",
    email: "emma2@gmail.com",
    nationality: "United Kingdom",
    nationalID: "1234578901",
    countryFlag: "https://flagcdn.com/gb.svg",
  },
  {
    id: createId(),
    name: "Mohammed Ali",
    role: "GUEST",
    email: "mohammedali@yahoo.com",
    nationality: "Egypt",
    nationalID: "987543210",
    countryFlag: "https://flagcdn.com/eg.svg",
  },
  {
    id: createId(),
    name: "Maria Rodriguez",
    role: "GUEST",
    email: "maria2@gmail.com",
    nationality: "Spain",
    nationalID: "1098765321",
    countryFlag: "https://flagcdn.com/es.svg",
  },
  {
    id: createId(),
    name: "Li Mei",
    role: "GUEST",
    email: "li.mei@hotmail.com",
    nationality: "China",
    nationalID: "102934756",
    countryFlag: "https://flagcdn.com/cn.svg",
  },
  {
    id: createId(),
    name: "Khadija Ahmed",
    role: "GUEST",
    email: "khadija@gmail.com",
    nationality: "Sudan",
    nationalID: "1023457890",
    countryFlag: "https://flagcdn.com/sd.svg",
  },
  {
    id: createId(),
    name: "Gabriel Silva",
    role: "GUEST",
    email: "gabriel@gmail.com",
    nationality: "Brazil",
    nationalID: "109283465",
    countryFlag: "https://flagcdn.com/br.svg",
  },
  {
    id: createId(),
    name: "Maria Gomez",
    role: "GUEST",
    email: "maria@example.com",
    nationality: "Mexico",
    nationalID: "108765421",
    countryFlag: "https://flagcdn.com/mx.svg",
  },
  {
    id: createId(),
    name: "Ahmed Hassan",
    role: "GUEST",
    email: "ahmed@gmail.com",
    nationality: "Egypt",
    nationalID: "1077777777",
    countryFlag: "https://flagcdn.com/eg.svg",
  },
  {
    id: createId(),
    name: "John Doe",
    role: "GUEST",
    email: "johndoe@gmail.com",
    nationality: "United States",
    nationalID: "3245908744",
    countryFlag: "https://flagcdn.com/us.svg",
  },
  {
    id: createId(),
    name: "Fatima Ahmed",
    role: "GUEST",
    email: "fatima@example.com",
    nationality: "Pakistan",
    nationalID: "1089999363",
    countryFlag: "https://flagcdn.com/pk.svg",
  },
  {
    id: createId(),
    name: "David Smith",
    role: "GUEST",
    email: "david@gmail.com",
    nationality: "Australia",
    nationalID: "44450960283",
    countryFlag: "https://flagcdn.com/au.svg",
  },
  {
    id: createId(),
    name: "Marie Dupont",
    role: "GUEST",
    email: "marie@gmail.com",
    nationality: "France",
    nationalID: "06934233728",
    countryFlag: "https://flagcdn.com/fr.svg",
  },
  {
    id: createId(),
    name: "Ramesh Patel",
    role: "GUEST",
    email: "ramesh@gmail.com",
    nationality: "India",
    nationalID: "9875412303",
    countryFlag: "https://flagcdn.com/in.svg",
  },
  {
    id: createId(),
    name: "Fatimah Al-Sayed",
    role: "GUEST",
    email: "fatimah@gmail.com",
    nationality: "Kuwait",
    nationalID: "0123456789",
    countryFlag: "https://flagcdn.com/kw.svg",
  },
  {
    id: createId(),
    name: "Nina Williams",
    role: "GUEST",
    email: "nina@hotmail.com",
    nationality: "South Africa",
    nationalID: "2345678901",
    countryFlag: "https://flagcdn.com/za.svg",
  },
  {
    id: createId(),
    name: "Taro Tanaka",
    role: "GUEST",
    email: "taro@gmail.com",
    nationality: "Japan",
    nationalID: "3456789012",
    countryFlag: "https://flagcdn.com/jp.svg",
  },
  {
    id: createId(),
    name: "Abdul Rahman",
    role: "GUEST",
    email: "abdul@gmail.com",
    nationality: "Saudi Arabia",
    nationalID: "4567890123",
    countryFlag: "https://flagcdn.com/sa.svg",
  },
  {
    id: createId(),
    name: "Julie Nguyen",
    role: "GUEST",
    email: "julie@gmail.com",
    nationality: "Vietnam",
    nationalID: "5678901234",
    countryFlag: "https://flagcdn.com/vn.svg",
  },
  {
    id: createId(),
    name: "Sara Lee",
    role: "GUEST",
    email: "sara@gmail.com",
    nationality: "South Korea",
    nationalID: "6789012345",
    countryFlag: "https://flagcdn.com/kr.svg",
  },
  {
    id: createId(),
    name: "Carlos Gomez",
    role: "GUEST",
    email: "carlos@yahoo.com",
    nationality: "Colombia",
    nationalID: "7890123456",
    countryFlag: "https://flagcdn.com/co.svg",
  },
  {
    id: createId(),
    name: "Emma Brown",
    role: "GUEST",
    email: "emma@gmail.com",
    nationality: "Canada",
    nationalID: "8901234567",
    countryFlag: "https://flagcdn.com/ca.svg",
  },
  {
    id: createId(),
    name: "Juan Hernandez",
    role: "GUEST",
    email: "juan@yahoo.com",
    nationality: "Argentina",
    nationalID: "4343433333",
    countryFlag: "https://flagcdn.com/ar.svg",
  },
  {
    id: createId(),
    name: "Ibrahim Ahmed",
    role: "GUEST",
    email: "ibrahim@yahoo.com",
    nationality: "Nigeria",
    nationalID: "2345678009",
    countryFlag: "https://flagcdn.com/ng.svg",
  },
  {
    id: createId(),
    name: "Mei Chen",
    role: "GUEST",
    email: "mei@gmail.com",
    nationality: "Taiwan",
    nationalID: "3456117890",
    countryFlag: "https://flagcdn.com/tw.svg",
  },
];
