const { languages } = useContext(AppContext);
const [array, setArray] = useState([]);
let numMaxOfContentToDisplay = 12;
let numMaxCardsForContainer = 4;

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 105);
};

const generateUniqueIndex = (arr) => {
  const randomNumber = generateRandomNumber(105);
  if (!arr.includes(randomNumber) || arr.length === 0) {
    pushToArray(arr, randomNumber);
  } else {
    generateUniqueIndex(arr);
  }
};

const pushToArray = (arr, number) => {
  arr.push(number);
};

function splitMainArray(arr, parts) {
  let result = [];
  const copy = [...arr];
  for (let i = parts; i > 0; i--) {
    result.push(copy.splice(0, Math.ceil(copy.length / i)));
  }
  return result;
}

// const generateArraysIndexMovies = (
//   arr,
//   numMaxOfContentToDisplay,
//   numMaxCardsForContainer
// ) => {
//   while (arr.length < numMaxOfContentToDisplay) {
//     generateUniqueIndex(arr);
//   }
//   const splitValues = splitMainArray(arr, numMaxCardsForContainer);
//   return splitValues;
// };

// const memoized = useCallback(
//   generateArraysIndexMovies(
//     array,
//     numMaxOfContentToDisplay,
//     numMaxCardsForContainer
//   ),
//   [languages]
// );

// console.log(memoized);

return generateArraysIndexMovies(
  array,
  numMaxOfContentToDisplay,
  numMaxCardsForContainer
);
// };
