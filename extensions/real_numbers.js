// by Mempo
// from https://greasyfork.org/en/scripts/11244-wanikani-real-numbers

function displayReal(numberReviews, numberLessons){
  numberReviews.innerHTML = localStorage.getItem('numberReviews');
  numberLessons.innerHTML = localStorage.getItem('numberLessons');
}

function populate_info() {
  var api_key = localStorage.getItem('apiKey');
  var doneReviews = localStorage.getItem('doneReviews', true);
  var lastUpdate = localStorage.getItem('lastUpdate', '0');
  var currentTime = new Date().getTime();

  if((currentTime-lastUpdate) > 120000){
    localStorage.setItem('lastUpdate', currentTime.toString());
    doneReviews = true;
  }

  if (window.location.href.indexOf('review') != -1 || window.location.href.indexOf('lesson') != -1) {
    localStorage.setItem('doneReviews', true);
  } else {
    var numberReviews = document.getElementsByClassName('reviews')[0].getElementsByTagName('span')[0];
    var numberLessons = document.getElementsByClassName('lessons')[0].getElementsByTagName('span')[0];

    if(numberReviews.innerHTML == '42+' || numberLessons.innerHTML == '42+'){
      if(api_key){
        if(doneReviews){
          $.getJSON('https://www.wanikani.com/api/v1/user/'+ api_key +'/study-queue', function(data){
            setTimeout(function() {
              if(data.error){
                alert('API Error: '+data.error.message);
              }else{
                localStorage.setItem('numberReviews', data.requested_information.reviews_available);
                localStorage.setItem('numberLessons', data.requested_information.lessons_available);
                localStorage.setItem('doneReviews', false);
                displayReal(numberReviews, numberLessons);
              }
            }, 0);
          });

        } else {
          displayReal(numberReviews, numberLessons);
        }
      }
    }
  }
}

function main() {
  $.Deferred()
  .resolve()
  .then(get_api_key)
  .then(populate_info);
}

if (document.readyState === 'complete') {
  main();
} else {
  window.addEventListener('load', main, false)
}
