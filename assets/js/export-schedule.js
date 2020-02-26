// Client ID and API key from the Developer Console
var CLIENT_ID = "116826500406-mv5tofp653v9guq91scjtrbn361j8epr.apps.googleusercontent.com";
var API_KEY = "AIzaSyAtLz6YG7qceOE4o46_T8mDJppfFxE5slI";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.events";

var exportButton = document.getElementById('authorize-google');
var signoutButton = document.getElementById('signout-google');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        exportButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        saveEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function Event(summary, start, end) {
	this.summary = summary;
	this.start = start;
	this.end = end;
}

function saveEvents() {
    let pages = savedData.books[savedData.currentBook].goalPages;
    savedData.books[savedData.currentBook].readingDates.forEach(function (value, i) {

        // set the start time and end time in the date object according to the user input:
        let timeSplit = savedData.books[savedData.currentBook].readingTime.split(":");
        value.setHours(timeSplit[0], timeSplit[1], 0);
        var endDate = new Date(value.getTime() + savedData.books[savedData.currentBook].readingDuration*60000);

        let pagesRange = "";
        if(i == (savedData.books[savedData.currentBook].readingDates.length - 1)) {
            pagesRange = "the last pages";
        } else {
            pagesRange = `pages ${pages * i} - ${pages * i + pages - 1}`;
        }

        let event = new Event(
            `Read ${pagesRange} of '${savedData.books[savedData.currentBook].bookTitle}'`,
            {"dateTime": value.toISOString()},
            {"dateTime": endDate.toISOString()} // add minutes
        )

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function(event) {
            appendPre('Event created: ' + event.htmlLink);

        });
    });
}