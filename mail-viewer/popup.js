document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  let darkMode;

  const sunIconSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6" fill="#FFD700"/>
  <line x1="12" y1="1" x2="12" y2="5" stroke="#FFD700" stroke-width="2"/>
  <line x1="12" y1="23" x2="12" y2="19" stroke="#FFD700" stroke-width="2"/>
  <line x1="23" y1="12" x2="19" y2="12" stroke="#FFD700" stroke-width="2"/>
  <line x1="5" y1="12" x2="1" y2="12" stroke="#FFD700" stroke-width="2"/>
  <line x1="18.364" y1="5.63604" x2="16.2427" y2="7.75736" stroke="#FFD700" stroke-width="2"/>
  <line x1="7.75736" y1="16.2426" x2="5.63604" y2="18.364" stroke="#FFD700" stroke-width="2"/>
  <line x1="18.364" y1="18.364" x2="16.2427" y2="16.2426" stroke="#FFD700" stroke-width="2"/>
  <line x1="7.75736" y1="5.63604" x2="5.63604" y2="7.75736" stroke="#FFD700" stroke-width="2"/>
</svg>`;
  const moonStarsSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 2C9.37258 2 4 7.37258 4 14C4 20.6274 9.37258 26 16 26C22.6274 26 28 20.6274 28 14C28 10.6863 26.525 7.68629 24 5.99999C23.0007 8.83743 20.2431 10.9999 17 10.9999C13.134 10.9999 10 8.13401 10 4.99999C10.2167 4.99999 10.4318 4.99999 10.6451 4.99999C11.5251 3.52501 13.6863 2 16 2Z" fill="#0000FF"/>
  <path d="M1 5L3 6L1 7V5Z" fill="#0000FF"/>
  <path d="M5 18L7 19L5 20V18Z" fill="#0000FF"/>
  <path d="M18 20L20 21L18 22V20Z" fill="#0000FF"/>
</svg>`;

  // Function to apply the theme
  const applyTheme = (dark) => {
    if (dark) {
      document.body.classList.add("dark-mode");
      themeToggle.innerHTML = moonStarsSVG;

      document.documentElement.style.setProperty("--background-color", "#333");
      document.documentElement.style.setProperty("--text-color", "#FFF");
      document.documentElement.style.setProperty(
        "--button-bg-color",
        "#45a049"
      );
      document.documentElement.style.setProperty("--button-text-color", "#FFF");
    } else {
      document.body.classList.remove("dark-mode");
      themeToggle.innerHTML = sunIconSVG;

      document.documentElement.style.setProperty("--background-color", "#FFF");
      document.documentElement.style.setProperty("--text-color", "#000");
      document.documentElement.style.setProperty(
        "--button-bg-color",
        "#4CAF50"
      );
      document.documentElement.style.setProperty("--button-text-color", "#FFF");
    }
  };

  // Check local storage for theme preference
  const storedDarkMode = localStorage.getItem("darkMode");
  if (storedDarkMode) {
    darkMode = storedDarkMode === "true";
  } else {
    // If no preference is stored, use system preference
    darkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Apply the initial theme
  applyTheme(darkMode);

  // Toggle button event listener
  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    applyTheme(darkMode);
  });
});

// document
//   .getElementById("file-input")
//   .addEventListener("change", function (event) {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("EML file selected:", file.name);
//       // Add code here to handle the EML file
//     }
//   });

// document
//   .getElementById("file-input")
//   .addEventListener("change", function (event) {
//     const file = event.target.files[0];
//     if (file && file.name.endsWith(".eml")) {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const newWindow = window.open("", "_blank");
//         newWindow.document.title = file.name; // Set the file name as window title

//         // Display basic info in the new window
//         newWindow.document.write(`<h1>File Information</h1>`);
//         newWindow.document.write(`<p>Name: ${file.name}</p>`);
//         newWindow.document.write(`<p>Type: ${file.type}</p>`);
//         newWindow.document.write(`<p>Size: ${file.size} bytes</p>`);
//         // Add more file information as needed
//       };

//       reader.onload = function (e) {
//         const newWindow = window.open("", "_blank");
//         newWindow.document.write(`<h1>File Contents</h1>`);
//         newWindow.document.write(`<pre>${e.target.result}</pre>`);
//       };
//       reader.readAsText(file);
//     } else {
//       alert("Please select a valid .eml file.");
//     }
//   });

document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".msg")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Store file content in local storage
        localStorage.setItem("fileContent", e.target.result);
        localStorage.setItem("fileName", file.name);

        // Open a new tab
        const newWindow = window.open("file-viewer.html", "_blank"); // Use a dedicated HTML file
      };
      reader.readAsText(file);
    } else {
      alert("Please select a valid .msg file.");
    }
  });
