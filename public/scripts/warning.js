function validateForm(event) {
  // Prevent submit if fails check
  event.preventDefault();

  var title = document.getElementById('title').value;
  var url = document.getElementById('url').value;
  var options = document.getElementsByName('options');
  var topicSelected = false;

  // Check title
  if (title.trim() === '') {
    showWarningTitle('Please enter the resource\'s title.');
    return;
  }

  // Check url
  if (url.trim() === '') {
    showWarningUrl('Please enter the resource\'s URL.');
    return;
  }

  // Check topic
  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      topicSelected = true;
      break;
    }
  }

  if (!topicSelected) {
    showWarningTopic('Please select a topic.');
    return;
  }

  // If all validations pass, submit the form
  event.target.submit();
}

function showWarningTitle(message) {
  var warningBox = document.getElementById('warning-title');
  warningBox.innerHTML = message;
  warningBox.style.display = 'block';
}

function showWarningUrl(message) {
  var warningBox = document.getElementById('warning-url');
  warningBox.innerHTML = message;
  warningBox.style.display = 'block';
}

function showWarningTopic(message) {
  var warningBox = document.getElementById('warning-topic');
  warningBox.innerHTML = message;
  warningBox.style.display = 'block';
}
