//  window.onload = function () {
//         const video = document.getElementById('video');
//         const canvas = document.getElementById('canvas');
//         const resultText = document.getElementById('result');
//         const cameraBtn = document.getElementById('cameraBtn');

//         let cameraOn = false;
//         let stream = null;

//         cameraBtn.onclick = async function () {
//             if (!cameraOn) {
//                 try {
//                     stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                     video.srcObject = stream;
//                     video.classList.remove('hidden');
//                     cameraBtn.textContent = "Capture Mood";
//                     cameraOn = true;
//                 } catch (err) {
//                     alert("Camera not available: " + err);
//                 }
//             } else {
//                 // Capture the image
//                 const context = canvas.getContext('2d');
//                 context.drawImage(video, 0, 0, canvas.width, canvas.height);
//                 const imageData = canvas.toDataURL('image/jpeg');

//                 // Stop the camera
//                 if (stream) {
//                     stream.getTracks().forEach(track => track.stop());
//                 }

//                 video.classList.add('hidden');
//                 cameraBtn.textContent = "Open Camera";
//                 cameraOn = false;

//                 // Send image to Flask
//                 fetch('/analyze', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ image: imageData })
//                 })
//                 .then(res => res.json())
//                 .then(data => {
//                     resultText.textContent = data.mood
//                         ? `Detected Mood: ${data.mood}`
//                         : `Error: ${data.error}`;
//                     console.log(data.mood)
//                 })
//                 .catch(err => {
//                     resultText.textContent = "Error: " + err;
//                 });
//             }
//         };
//     };