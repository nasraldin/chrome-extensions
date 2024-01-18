window.onload = function () {
  const fileName = localStorage.getItem("fileName");
  const fileContent = localStorage.getItem("fileContent");
  if (fileName && fileContent) {
    document.getElementById("fileInfo").innerHTML = `
                <p>Name: ${fileName}</p>
                <p>Content:</p>
                <pre>${fileContent}</pre>
            `;
  } else {
    document.getElementById("fileInfo").innerText = "No file data available.";
  }
};
