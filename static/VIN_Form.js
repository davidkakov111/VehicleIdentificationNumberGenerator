// When the DOM content is loaded, execute the following script
document.addEventListener("DOMContentLoaded", function () {
  // Get the buttons from the DOM
  var generateButton = document.querySelector(".generate");
  var searchButton = document.querySelector(".search");
  var addButton = document.querySelector(".add");
  var VINButton = document.querySelector(".vin_numbers");

  // Event listener for the generate button
  generateButton.addEventListener("click", function () {
    // Get all input and select elements
    var inputs = document.querySelectorAll("input, select");
    // Validate the inputs
    const ValidatedResponse = ValidateInput(inputs);
    // If inputs are valid, build the VIN and display it; otherwise, display an error
    if (ValidatedResponse.length === 0) {
      const VIN = BuildVIN(inputs);
      alert(`VIN number in string format: ${VIN}`);
    } else {
      alert(ValidatedResponse[0]);
    }
  });

  // Event listener for the search button
  searchButton.addEventListener("click", function () {
    // Get all input and select elements
    var inputs = document.querySelectorAll("input, select");
    // Validate the inputs for search
    const ValidatedResponse = ValidateInputForSearch(inputs);
    // If inputs are valid, create data object and send POST request for search
    if (ValidatedResponse.length === 0) {
      const data = {
        version: Number(inputs[1].value),
        equipment_code: inputs[2].value,
        year_of_issue: Number(inputs[3].value),
        place_of_production: inputs[5].value,
      };
      // Receive and handle serial number response
      const serial_number = POSTSearch(data);
      if (serial_number) {
        document.getElementById("id_serial_number").value = serial_number;
      }
    } else {
      alert(ValidatedResponse[0]);
    }
  });

  // Event listener for the add button
  addButton.addEventListener("click", function () {
    // Get all input and select elements
    var inputs = document.querySelectorAll("input, select");
    // Validate the inputs
    const ValidatedResponse = ValidateInput(inputs);
    // If inputs are valid, create data object and send POST request to save data
    if (ValidatedResponse.length === 0) {
      const data = {
        version: Number(inputs[1].value),
        equipment_code: inputs[2].value,
        year_of_issue: Number(inputs[3].value),
        serial_number: inputs[4].value,
        place_of_production: inputs[5].value,
      };
      // Receive and handle response from saving data
      alert(POSTSave(data));
    } else {
      alert(ValidatedResponse[0]);
    }
  });

  // Event listener for the VIN button
  VINButton.addEventListener("click", function () {
    // Get VIN numbers from the database
    const VINNumbers = GetVINNumbers();
    // If VIN numbers are available, create HTML for the VIN island and insert it into the container
    if (VINNumbers) {
      var vinIslandHTML = `
        <div class="VINisland">
            <h2 class="text-center">Saved VIN Numbers</h2>
            <table>
                <thead>
                    <tr>
                      <th>VIN Numbers</th>
                    </tr>
                </thead>
                <tbody>
                    ${VINNumbers.map((vin) => `<tr><td>${vin}</td></tr>`).join(
                      ""
                    )}
                </tbody>
            </table>
        </div>
      `;
      // Insert the VIN numbers island HTML into the specified DIV container
      document.getElementById("VIN_container").innerHTML = vinIslandHTML;
    }
  });
});

// Function to validate input fields before form submission
function ValidateInput(inputs) {
  let response = [];
  for (let input of inputs) {
    // Check version number
    if (input.name === "version") {
      if (
        999 < Number(input.value) ||
        Number(input.value) < 0 ||
        input.value === ""
      ) {
        response.push("The version number must be in the range of 0 to 999");
        break;
      }
    }
    // Check year of issue number
    else if (input.name == "year_of_issue") {
      if (
        99 < Number(input.value) ||
        Number(input.value) < 0 ||
        input.value === ""
      ) {
        response.push(
          "The year of issue number must be in the range of 0 to 99"
        );
        break;
      }
    }
    // Check serial number
    else if (input.name == "serial_number") {
      if (
        1999999 < Number(input.value) ||
        Number(input.value) < 1000000 ||
        input.value === ""
      ) {
        response.push(
          "The serial number must be in the range of 1000000 to 1999999"
        );
        break;
      }
    }
    // Check equipment code
    else if (input.name == "equipment_code" && input.value === "") {
      response.push("Please select an equipment code");
      break;
    }
    // Check place of production
    else if (input.name == "place_of_production" && input.value === "") {
      response.push("Please select the place of production");
      break;
    }
  }
  return response;
}

// Function to validate input fields before performing a search
function ValidateInputForSearch(inputs) {
  let response = [];
  for (let input of inputs) {
    // Check version number
    if (input.name === "version") {
      if (
        999 < Number(input.value) ||
        Number(input.value) < 0 ||
        input.value === ""
      ) {
        response.push("The version number must be in the range of 0 to 999");
        break;
      }
    }
    // Check year of issue number
    else if (input.name == "year_of_issue") {
      if (
        99 < Number(input.value) ||
        Number(input.value) < 0 ||
        input.value === ""
      ) {
        response.push(
          "The year of issue number must be in the range of 0 to 99"
        );
        break;
      }
    }
    // Check equipment code
    else if (input.name == "equipment_code" && input.value === "") {
      response.push("Please select an equipment code");
      break;
    }
    // Check place of production
    else if (input.name == "place_of_production" && input.value === "") {
      response.push("Please select the place of production");
      break;
    }
  }
  return response;
}

// Function to build the VIN number based on input values
function BuildVIN(inputs) {
  const version = Number(inputs[1].value);
  let versionStr = "";
  const equipment_code = inputs[2].value;
  const year_of_issue = Number(inputs[3].value);
  let year_of_issueStr = "";
  const serial_number = inputs[4].value;
  const place_of_production = inputs[5].value;

  // Add leading zeros if necessary to version and year_of_issue
  if (String(version).length === 2) {
    versionStr = "0" + version;
  } else if (String(version).length === 1) {
    versionStr = "00" + version;
  } else if (String(version).length === 3) {
    versionStr = version;
  }

  if (String(year_of_issue).length === 1) {
    year_of_issueStr = "0" + year_of_issue;
  } else if (String(year_of_issue).length === 2) {
    year_of_issueStr = year_of_issue;
  }

  // Concatenate VIN components and return the VIN number
  const VIN =
    versionStr +
    equipment_code +
    year_of_issueStr +
    serial_number +
    place_of_production;
  return VIN;
}

// Function to send a POST request for searching VIN number
function POSTSearch(data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/VINSearch/", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));

  // Handle response from server
  if (xhr.status === 200) {
    const responseData = JSON.parse(xhr.responseText);
    return responseData.serial_number;
  } else {
    console.error("Failed to send data to the server");
  }
}

// Function to send a POST request for saving a VIN number
function POSTSave(data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/VINSave/", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));

  // Handle response from server
  if (xhr.status === 200) {
    return "VIN number saved successfully";
  } else {
    return JSON.parse(xhr.responseText);
  }
}

// Function to retrieve VIN numbers via a GET request
function GetVINNumbers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/VINGet/", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  // Handle response from server
  if (xhr.status === 200) {
    return JSON.parse(xhr.responseText);
  } else {
    console.error("There was an error retrieving the VIN numbers.");
  }
}
