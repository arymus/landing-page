async function getRepos() {
    try { // Try to run the block of code below, catching and handling errors
        const url = "https://api.github.com/users/arymus/repos"; // The GitHub API to pull repositories
        const res = await fetch(url); // Send a GET request to the URL (await pauses function until fetch completes)
        if (res.status != 200) throw new Error(`HTTP Status ${res.status} ${res.statusText}`); // If the response is not 200 (OK), throw an error
        const data = await res.json(); // Convert the response body to a JavaScript object (await pauses function until JSON parsing completes)
        return data; // Return the data
    } catch (e) { alert(e); } // Alert any errors that are caught
    
}

async function getLangs(repo) {
    try {
        const res = await fetch(repo.languages_url);
        if (res.status != 200) throw new Error(`HTTP Status ${res.status} ${res.statusText}`);
        const data = await res.json();
        const languages = Object.keys(data); // Get the keys of the object returned from the API (the languages, the API has a language and the amoutn of lines associated with it)
        return languages;
    } catch (e) { alert(e); }
}

function parseName(name) {
  const words = name.split("-"); // Split the name string into words
  
  // Capitalize the first letter of each word and leave the rest of the word in lowercase
  const parsedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return parsedWords.join(" "); // Join the words back together with a space between them
}

async function displayRepos() {
    const repos = await getRepos(); // Call the function that gets the repositories from the GitHub API (the repos come as an array of objects)
    
    console.log(repos);
    for (let repo of repos) { // Iterate over each repository
        const repoContainer = document.createElement("div");
        repoContainer.classList.add("repo"); // Give the div a class of .repo

        // Styles for the repository container
        const repoContainerStyles = {
            backgroundColor: "#FFFFFF",
            margin: "20px",
            padding: "10px",
            border: "2px solid #000000",
            borderRadius: "16px",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }

        Object.assign(repoContainer.style, repoContainerStyles);

        const repoInfo = { // Create an object with information from the API
            name: parseName(repo.name),
            desc: repo.description,
            url: repo.html_url,
            lang: await getLangs(repo),
        };

        const nameText = document.createElement("a");
        nameText.innerText = repoInfo.name;
        nameText.href = repoInfo.url;

        const descText = document.createElement("p");
        descText.innerText = repoInfo.desc === null ? "[No description]" : repoInfo.desc; // If the repository has no description is null (has no desc), then put [No description]. If else, put the description

        const langText = document.createElement("p");
        langText.classList.add("langs"); // Add a class of .langs to the p element
        for (i in repoInfo.lang) langText.innerText += repoInfo.lang[i] + ", ";  // Add the language to the element's innerText (plus a comma)

        // Append all the newly made elements to the repo container and then append the repo container to the projects section
        repoContainer.appendChild(nameText);
        repoContainer.appendChild(descText);
        repoContainer.appendChild(langText);
        document.querySelector(".repositories").appendChild(repoContainer);
    }
}

displayRepos();