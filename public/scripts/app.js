// Client facing scripts here
$(() => {
//function to add searched resource element to the container
const renderSearchedResources = function (resources) {
  if (Array.isArray(resources)) {
      $("#search-container").empty();
      resources.forEach((item) => {
      $res= $(`<a class="itemLink" href="/resource?id=${ item.id }">
      <item>
        <img alt="${ item.title }" src="./images/200x200-JS.png"/>
        <span class="topic">${ item.topic_name}</span>
        <span class="title">${ item.title }</span>
      </item>
      </a>`);
      $("#search-container").append($res);
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

  //ratings
  (function(){
    let sr = document.querySelectorAll('.my-star');
    let i = 0;
    //loop through stars
    while (i < sr.length){
        //attach click event
        sr[i].addEventListener('click', function(){
            //current star
            let cs = parseInt(this.getAttribute("data-star"));
            //output current clicked star value
            document.querySelector('#output').value = cs;
            /*our first loop to set the class on preceding star elements*/
            let pre = cs; //set the current star value
            //loop through and set the active class on preceding stars
            while(1 <= pre){
                //check if the classlist contains the active class, if not, add the class
                if(!document.querySelector('.star-'+pre).classList.contains('is-active')){
                    document.querySelector('.star-'+pre).classList.add('is-active');
                }
                //decrement our current index
                --pre;
            }//end of first loop
            /*our second loop to unset the class on succeeding star elements*/
                //loop through and unset the active class, skipping the current star
                let succ = cs+1;
                while(5 >= succ){
                    //check if the classlist contains the active class, if yes, remove the class
                    if(document.querySelector('.star-'+succ).classList.contains('is-active')){
                        document.querySelector('.star-'+succ).classList.remove('is-active');
                    }
                    //increment current index
                    ++succ;
                }
        })//end of click event
        i++;
    }//end of while loop
  })();//end of function
});

// Navigate back to the previous page
function goBack() {
  history.back();
}
