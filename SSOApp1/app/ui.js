// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");

const logDiv = document.getElementById("log");

function showWelcomeMessage(account) {

    console.log(account);

    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';

    // Name
    spanFa = document.createElement('i');

    console.log(account.idTokenClaims.idp);

    switch (account.idTokenClaims.idp) {
        case 'facebook.com':
            spanFa.className = "fab fa-facebook";
            break;
        case 'google.com':
            spanFa.className = "fab fa-google";
            break;
        default:
            spanFa.className = "fas fa-user";
            break;
    }

    liName = document.createElement('li');
    liName.innerHTML = `Hi! 👋`;
    liName.className = "list-group-item";

    liName.appendChild(spanFa);

    // Home Account ID
    liHomeAccountId = document.createElement('li');
    liHomeAccountId.innerHTML = `🏠 ${account.homeAccountId}`;
    liHomeAccountId.className = "list-group-item";

    welcomeDiv.append(liName);
    welcomeDiv.append(liHomeAccountId);

    signInButton.nextElementSibling.style.display = 'none';
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";


    // Show id token claims in the UI
    updateUI(account);

}

function updateUI(account) {

    data = account.idTokenClaims;
    var claims = document.createElement('pre');
    claims.innerHTML = JSON.stringify(data, null, 2);
    claims.className = "language-json";
    profileDiv.appendChild(claims);
}

function showMessage(message) {
    cardDiv.style.display = 'initial';

    // Home Account ID
    liLogIn = document.createElement('li');
    liLogIn.innerHTML = `🏚 You need to login somewhere...`;
    liLogIn.className = "list-group-item";

    welcomeDiv.append(liLogIn);
}

function showLog(message) {

    liElement = document.createElement('li');
    liElement.innerHTML = message;
    liElement.className = "list-group-item";
    logDiv.append(liElement);
}