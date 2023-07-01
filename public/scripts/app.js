// Client facing scripts here
$(() => {
  //function to add searched resource element to the container
  const renderSearchedResources = function (resources) {
    if (Array.isArray(resources)) {
      $("#search-container").empty();
      resources.forEach((item) => {

        const imgTopicsSrc = {
          '1':'./images/200x200-JS.png',
          '2':'./images/200x200-NODE.png',
          '3':'./images/200x200-RUBY.png',
          '4':"./images/200x200-HTML.png",
          '5':"./images/200x200-CSS.png",
          '6':"./images/200x200-REACT.png"
        };
        $res = $(`<a class="itemLink" href="/resource?id=${item.id}">
        <item>
          <img alt="${item.title}" src="${imgTopicsSrc[item.topic_id]}"/>
          <span class="topic">${item.topic_name}</span>
          <span class="title">${item.title}</span>
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
    if (!textArea.val() || textArea.val().length === 0) {
      // if search data is empty
      $.ajax("/", { method: "GET" });
    }
    const url = form.attr("action");
    const search_text = textArea.val().toUpperCase();
    $.ajax(url, { method: "GET" })
      .then(function (all_resources) {
        //perform search
        if (all_resources) {
          let output = all_resources.resources;
          const searchedResources = output.filter(
            (res) =>
              res.title.toUpperCase().includes(search_text) ||
              res.description.toUpperCase().includes(search_text)
          );
          renderSearchedResources(searchedResources);
        }
      })
      .catch((err) => {
        console.log(`error: ${err.message} `);
      });
  });
  const setRating = function (rate) {
    /*our first loop to set the class on preceding star elements*/
    let pre = rate; //set the current star value
    //loop through and set the active class on preceding stars
    while (1 <= pre) {
      //check if the classlist contains the active class, if not, add the class
      if (document.querySelector(".star-" + pre)) {
        if (
          !document
            .querySelector(".star-" + pre)
            .classList.contains("is-active")
        ) {
          document.querySelector(".star-" + pre).classList.add("is-active");
        }
      }
      //decrement our current index
      --pre;
    } //end of first loop
    /*our second loop to unset the class on succeeding star elements*/
    //loop through and unset the active class, skipping the current star
    let succ = rate + 1;
    while (5 >= succ) {
      //check if the classlist contains the active class, if yes, remove the class
      if (
        document.querySelector(".star-" + succ) &&
        document.querySelector(".star-" + succ).classList.contains("is-active")
      ) {
        document.querySelector(".star-" + succ).classList.remove("is-active");
      }
      //increment current index
      ++succ;
    }
  };

  //ratings
  (function () {
    let sr = document.querySelectorAll(".my-star");
    let i = 0;
    //loop through stars
    while (i < sr.length) {
      //attach click event
      sr[i].addEventListener("click", function () {
        //current star
        let cs = parseInt(this.getAttribute("data-star"));
        //output current clicked star value
        document.querySelector("#rating-output").value = cs;
        setRating(cs);
        let resource_id = document.querySelector("#resource-id").value;
        //call api to update DB
        $.ajax({
          //ajax call
          type: "POST",
          url: `/api/resources/${resource_id}/ratings`,
          data: $("#rating-form").serialize(),
          success: function (data) {
            // Ajax call completed successfully
            //update average-rating
            let rating_value = "No Rating";
            if (
              data.data["avg-rating"] !== null &&
              data.data["avg-rating"] !== undefined
            ) {
              rating_value = data.data["avg-rating"];
            }
            document.querySelector(
              "#avg_rating"
            ).innerHTML = `Rating: ${rating_value} / 5`;
            //update total likes
            let totalLikes = 0;
            if (
              data.data["totalLikes"] !== null &&
              data.data["totalLikes"] !== undefined
            ) {
              totalLikes = data.data["totalLikes"];
            }
            document.querySelector(
              "#total-likes"
            ).innerHTML = `Liked: ${totalLikes}`;
          },
          error: function (data) {
            // Some error in ajax call
            console.log(`error : ${data}`);
          },
        });
      }); //end of click event
      i++;
    } //end of while loop
  })(); //end of function
  if (document.querySelector("#rating-output"))
    setRating(document.querySelector("#rating-output").value);

  if (document.querySelector("#like")) {
    let likeButton = document.querySelector("#like");
    likeButton.addEventListener("click", function () {
      if (likeButton.classList.contains("fa-regular")) {
        likeButton.classList.remove("fa-regular");
        likeButton.classList.add("fa-solid");
        document.querySelector("#is-like").value = 1;
      } else {
        likeButton.classList.add("fa-regular");
        likeButton.classList.remove("fa-solid");
        document.querySelector("#is-like").value = 0;
      }
      let resource_id = document.querySelector("#resource-id").value;
      //call api to update DB
      $.ajax({
        //ajax call
        type: "POST",
        url: `/api/resources/${resource_id}/ratings`,
        data: $("#rating-form").serialize(),
        success: function (data) {
          // Ajax call completed successfully
          //update average-rating
          // Ajax call completed successfully
          //update average-rating
          let rating_value = "No Rating";
          if (
            data.data["avg-rating"] !== null &&
            data.data["avg-rating"] !== undefined
          ) {
            rating_value = data.data["avg-rating"];
          }
          document.querySelector(
            "#avg_rating"
          ).innerHTML = `Rating: ${rating_value} / 5`;
          //update total likes
          let totalLikes = 0;
          if (
            data.data["totalLikes"] !== null &&
            data.data["totalLikes"] !== undefined
          ) {
            totalLikes = data.data["totalLikes"];
          }
          document.querySelector(
            "#total-likes"
          ).innerHTML = `Liked: ${totalLikes}`;
        },
        error: function (data) {
          // Some error in ajax call
          console.log(`error : ${data}`);
        },
      });
    });
    if (document.querySelector("#is-like")) {
      //set like flag on load
      let likeFlag = document.querySelector("#is-like").value;
      if (likeFlag == 1 && likeButton.classList.contains("fa-regular")) {
        likeButton.classList.remove("fa-regular");
        likeButton.classList.add("fa-solid");
      } else if (likeFlag == 0 && likeButton.classList.contains("fa-solid")) {
        likeButton.classList.add("fa-regular");
        likeButton.classList.remove("fa-solid");
      }
    }
  }
  //USER STORY 08 - Comments
  //function to create comment HTML element for the given data
  const createCommentElement = function (commentData) {
    let createdby = commentData["username"];
    let $comment = $(`  <div>
        <header>
          <span>
          <i class="fa-solid fa-user"></i>
          <b>${createdby}</b>
          </span>
        </header>
        <p>${commentData["content"]}</p>
        </div>`);
    return $comment;
  };
  //function to add newly created comment element to the container
  const renderComments = function (comments) {
    // loops through comments
    // calls createCommentElement for each comment
    // takes return value and appends it to the comments container
    if (Array.isArray(comments)) {
      $("#review-container").empty();
      comments.forEach((element) => {
        const $comment = createCommentElement(element);
        $("#review-container").append($comment);
      });
    }
  };
  //function to fetch comments from server with ajax call and display them on UI

  const loadComments = function () {
    if(document.querySelector("#resource-id")){
    let resource_id = document.querySelector("#resource-id").value;
    $.ajax(`/api/resources/${resource_id}/comments`, { method: "GET" }).then(
      function (moreComments) {
        renderComments(moreComments.comments);
      }
    );
    }else{
      let comments =[];
      let comment1 ={'content':"Fantastic Read!", 'username':"Judy Brown"};
      let comment2 ={'content':"very good book!", 'username':"James Potter"}
      comments.push(comment1);
      comments.push(comment2);
      renderComments(comments);
    }
  };
  //Handling submit event of the form with ajax calls to dynamically update the page
  let commentsForm = $("#comments-form");
  commentsForm.submit((event) => {
    event.preventDefault(); // prevents default behavior of the event
    let textArea = $("#reviewInput");
    if (!textArea.val() || textArea.val().length === 0) {
      // if tweet data is empty
      return;
    }
    let resource_id = document.querySelector("#resource-id").value;
    $.ajax({
      //ajax call
      type: "POST",
      url: `/api/resources/${resource_id}/comments`,
      data: commentsForm.serialize(),
      success: function (comments) {
        // Ajax call completed successfully

        loadComments(); // fetch comments from the server and load on UI
        textArea.val(""); //clear the text area where comment is entered
      },
      error: function (data) {
        // Some error in ajax call
        console.log(`error : ${data}`);
      },
    });
  });
  loadComments();
});

// Navigate back to the previous page
function goBack() {
  history.back();
}

// Reload button click event
$("#resetFilter").click(function() {
  let url = location.href; // Get the current page URL
  let newUrl = url.split('?')[0]; // Remove the query parameters
  location.href = newUrl; // Navigate to the new URL
});
