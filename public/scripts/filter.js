$(document).ready(function () {
    // check if the url contains the topic id included, if it is add style class to it
    if($(location).attr('href').includes("?topic=")) {
      const topicIdSelected = $(location).attr('href').slice(-1);
      $(`#topicBtn${topicIdSelected}`).addClass("selected");
  }
});
