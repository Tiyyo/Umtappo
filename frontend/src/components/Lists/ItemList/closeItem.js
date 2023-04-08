// import React from "react";

// const closeItem = ({ content, typeList, listID, isOpen }) => {
//   const handleClick = () => {
//     console.log("nothing");
//   };

//   return (
//     <div
//       className="item-list"
//       onClick={handleClick}
//       data-position={openList ? "open" : "close"}
//     >
//       <div
//         className="item-list__wrapper"
//         data-position={openList ? "open" : "close"}
//       >
//         <div
//           className="item-list__wrapper__image"
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
//           className="item-list__wrapper__infos"
//           data-position={openList ? "open" : "close"}
//         >
//           <div
//             className="item-list__wrapper__infos--title"
//             data-position={openList ? "open" : "close"}
//           >
//             {content.title || content.name}
//           </div>
//           <div
//             className="item-list__wrapper__infos__attributes"
//             data-position={openList ? "open" : "close"}
//           >
//             <span
//               className="item-list__wrapper__infos__attributes__type"
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
//               className="item-list__wrapper__infos__attributes__year"
//               data-position={openList ? "open" : "close"}
//             >
//               {content.first_air_date?.substring(0, 4) ||
//                 content.release_date?.substring(0, 4)}
//             </span>
//           </div>
//         </div>
//         <div
//           className="item-list__wrapper__delete"
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

// export default closeItem;
