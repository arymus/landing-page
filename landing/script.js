async function getRepos() {

    // Try to run the block of code below, catching and handling errors
    try {
        const url = ""; // The GitHub API to pull repositories
        const res = await fetch(url); // Send a GET request to the URL (await pauses function until fetch completes)
        if (res.status != 200) throw new Error("HTTP Error: " + res.statusText); // If the response is not 200 (OK), throw an error
    } catch (e) { alert(e); } // Alert any errors that are caught

    const data = await res.json(); // Convert the response body to a JavaScript object (await pauses function until JSON parsing completes)
    return data; // Return the data
}

async function displayRepositories() {
    const repos = await getRepos(); // Call the getRepos function (await pauses function until we get the data)
}