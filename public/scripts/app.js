// Client facing scripts here
$(() => {
   function getAllResources() {
    let url = "/api/resources";    
    return $.ajax({
      url,
    });
  }
  $("#searchForm").on('submit', function(event) {
    event.preventDefault();
    const data = $("#searchInput").value;
    console.log(data);
    const resources =getAllResources();//use promises
    $("#content").empty();
    resources.array.forEach(element => {
      /*
      <a href="<%= item.url %>" target="_blank">
    <item>
      <img alt="<%= item.title %>" src="./images/200x200-JS.png"/>
      <span><%= item.title %></span>
      <topic><%= item.topic_id %></topic>
    </item>
    </a>*/
});

  
   
    
 
});
