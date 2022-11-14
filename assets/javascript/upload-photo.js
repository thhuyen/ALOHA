 //CHANGE EVENT FOR UPLOADING PHOTOS

 var file = document.querySelector("#file");
 var output = document.querySelector("#result");

 var fileUpdate = document.querySelector("#file-update");
 var outputUpdate = document.querySelector("#result-update");

 // code cũ

//  document.querySelector("#file").addEventListener("change", (e) => {
//     if (window.File && window.FileReader && window.FileList && window.Blob) { //CHECK IF FILE API IS SUPPORTED
//       const files = e.target.files; //FILE LIST OBJECT CONTAINING UPLOADED FILES
//       const output = document.querySelector("#result");
//       output.innerHTML = "";
//       for (let i = 0; i < files.length; i++) { // LOOP THROUGH THE FILE LIST OBJECT
//           if (!files[i].type.match("image")) continue; // ONLY PHOTOS (SKIP CURRENT ITERATION IF NOT A PHOTO)
//           const picReader = new FileReader(); // RETRIEVE DATA URI 
//           picReader.addEventListener("load", function (event) { // LOAD EVENT FOR DISPLAYING PHOTOS
//             const picFile = event.target;
//             const div = document.createElement("div");
//             div.innerHTML = `<img class="thumbnail" src="${picFile.result}" title="${picFile.name}"/>`;
//             output.appendChild(div);
//           });
//           picReader.readAsDataURL(files[i]); //READ THE IMAGE
//       }
//     } else {
//       alert("Định dạng ảnh của bạn không được hỗ trợ");
//     }
//   });

 
 function uploadImage(currentElement, img) {
   
   currentElement.addEventListener("change", function() {
     changeImage(this);
   });
   function changeImage(input) {
     var reader;
   
     if (input.files && input.files[0]) {
       reader = new FileReader();
   
       reader.onload = function(e) {
         img.setAttribute('src', e.target.result);
       }
   
       reader.readAsDataURL(input.files[0]);
     }
  }
 }

 uploadImage(file, output);
 uploadImage(fileUpdate, outputUpdate);