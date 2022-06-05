interface ITitleGroup {
  title: string;
  sameTitles: string[];
}

const titles: ITitleGroup[] = [
  {
    title: "Faire la paix avec votre héritage familial",
    sameTitles: [
      "Comprendre et faire la paix avec son héritage familial",
      "Comprendre et se débarrasser de son héritage familial",
      "Comprendre et interpréter son héritage familial",
      "Construire et interpréter son héritage familial",
      "Faire la paix avec son héritage familial",
      "Faire la paix avec votre héritage familial",
    ],
  },
  {
    title: "Sortir des relations toxiques",
    sameTitles: [
      "Se protéger des relations toxiques",
      "Sortir des relations toxiques (ou les éviter)",
      "Comment sortir des relations toxiques (ou les éviter)",
      "Sortir des relations toxiques",
    ],
  },
];

export { titles, type ITitleGroup };
