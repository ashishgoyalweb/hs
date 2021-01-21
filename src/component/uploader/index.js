// import React, {useState} from "react";
// import axios from "axios";
// import { Progress } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./uploadStyle.css";
// import { BASE_URL } from "../../utilities/api";

// const ImageUploader = ({uploadedFiles, handleImagesChange, multiple}) => {
//     const [ loaded, setLoaded ] = useState(0);

//   const onFileChangeHandler = event => {
//     const files = Array.from(event.target.files);
//     const formData = new FormData();
//     let error = false;

//     files.forEach((file, i) => {
//       if (file.size > 5245329) {
//         toast.warn("Select Image Smaller than 5 MB");
//         error = true;
//         return;
//       }
//            formData.append('files', file);
//     });
//     if (!error) {
//       axios
//           .post(`${BASE_URL}/upload`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' },
//             onUploadProgress: ProgressEvent => {
//                 const loadedPercent = (ProgressEvent.loaded / ProgressEvent.total) * 100;
//                 setLoaded(loadedPercent)
//           }
//         })
//         .then(res => {
//           // then print response status
//           if (res.status === 200) {
//               setLoaded(0)
//             handleImagesChange(res.data);
//           } else {
//             toast.error("Something went wrong");
//           }
//         })
//         .catch(err => {
//           // then print response status
//           toast.error("upload fail");
//           console.log("Error ", err);
//         });
//     } else {
//       return;
//     }
//   };

//   const getImageAndUploadCard = () => {
//     let images = uploadedFiles ? uploadedFiles : [];
//     let arr = [];

//     images.forEach((image, index) => {
//       arr.push(
//         <div className="image-card" key={`image-${index}-img-upload`}>
//           <img
//             alt="imageess"
//             width="120px"
//             height="130px"
//             src={`${BASE_URL}${image.url}`}
//           />
//           <button
//             className="delete-icon"
//             onClick={() => deleteImage(image)}
//           >Delete</button>
//         </div>
//       );
//     });
//     if (!multiple && images.length > 0) {
//     } else {
//       arr.push(
//         <div key={`default-upload-btn`}>
//           <span className="hiddenFileInput">
//             <input
//               type="file"
//               multiple={multiple}
//               name="file"
//               accept="image/*"
//               onChange={onFileChangeHandler}
//             />
//           </span>
//         </div>
//       );
//     }

//     return arr;
//   };

//   const handleImageDeleteSuccess = item => {
//     handleImagesChange(
//       uploadedFiles.filter(
//         currentItem => currentItem.imgPublicId !== item.imgPublicId
//       )
//     );
//   };

//   const deleteImage = image => {
//     // delete image
//     fetch(`${BASE_URL}/upload/files/${image.id}`, {
//           method: "delete"
//         })
//           .then(() => handleImageDeleteSuccess(image))
//           .catch(e => console.log("Error deleting image ", e));
//   };
//     return (
//       <React.Fragment>
//         <div className="card-flex">{getImageAndUploadCard()}</div>
//         <div className="form-group">
//           <ToastContainer />
//           {loaded !== 0 && (
//             <Progress max="100" color="success" value={loaded}>
//               {Math.round(loaded, 2)}%
//             </Progress>
//           )}
//         </div>
//       </React.Fragment>
//     );
// }
// export default ImageUploader;
