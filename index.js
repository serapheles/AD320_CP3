/**
 * Name: Kyle Potempa
 * Date: 11/09/2023
 *
 * Calls the "Bored API" and displays the activity result.
 * I'm not going to pretend there's a great submission, but even after going through
 * https://github.com/public-apis/public-apis, there's really not much you can do with public APIs that
 * don't require authentication.
 */
"use strict";

(function () {

    // MODULE GLOBAL VARIABLES, CONSTANTS, AND HELPER FUNCTIONS CAN BE PLACED HERE

    /**
     * Add a function that will be called when the window is loaded.
     */
    window.addEventListener("load", init);

    /**
     * Adds an event listener after the page has loaded.
     */
    function init() {
        document.getElementById("boredButton").addEventListener("click", doStuff);
    }

    //API url
    const url = "http://www.boredapi.com/api/activity/";

    /**
     * Cleans up existing error messages or outputs, and calls the API to display a new activity.
     * Displays errors when they occur in an otherwise empty section.
     */
    function doStuff() {
        let active = document.getElementById("activity");
        if (active.hasChildNodes()) {
            active.removeChild(active.firstChild);
        }
        document.getElementById("error").innerText = "";

        fetch(url)
            .then(statusCheck)
            .then(response => response.json())
            .then(process)
            .catch((error) =>
                document.getElementById("error").innerText = ("Error with API request: " + error)
            );
    }

    /**
     * Appends a new text node to display the found activity. Not how I would do this if I wasn't bound
     * by the project requirements (specifically requiring the use of appendChild/removeChild).
     * Throws an error if the passed value (which *should* be a JSON object) doesn't have an "activity" field
     * (due to experience, I don't trust a "200 Ok" to necessarily be correct).
     * @param response The API response, ostensibly in JSON format.
     */
    function process(response) {
        if (Object.hasOwn(response, "activity")) {
            document.getElementById("activity")
                .appendChild(document.createTextNode(response["activity"]));
        } else {
            throw new Error("API response lacks an expected property.");
        }
    }

    /**
     * Helper function to return the response's result text if successful, otherwise
     * returns the rejected Promise result with an error status and corresponding text
     * @param {object} res - response to check for success/error
     * @return {object} - valid response if response was successful, otherwise rejected
     *                    Promise result
     */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

})();
