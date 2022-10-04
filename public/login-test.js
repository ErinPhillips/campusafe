 // Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, doc, setDoc, updateDoc, Timestamp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyA2VlnfV-C4zfSxPb5IL6A_EGKQUpOcRNM",
    authDomain: "campusafe-a2b00.firebaseapp.com",
    databaseURL: "https://campusafe-a2b00-default-rtdb.firebaseio.com",
    projectId: "campusafe-a2b00",
    storageBucket: "campusafe-a2b00.appspot.com",
    messagingSenderId: "25832027624",
    appId: "1:25832027624:web:9e497054e1cf41df91205d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
    
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
            // Signed in. redirect to home page
            // update last login in database
                const uid = userCredential.user.uid;
                const docRef = doc(db, "Users", uid)
                await updateDoc(docRef, {
                    lastLogin: Timestamp.now()
                });
                location.replace("./index.html");         
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            
            });
            // sign in failed
            setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault();
        var first = document.getElementById('firstName').value;
        var last = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
            // Registered successfuly, redirect to login page
            const uid = userCredential.user.uid;
            await setDoc(doc(db, "Users", uid), {
                exports.beforeCreate = functions.auth.user().beforeCreate((user, context) => {
                  // (If the user is authenticating within a tenant context, the tenant ID can be determined from
                  // user.tenantId or from context.resource, e.g. 'projects/project-id/tenant/tenant-id-1')

                  // Only users of a specific domain can sign up.
                  if (user.email.indexOf('@g.cofc.edu') === -1) {
                    throw new functions.auth.HttpsError('invalid-argument', `Unauthorized email "${user.email}"`);
                  }
                });
                    firstName: first,
                    lastName: last,
                    email: email,
                    dateCreated: Timestamp.now(),
                    lastLogin: Timestamp.now()
                })
                console.log("doc created");
                location.replace("./login.html");
            })        
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // registration failed
            });
   
   setFormMessage(createAccountForm, "error", "Invalid username/password combination");
            
        });
    });
