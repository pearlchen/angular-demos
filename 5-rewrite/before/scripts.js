(function(){

  var timesSubmitted = 0,
      maxTries = 3;

  var submitButton = $('.letter button'),
      waitAnimation = submitButton.find('.glyphicon'),
      retryMessage = $("#retry"),
      errorMessage = $("#failed"),
      dismissButton = errorMessage.find('button.close');

  function submitHandler() {
    submitButton.attr("disabled", "disabled");
    waitAnimation.show();
    timesSubmitted = 0;
    submitData();
  }

  function submitData() {
    timesSubmitted++;
    $.post("fakeapi", postOnSuccess).fail(postOnFail);
  }

  function postOnSuccess(data) {
  }

  function postOnFail(data) {
    if ( timesSubmitted < maxTries ) {
      retrySubmit();
    }
    else {
      retryMessage.hide();
      errorMessage.show();
      dismissButton.click(function(){
        errorMessage.hide();
        dismissButton.unbind( "click" );
      });
      submitButton.removeAttr("disabled");
      waitAnimation.hide();
    }
  }

  function retrySubmit() {
    retryMessage.find('.timesSubmitted').text(timesSubmitted);
    retryMessage.show();
    setTimeout( submitData, 1000 ); 
  }

  submitButton.click(submitHandler);

}());