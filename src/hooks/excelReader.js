import React from "react";
import readXlsxFile from "read-excel-file";

export async function excelFileReader(file) {
  let fileContent;
  await readXlsxFile(file).then((res) => {
    fileContent = res;
  });
  return fileContent;
}

export function searchColumnIndex(columns, columnName) {
  return columns.indexOf(columnName);
}

export function filterCards(cards, cardsTags, cardIndex) {
  const cardsWantedInformation = [];

  let filteredCards = cards.filter((card) =>
    cardsTags.includes(card[cardIndex.tag])
  );

  filteredCards.forEach((card) => {
    cardsWantedInformation.push({
      code: card[cardIndex.code],
      tag: card[cardIndex.tag],
      wishlists: card[cardIndex.wishlists],
    });
  });

  cardsWantedInformation.sort((cardOne, cardTwo) => {
    return cardOne.wishlists - cardTwo.wishlists;
  });

  return cardsWantedInformation;
}
