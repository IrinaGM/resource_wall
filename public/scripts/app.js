// Client facing scripts here
$(() => {
//function to add searched resource element to the container
const renderSearchedResources = function (resources) {
  if (Array.isArray(resources)) {
      $("#resource-container").empty();
      resources.forEach((item) => {
      $res= $(`<a href=${item.url} target="_blank">
      <item>
        <img alt="${ item.title }" src="./images/200x200-JS.png"/>
        <span>${ item.title}</span>
        <topic>${ item.topic_id }</topic>
      </item>
      </a>`);
      $("#resource-container").append($res);
    });
  }
};
  let form = $("#searchForm");
  form.submit((event) => {
    event.preventDefault(); // prevents default behavior of the event
    let textArea = $("#searchInput");
    if (!textArea.val() || textArea.val().length === 0) { // if search data is empty
      $.ajax("/", { method: "GET" });
    }
    const url = form.attr("action");
    const search_text= textArea.val().toUpperCase();
    $.ajax(url, { method: "GET" }).then(function (all_resources) {
      //perform search
      if(all_resources){
      let output= all_resources.resources;
      const searchedResources=  output.filter(res => res.title.toUpperCase().includes(search_text) || res.description.toUpperCase().includes(search_text));
      renderSearchedResources(searchedResources);
      }
    })
    .catch(err => {
      console.log(`error: ${err.message} `);
    });
  });
  let myResourcesform = $("#myResourcesSearchForm");
  myResourcesform.submit((event) => {
    event.preventDefault(); // prevents default behavior of the event
    let textArea = $("#searchInput");
    const url = "/api/resources/users/"
    if (!textArea.val() || textArea.val().length === 0) { // if search data is empty
      $.ajax(url, { method: "GET" });
    }
    const search_text= textArea.val().toUpperCase();
    $.ajax(url, { method: "GET" }).then(function (all_resources) {
      //perform search
      if(all_resources){
      let output= all_resources.resources;
      const searchedResources=  output.filter(res => res.title.toUpperCase().includes(search_text) || res.description.toUpperCase().includes(search_text));
      renderSearchedResources(searchedResources);
      }
    })
    .catch(err => {
      console.log(`error: ${err.message} `);
    });
  });





});
