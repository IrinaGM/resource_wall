function validateForm(event) {
  event.preventDefault();

  const formValues = {
    title: document.getElementById('title').value.trim(),
    url: document.getElementById('url').value.trim(),
    options: document.getElementsByName('options')
  };

  if (!validateField(formValues.title, 'title', 'Please enter the resource\'s title.')) {
    return;
  }

  if (!validateField(formValues.url, 'url', 'Please enter the resource\'s URL.')) {
    return;
  }

  if (!validateSelection(formValues.options, 'topic', 'Please select a topic.')) {
    return;
  }

  event.target.submit();
}

function validateField(value, fieldId, errorMessage) {
  if (value === '') {
    showWarningMessage(fieldId, errorMessage);
    return false;
  }
  return true;
}

function validateSelection(options, fieldId, errorMessage) {
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      return true;
    }
  }
  showWarningMessage(fieldId, errorMessage);
  return false;
}

function showWarningMessage(fieldId, message) {
  const warningBox = document.getElementById(`warning-${ fieldId }`);
  warningBox.innerHTML = message;
  warningBox.style.display = 'block';
}
