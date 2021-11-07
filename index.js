document.addEventListener("DOMContentLoaded", function () {
  // default search query
  var ingredient = "chicken";
  requestData(ingredient);

  function requestData(ingredient) {
    //1. create new instance of request object
    let request = new XMLHttpRequest();
    console.log("1. request object created");
    console.log(ingredient);
    //2. Set the URL for the AJAX request to be the JSON file
    request.open(
      "GET",
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=` + ingredient,
      true
    );
    console.log("2. opened request file");
    //3. set up event handler / callback
    request.onreadystatechange = function () {
      console.log("3. readystatechange event fired");

      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText).meals;

        // if no data matches the query
        if (data == null) {
          document.getElementById("results").innerHTML =
            "<br><br><span>Could not find any meals with that ingredient. Please try again</span>";
        }
        // else display query results
        else {
          entries = data.length;
          i = 0;
          s = "<table class='table' id='meals'><tr>";
          for (x in data) {
            // managing table columns
            if (i != 0 && i % 3 == 0) {
              s += "</tr>";
              s += "<tr>";
            }

            s += "<th class='title'>" + data[x].strMeal + "</th>";
            s +=
              "<th><img src='" +
              data[x].strMealThumb +
              "' width='100' height='100'></img></th>";
            if (i == entries - 1) s += "</tr>";
            i += 1;
          }
          s += "</table";

          console.log("ID:", data);
          console.log(JSON.parse(request.responseText).data);

          document.getElementById("results").innerHTML = s;
        }
      } else if (request.readyState == 4 && request.status != 200) {
        document.getElementById("results").innerHTML = "Something went wrong.";
      } else {
        console.log("Reached API but threw error");
      }
    };

    request.onerror = function () {
      console.log("Connection error");
    };

    //4. fire off HTTP request
    request.send();
    console.log("4. Request sent");
  }

  function generate() {
    ingredient = document.getElementById("query").value;
    console.log("Query: ", document.getElementById("query").value);
    setTimeout(clear, 1000);
    requestData(ingredient);
  }

  function clear() {
    document.getElementById("query").value = "";
  }

  document.getElementById("button").addEventListener("click", generate);
  document.addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $("#button").trigger("click");
    }
  });
});
