 /*
TODOS
[x] only allow cofc emails to register - Erin
[] only allow registration of one account per email
[x] error messages for invalid credentials - Erin
[] login doesnt work for chrome
[] check if login is good for safari
[x] forgot password link - Erin
[] somehow integrate "states" that customize the users experience based on their data. 
https://firebase.google.com/docs/auth/web/manage-users?authuser=1
^^ lots of tools for managing users -- reset password etc. 
*/

 // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, doc, setDoc, updateDoc, Timestamp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2VlnfV-C4zfSxPb5IL6A_EGKQUpOcRNM",
    authDomain: "campusafe-a2b00.firebaseapp.com",
    databaseURL: "https://campusafe-a2b00-default-rtdb.firebaseio.com",
    projectId: "campusafe-a2b00",
    storageBucket: "campusafe-a2b00.appspot.com",
    messagingSenderId: "25832027624",
    appId: "1:25832027624:web:9e497054e1cf41df91205d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Firestore Database and get a reference to the service
const db = getFirestore(app);

// create error message
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

// event listener for the links to login or create account page
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login"); //the login button
    const createAccountForm = document.querySelector("#createAccount"); // the create account button
    const forgotPassForm = document.querySelector("#resetPassword"); // the forgot password button

    // event listener for "need to create account?" link
    // redirects to create account form when clicked
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    // event listener for "already have an account? sign in" link
    // redirects to login form when clicked
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        createAccountForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    // event listener for "forgot password? link
    // redirects to forgot password form when clicked
    document.querySelector("#linkForgotPass").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        forgotPassForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkCancel").addEventListener("click", e => {
        e.preventDefault();
        forgotPassForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    // event listener for login button
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        var email = document.getElementById('logEmail').value; //extract email from form
        var password = document.getElementById('logPassword').value; //extract password from form
        signInWithEmailAndPassword(auth, email, password) // imported firebase method for authentication of credentials
            .then(async (userCredential) => {
                // Signed in
                const uid = userCredential.user.uid; // extract the UID generated by firebase authentication
                // update last login in database
                const docRef = doc(db, "Users", uid)
                await updateDoc(docRef, {
                    lastLogin: Timestamp.now()
                });
                // Redirect to home page
                location.replace("./index.html");         
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // sign in failed
                setFormMessage(loginForm, "error", "Invalid username/password combination");
            });
    });


    // even listener for create account button
    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault();
        // extracting values from create account form
        var first = document.getElementById('firstName').value;
        var last = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var cpassword = document.getElementById('verifPass').value;
        // this if statement actually prohibits a user from continuing if inputs are not valid or email is already registered
        if(validateEmail(email) && passwordMatch(password, cpassword)) { 
            createUserWithEmailAndPassword(auth, email, password) // // firebase method for creating a user - this adds the user to the authentication
                .then(async (userCredential) => {
                // Registered successfuly
                const uid = userCredential.user.uid; // extract UID from firebase auth
                await setDoc(doc(db, "Users", uid), {
                    // add to DB, get user info
                    firstName: first,
                    lastName: last,
                    email: email,
                    dateCreated: Timestamp.now(),
                    lastLogin: Timestamp.now()
                })
                // redirect to login page
                console.log("doc created");
                location.replace("./login.html"); // redirect to log in page -- maybe redirect to home??
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // registration failed
                    setFormMessage(createAccountForm, "error", "Account Creation Failed.");
                });
            }
        else {
            setFormMessage(createAccountForm, "error", "Invalid email or passwords do not match. Please try again.");
        }
        });

        // event listener for login button
    forgotPassForm.addEventListener("submit", e => {
        e.preventDefault();
        var email = document.getElementById('tryEmail').value; //extract email from form
        sendPasswordResetEmail(auth, email)
            .then(async() => {
                // password reset email sent!
                setFormMessage(forgotPassForm, "success", "Password reset email sent successfully");
                setTimeout(function() {
                    location.replace("./login.html"); // redirect to log in page after few seconds. 
                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setFormMessage(forgotPassForm, "error", "That email is not registered. Please try again. ")
            });
    });

    // error messages for invalid inputs -- DOES NOT STOP USER FROM CONTINUING. 
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "firsName" && e.target.value === "") {
                setInputError(inputElement, "This field cannot be empty");
            }
            if (e.target.id === "lastName" && e.target.value === "") {
                setInputError(inputElement, "This field cannot be empty");
            }
            if (e.target.id === "email" && !validateEmail(e.target.value)) {
                setInputError(inputElement, "Must be a valid CofC email");
            }
            if (e.target.id === "verifPass" && !passwordMatch(e.target.value, document.getElementById('password').value)) {
                setInputError(inputElement, "Passwords do no match");
            }
            
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


function validateEmail(email) {
    var student = new RegExp("@g.cofc.edu", );
    var staff = new RegExp("@cofc.edu", );

    if(student.test(email) || staff.test(email)) {
        return true;
    }
    else { return false; }
}

function passwordMatch(pwd, cpwd) {
    if(pwd === cpwd) {
        return true;
    }
    else {return false; }
}





// I have read that doing this type of verification is not safe/secure on client side(this way)
// may need to look into cloud functions for firebase 
//https://firebase.google.com/docs/functions
// EDIT- this cost money :) but we could store all of our code in firebase under the functions tab...
// function existingUser(email) {
//    getUserByEmail(email)
//    .then((userRecord) => {
//         //user exists. Do not allow sign-up
//         return false;
//    })
//    .catch((error) => {
//         //user does not exist. Continue with sign up
//         return true;
//    })
// }

