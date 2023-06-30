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
    const setRating= function(rate){
       /*our first loop to set the class on preceding star elements*/
       let pre = rate; //set the current star value
      //loop through and set the active class on preceding stars
      while(1 <= pre){
        //check if the classlist contains the active class, if not, add the class
        if(document.querySelector('.star-'+pre)){
          if(!document.querySelector('.star-'+pre).classList.contains('is-active')){
              document.querySelector('.star-'+pre).classList.add('is-active');
          }
      }
        //decrement our current index
        --pre;
      }//end of first loop
      /*our second loop to unset the class on succeeding star elements*/
        //loop through and unset the active class, skipping the current star
        let succ = rate+1;
        while(5 >= succ){
            //check if the classlist contains the active class, if yes, remove the class
            if(document.querySelector('.star-'+succ) && document.querySelector('.star-'+succ).classList.contains('is-active')){
                document.querySelector('.star-'+succ).classList.remove('is-active');
            }
            //increment current index
            ++succ;
        }
    };
  
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
              document.querySelector('#rating-output').value = cs;
             setRating(cs);  
             let resource_id =  document.querySelector('#resource-id').value;           
             //call api to update DB
             $.ajax({ //ajax call
              type: "POST",
              url: `/api/resources/${resource_id}/ratings`,
              data: $("#rating-form").serialize(),
              success: function (data) {
               // Ajax call completed successfully   
               //update average-rating      
               let rating_value= 'No Rating';
               console.log(data);
               if(data.data["avg-rating"]){
               rating_value=data.data["avg-rating"];
               }
               document.querySelector('#avg_rating').innerHTML=
               `Rating: ${rating_value} / 5`;   
               //update total likes
               let totalLikes = 0;
               if(data.data["totalLikes"]) {
                totalLikes =data.data["totalLikes"];                
               }   
               document.querySelector('#total-likes').innerHTML=`Liked: ${totalLikes}`;      
              },
              error: function (data) {
                // Some error in ajax call
                console.log(`error : ${data}`);
              },
            });
  
          })//end of click event
          i++;
      }//end of while loop
    })();//end of function  
    if(document.querySelector('#rating-output')) 
      setRating( document.querySelector('#rating-output').value );
  
      if(document.querySelector('#like')) {
        let likeButton = document.querySelector('#like');        
        likeButton.addEventListener('click', function(){
         if(likeButton.classList.contains('fa-regular')){
          likeButton.classList.remove("fa-regular");
          likeButton.classList.add("fa-solid");
          document.querySelector("#is-like").value = 1;
         }else{
          likeButton.classList.add("fa-regular");
          likeButton.classList.remove("fa-solid");
          document.querySelector("#is-like").value = 0;
         }
         let resource_id =  document.querySelector('#resource-id').value;           
             //call api to update DB
             $.ajax({ //ajax call
              type: "POST",
              url: `/api/resources/${resource_id}/ratings`,
              data: $("#rating-form").serialize(),
              success: function (data) {
               // Ajax call completed successfully   
               //update average-rating     
               console.log(data); 
               let rating_value= 'No Rating';
               if(data.data["avg-rating"].average)
               rating_value=data.data["avg-rating"].average;
               document.querySelector('#avg_rating').innerHTML=
               `Rating: ${rating_value} / 5`;             
              },
              error: function (data) {
                // Some error in ajax call
               console.log(`error : ${data}`);
              },
            });
        });
        if(document.querySelector('#is-like')) //set like flag on load
        {
          let likeFlag = document.querySelector("#is-like").value;
          if(likeFlag == 1 && likeButton.classList.contains('fa-regular')){
            likeButton.classList.remove("fa-regular");
            likeButton.classList.add("fa-solid");         
          }else if(likeFlag == 0 && likeButton.classList.contains('fa-solid')){
            likeButton.classList.add("fa-regular");
            likeButton.classList.remove("fa-solid");         
          }
        } 
    }
  });
  
  // Navigate back to the previous page
  function goBack() {
    history.back();
  }
  