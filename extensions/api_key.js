// by Robin Findley
// from https://greasyfork.org/en/scripts/9552-wanikani-dashboard-progress-plus

function get_api_key() {
    var done = $.Deferred();

    // First check if the API key is in local storage.
    var api_key = localStorage.getItem('apiKey');
    if (api_key && api_key.length == 32) return done.resolve();

    // We don't have the API key.  Fetch it from the /account page.
    dlog(1,'wkdpp: Fetching api_key');
    $.get('/account')
    .done(function(page){
        // Make sure what we got is a web page.
        if (typeof page !== 'string') {return done.reject()}

        // Extract the API key.
        var api_key = $(page).find('#api-button').parent().find('input').attr('value');
        if (typeof api_key !== 'string' || api_key.length !== 32)  {return done.reject()}

        // Store the updated user info.
        localStorage.setItem('apiKey', api_key);

        // Return success.
        done.resolve();
    })
    .fail(function(){
        // Failed to get web page.
        done.reject();
    });

    return done.promise();
}
