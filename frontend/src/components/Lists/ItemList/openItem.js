// import React, { useContext } from "react";
// import UserContext from "../../../utils/Context/UserContextProvider";
// import AppContext from "../../../utils/Context/AppContextProvider";

// const openItem = ({ content, typeList, listID, isOpen }) => {
//   const { userID } = useContext(UserContext);
//   const { config, genreListTv, genreListMovie } = useContext(AppContext);
//   const handleClick = () => {
//     console.log("nothing");
//   };

//   return (
//     <div
//       className="openlist"
//       data-position={openList ? "open" : "close"}
//       onClick={handleClick}
//     >
//       <div
//         className="openlist__wrapper"
//         data-position={openList ? "open" : "close"}
//       >
//         <div
//           className="openlist__wrapper__image"
//           data-position={openList ? "open" : "close"}
//           style={
//             openList
//               ? {
//                   backgroundImage: `url('${
//                     config.base_url +
//                     config.poster_sizes[3] +
//                     content?.poster_path
//                   }')`,
//                 }
//               : { backgroundColor: "red" }
//           }
//         >
//           <img
//             src={imagePath(3, content)}
//             alt="logo of media"
//             data-position={openList ? "open" : "close"}
//           />
//         </div>

//         <div
//           className="openlist__wrapper__infos"
//           data-position={openList ? "open" : "close"}
//         >
//           <div
//             className="openlist__wrapper__infos--title"
//             data-position={openList ? "open" : "close"}
//           >
//             {content.title || content.name}
//           </div>
//           <div
//             className="openlist__wrapper__overview"
//             data-position={openList ? "open" : "close"}
//           >
//             {content.overview}
//           </div>
//           <div
//             className="openlist__wrapper__genres"
//             data-position={openList ? "open" : "close"}
//           >
//             {displayLikedMediaGenre(typeList)}
//           </div>
//           <div
//             className="openlist__wrapper__infos__attributes"
//             data-position={openList ? "open" : "close"}
//           >
//             <span
//               className="openlist__wrapper__infos__attributes__type"
//               data-position={openList ? "open" : "close"}
//             >
//               {content.media_type.toLowerCase() === "movie" ? (
//                 <div>
//                   <TheatersOutlinedIcon />
//                   <span>{content.media_type}</span>
//                 </div>
//               ) : (
//                 <div>
//                   <TvOutlinedIcon />
//                   <span>{content.media_type}</span>
//                 </div>
//               )}
//             </span>
//             <span>.</span>
//             <span
//               className="openlist__wrapper__infos__attributes__year"
//               data-position={openList ? "open" : "close"}
//             >
//               {content.first_air_date?.substring(0, 4) ||
//                 content.release_date?.substring(0, 4)}
//             </span>
//           </div>
//         </div>
//         <div
//           className="openlist__wrapper__delete"
//           data-position={openList ? "open" : "close"}
//           onClick={() => {
//             typeList === "like"
//               ? dislikeContent(content)
//               : removeContent(content.id);
//           }}
//         >
//           <DeleteIcon />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default openItem;
