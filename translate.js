import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
const firebaseConfig = {
        apiKey: "AIzaSyCAn-t7PeQLmo5lIRFB_aSd0gtJaWfeIJs",
        authDomain: "project1-ed7ca.firebaseapp.com",
        projectId: "project1-ed7ca",
        storageBucket: "project1-ed7ca.appspot.com",
        messagingSenderId: "1055227392767",
        appId: "1:1055227392767:web:b028f641e39063fccd12ca"
      };
      // Are you using npm and a bundler like w

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbref = ref(db);

var transbutton = document.getElementById('translate')
var inp = document.getElementById('input')
var username = sessionStorage.getItem("username")
console.log(username)
// darkbut.addEventListener('click', darkpressed)
transbutton.addEventListener('click',buttonpressed)
function buttonpressed(){
    var inpval = inp.value;
    var inplang = 'en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ee9724626cmsh42a8affc83784adp10e3c9jsn0dd0a4f2fd2b',
            'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
    };
    const fus = ref(db, 'users/'+username);
            onValue(fus,(snapshot) => {
                    if(snapshot.exists()){
                    
                    var outlang = snapshot.val().Lang
                    console.log(outlang)
                    
                    fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${inplang}|${outlang}&q=${inpval}&mt=1&onlyprivate=0&de=a%40b.c`, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        console.log(data.responseData.translatedText)
                        let translatedtext = data.responseData.translatedText;
                        let utterance;
                        utterance = new SpeechSynthesisUtterance(translatedtext);
                        utterance.lang = outlang;
                        speechSynthesis.speak(utterance);
                    })
                    .catch(err => console.error(err))
                    }else{
                        console.log('no data available');
                    }
                
            
                });
}
