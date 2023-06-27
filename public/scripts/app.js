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
    alert(data);
    const resources =getAllResources();
    alert(resources);
    if(resources){
      let filteredResources;     
    }
    
  });
});
