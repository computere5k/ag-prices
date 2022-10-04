 const currentYear = new Date().getFullYear();
  const recentYears = currentYear - 2;

  fetch(
    "https://mtnagproxy.herokuapp.com/https://quickstats.nass.usda.gov/api/api_GET/?key=0EA2A509-4263-389F-B0E8-E39DA9D250F1&commodity_desc=HAY&class_desc=(EXCL%20ALFALFA)&state_fips_code=99&state_fips_code=49&statisticcat_desc=PRICE%20RECEIVED&unit_desc=$%20/%20TON&freq_desc=MONTHLY&year__GE=" + recentYears+ "&format=JSON"
  )
    .then((response) => response.json())
    .then((data) => {
      var i;
      var thisYearHeaderData = "";
      var thisYearUtahData = "";
      var thisYearUsData = "";
      var lastYearHeaderData = "";
      var lastYearUtahData = "";
      var lastYearUsData = "";
      var extraYearHeaderData = "";
      var extraYearUtahData = "";
      var extraYearUsData = "";

      for (i = 0; i < data.data.length; i++) {
        if (
          data.data[i].year === currentYear &&
          data.data[i].state_fips_code === "49"
        ) {
          thisYearHeaderData +=
            "<th style='text-align: center'>" +
            data.data[i].reference_period_desc +
            "<br/>" +
            data.data[i].year +
            "</th>";
          thisYearUtahData +=
            "<td style='text-align: center'>" + data.data[i].Value + "</td>";
        }

        if (
          data.data[i].year === currentYear &&
          data.data[i].state_fips_code === "99"
        ) {
          thisYearUsData += "<td>" + data.data[i].Value + "</td>";
        }

        if (
          data.data[i].year === currentYear - 1 &&
          data.data[i].state_fips_code === "49"
        ) {
          lastYearHeaderData +=
            "<th>" +
            data.data[i].reference_period_desc +
            "<br/>" +
            data.data[i].year +
            "</th>";
          lastYearUtahData += "<td>" + data.data[i].Value + "</td>";
        }

        if (
          data.data[i].year === currentYear - 1 &&
          data.data[i].state_fips_code === "99"
        ) {
          lastYearUsData += "<td>" + data.data[i].Value + "</td>";
        }
        if (
          data.data[i].year === currentYear - 2 &&
          data.data[i].state_fips_code === "49"
        ) {
          extraYearHeaderData +=
            "<th class='text-center'>" +
            data.data[i].reference_period_desc +
            "<br/>" +
            data.data[i].year +
            "</th>";
          extraYearUtahData += "<td>" + data.data[i].Value + "</td>";
        }

        if (
          data.data[i].year === currentYear - 2 &&
          data.data[i].state_fips_code === "99"
        ) {
          extraYearUsData += "<td>" + data.data[i].Value + "</td>";
        }
        document.getElementById("other-hay-table").innerHTML =
          "<thead><tr><th></th>" +
          extraYearHeaderData +
          lastYearHeaderData +
          thisYearHeaderData +
          "</tr></thead><tbody><tr><td style='text-align: left !important;'><strong>Utah</strong></td>" +
          extraYearUtahData +
          lastYearUtahData +
          thisYearUtahData +
          "</tr><tr><td style='text-align: left !important;'><strong>U.S.</strong></td>" +
          extraYearUsData +
          lastYearUsData +
          thisYearUsData +
          "</tr></tbody>";
      }
    });
// JavaScript Document