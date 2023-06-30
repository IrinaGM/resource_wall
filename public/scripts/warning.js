function validateForm(event) {
  // prevent submission
  event.preventDefault();

  // configure the elements into objects
  const formValues = {
    title: document.getElementById('title').value.trim(),
    url: document.getElementById('url').value.trim(),
    desc: document.getElementById('description').value.trim(),
    options: document.getElementsByName('options')
  };

  // validateField() function to check input value
  const isTitleValid = validateField(formValues.title, 'title', 'Please enter the resource\'s title.', 50);
  const isUrlValid = validateField(formValues.url, 'url', 'Please enter the resource\'s URL.', 1000);
  const isDescValid = validateLength(formValues.desc, 'description', 'None', 5000);
  const isTopicValid = validateSelection(formValues.options, 'topic', 'Please select a topic.');

  // only allow submit() event if all fields pass
  if (isTitleValid && isUrlValid && isDescValid && isTopicValid) {
    event.target.submit();
  }
}

function validateField(value, fieldId, errorMessage, maxChar) {
  const warningBox = document.getElementById(`warning-${fieldId}`);
  // check if input value is blank then show warning
  if (value === '') {
    showWarningMessage(warningBox, errorMessage);
    return false;
  }

  // Additional check for the length of the input
  if (value.length > maxChar) {
    showWarningMessage(warningBox, `Maximum ${maxChar} characters allowed.`);
    return false;
  }

  // if not, hide the warning box
  hideWarningMessage(warningBox);
  return true;
}

function validateLength(value, fieldId, errorMessage, maxChar) {
  const warningBox = document.getElementById(`warning-${fieldId}`);

  // Additional check for the length of the input
  if (value.length > maxChar) {
    showWarningMessage(warningBox, `Maximum ${maxChar} characters allowed.`);
    return false;
  }

  // if not, hide the warning box
  hideWarningMessage(warningBox);
  return true;
}

// validating options
function validateSelection(options, fieldId, errorMessage) {
  let topicSelected = false;
  const warningBox = document.getElementById(`warning-${fieldId}`);

  // loop through the options choices
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      // if selected, set to true
      topicSelected = true;
      break;
    }
  }

  // no topic selected, show warning
  if (!topicSelected) {
    showWarningMessage(warningBox, errorMessage);
    return false;
  }

  // hide warning box initially
  hideWarningMessage(warningBox);
  return true;
}

// show warning element
function showWarningMessage(warningBox, message) {
  warningBox.innerHTML = message;
  warningBox.style.display = 'block';
}

// hide warning element
function hideWarningMessage(warningBox) {
  warningBox.style.display = 'none';
}
