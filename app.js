const firebaseConfig = {
           apiKey: "AIzaSyC0D0j5H_er4TYdRdQj7xqCiTCSas30YY0",
            authDomain: "backuptransksi.firebaseapp.com",
            databaseURL: "https://backuptransksi-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "backuptransksi",
            storageBucket: "backuptransksi.firebasestorage.app",
            messagingSenderId: "205255091131",
            appId: "1:205255091131:web:05bb8036f0d93cbf621a9e",
            measurementId: "G-QFJDCS967X"
            };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();




// FUNCTION UPLOAD
function uploadImage() {

  

 const file = document.getElementById("imageFile").files[0];
 const loading = document.getElementById("loading");



// cek jika file kosong 
if(!file){ 
  alert("Photo Selfie Masih Kosong !!,silahkan Ambil Photo Selfie.."); 
return; }

  loading.style.display = "block"; // tampilkan loading

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Absen-wika");
  preview.src = null;
  const imageUrl = null;

let xhr = new XMLHttpRequest();



  fetch("https://api.cloudinary.com/v1_1/deybh6pja/image/upload", {
    method: "POST",
    body: formData
  })












  
  .then(res => res.json())
  .then(data => {

    // URL CLOUDINARY
    const namabulan = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
    ];
    
    const imageUrl2 = data.secure_url;
    const imageUrl = imageUrl2 + "?v=" + Date.now();
    const now = new Date();
    const bulan = namabulan[now.getMonth()];
    const nama = localStorage.getItem("username");
    const jabatan = "Site Manager of Administratif";
    const tanggal = now.getDate()+String(new Date().getMonth() + 1).padStart(2,'0')+now.getFullYear();
    const tampilanBulan = now.getDate() + " " + bulan + " " + now.getFullYear();

    // PREVIEW
    document.getElementById("preview").src = imageUrl;
    document.getElementById("urlText").textContent = imageUrl;

    if(!file){ 
      alert("Photo Selfie Masih Kosong !!,silahkan Ambil Photo Selfie.."); 
    return; }

    // SIMPAN KE FIREBASE
    firebase.database().ref("absen/"+tanggal).push({
       photo: imageUrl,
        waktu: now.getHours() + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + now.getSeconds(),
        date: tampilanBulan,
        nama : nama
     
    });

     firebase.database().ref("periode/"+nama).push({
       photo: imageUrl,
        waktu: now.getHours() + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + now.getSeconds(),
        date: now.getDate()+String(new Date().getMonth() + 1).padStart(2,'0')+now.getFullYear(),
        nama : nama,
        tanggal:tampilanBulan
     
    });
    loading.style.display = "none"; // hilangkan loading
    alert("Photo Berhasil di Upload !!");
   
    document.getElementById("btnupload").style.display = "none";
    setTimeout(function(){
    location.reload();
    },2000);

  });

}