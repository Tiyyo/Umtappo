// import { motion } from "framer-motion";
// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const RecommendCard = (props) => {
//   const { content, config } = props;
//   const [open, setOpen] = useState(false);
//   const [genreList, setGenreList] = useState([]);
//   const imageFormatUrl = (el, number) => {
//     return config.base_url + config.backdrop_sizes[number] + el.backdrop_path;
//   };

//   const openModal = () => {
//     setOpen(true);
//   };

//   const pullModalState = (state) => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     const fetchGenreList = async () => {
//       const result = await axios
//         .get(
//           "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR"
//         )
//         .then((res) => setGenreList(res.data.genres));
//     };
//     fetchGenreList();
//   }, []);

//   return (
//     <>
//       {/* <Modal
//         key={content.id}
//         modalState={open}
//         element={content}
//         genres={genreList}
//         getModalState={pullModalState}
//       /> */}
//       <motion.div className="recommend-card">
//         <Link to={content.id.toString()} state={{ content, config, genreList }}>
//           <img
//             src={imageFormatUrl(content, 0)}
//             alt={"poster of " + content.title || content.original_name}
//             onClick={openModal}
//           />
//           <p>{content.title || content.original_name}</p>
//         </Link>
//       </motion.div>
//     </>
//   );
// };

// export default RecommendCard;
