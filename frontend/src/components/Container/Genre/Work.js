// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import AppContext from "../../../utils/Context/AppContextProvider";

// const Work = () => {
//   const [data, setData] = useState([]);
//   const [mergedRawData, setMergedRawData] = useState([]);
//   const [mergedFixedGenreIds, setMergedFixedGenreIds] = useState([]);
//   const [allGenreWithScore, setAllGenreWithScore] = useState([]);
//   const { genreListTv, genreListMovie } = useContext(AppContext);
//   let genreValues = [...genreListMovie, ...genreListTv];

//   const checkDuplicateBeforeMerge = () => {
//     if (Object.keys(data).length > 0) {
//       let copyLiked = data.liked;
//       console.log(copyLiked);
//       copyLiked.forEach((elLike, indexLike) => {
//         data.listDataFormated.forEach((elList, indexList) => {
//           if (
//             elLike.id === elList.id &&
//             elLike.media_type === elList.media_type
//           ) {
//             elList.status = "liked";
//             copyLiked.splice(indexLike, 1);
//           }
//         });
//       });
//       setMergedRawData([...data.listDataFormated, ...copyLiked]);
//     } else {
//       return null;
//     }
//   };

//   const addUserRateToData = () => {
//     if (Object.keys(data).length > 0 && mergedFixedGenreIds) {
//       mergedFixedGenreIds.forEach((el) => {
//         data.rates.forEach((r) => {
//           if (el.id === r.id && el.media_type === r.media_type) {
//             el.rate = r.rate;
//           }
//         });
//       });
//     }
//   };

//   const addValues = () => {
//     if (mergedFixedGenreIds) {
//       let values = mergedFixedGenreIds
//         .map((data) => {
//           if (data.status === "liked") {
//             return [
//               data.genres,
//               data.vote_average,
//               data.userRate || 5,
//               2,
//               data.media_type,
//             ];
//           } else {
//             return [
//               data.genres,
//               data.vote_average,
//               data.userRate || 5,
//               1.5,
//               data.media_type,
//             ];
//           }
//         })
//         .map((value) => {
//           const score = +(
//             (1 + value[2] * 3.35 + value[1] * 1.95) *
//             value[3]
//           ).toFixed(4);

//           if (value[0].length > 1) {
//             let newObj = value[0].map((v) => {
//               return { id: v, score };
//             });
//             return newObj;
//           } else {
//             return { id: value[0], score };
//           }
//         })
//         .flat();
//       setAllGenreWithScore(values);
//     }
//   };

//   const handleGenreIds = () => {
//     let data = mergedRawData.map((d) => {
//       let mapIds = [];
//       d.genres.forEach((g) => {
//         if (g.id) {
//           mapIds.push(g.id);
//         } else {
//           mapIds = g;
//         }
//       });
//       return { ...d, genres: mapIds };
//     });
//     setMergedFixedGenreIds(data);
//   };

//   const sumScore = () => {
//     if (genreValues) {
//       genreValues = genreValues.map((g) => {
//         return { ...g, score: [], occurency: 0 };
//       });
//     }

//     for (let i = 0; i < allGenreWithScore.length; i++) {
//       for (let j = 0; j < genreValues.length; j++) {
//         if (allGenreWithScore[i].id === genreValues[j].id) {
//           genreValues[j].score.push(allGenreWithScore[i].score);
//           genreValues[j].occurency++;
//         }
//       }
//     }

//     let userPreferedGenre = genreValues.map((g) => {
//       console.log(g);
//       if (g.score.length > 0) {
//         let sumScore = g.score.reduce((a, b) => a + b);
//         return { ...g, score: +((sumScore / g.occurency) * 1.07).toFixed(3) };
//       } else return g;
//     });
//     console.log(userPreferedGenre);
//     return userPreferedGenre;
//   };

//   //   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await axios
//         .get(
//           "http://localhost:5000/recommendations/genre/63f930b073e7638e946c64e7"
//         )
//         .then((res) => {
//           setData(res.data);
//         });
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     checkDuplicateBeforeMerge();
//   }, [data]);

//   useEffect(() => {
//     handleGenreIds();
//   }, [mergedRawData]);

//   useEffect(() => {
//     addUserRateToData();
//     addValues();
//   }, [mergedFixedGenreIds]);

//   useEffect(() => {
//     sumScore();
//   }, [allGenreWithScore]);

//   return <div></div>;
// };

// export default Work;
