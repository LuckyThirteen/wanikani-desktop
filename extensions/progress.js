var LoadURLs = ['http://www.wanikani.com/', 'https://www.wanikani.com/', 'http://www.wanikani.com/dashboard', 'https://www.wanikani.com/dashboard'];

if ($.inArray(window.location.href, LoadURLs) > -1) {
  var dlog_level = 1;

  function dlog(level) {
    if (level > dlog_level) return;
    if (!console || typeof console.log !== 'function') return;
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    console.log.apply(console,args);
  }

  //===================================================================

  window.wkdpp = {};
  window.wkdpp.radical_data = [];
  window.wkdpp.kanji_data = [];

  window.wkdpp.progress_img =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAAAnCAYAAAD6tSH7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccll'+
    'PAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+ID'+
    'x4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8w'+
    'Mi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbn'+
    'MjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5z'+
    'OnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb2'+
    '0veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNjY0MTY4NzY1RUFFNDExOUE4OERFMDQ5OThDNEVFNiIgeG1wTU06'+
    'RG9jdW1lbnRJRD0ieG1wLmRpZDo5RTk5NUIzQ0VFRTQxMUU0QUZFNzgxMEQwMDQwMzgwMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RTk5NU'+
    'IzQkVFRTQxMUU0QUZFNzgxMEQwMDQwMzgwMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpE'+
    'ZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVEQkNDNzgxNzBFREU0MTE5QjJFQzRERDc3QUZGN0I5IiBzdFJlZjpkb2N1bWVudE'+
    'lEPSJ4bXAuZGlkOjI2NjQxNjg3NjVFQUU0MTE5QTg4REUwNDk5OEM0RUU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBt'+
    'ZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+U3W7wQAAAkVJREFUeNrsXLFOwzAUdCpYqy5dqgp16Y7UmW7wA3wECz+Uj2BiKxudkdhZqqpi6YK6MoT3VF'+
    'egiqZNMPa95E66DJEtXf1enFzt56woChcQuQuLO2oLpjNHuNdxRJMBlWx6YcIx2aLeY8Ix2aLeywJ/w50Lu8K+cCgcCcfCHsB3Utu05YgJGDrhfoMO'+
    '4KVwIhwkDGqbtMHOdjESbocL4ZVnBhLUpmqDfbXGTLgdroU3/hWCEtSmaaNp+IEn4aNwA/ix3RRtsKYhlUt9Fs6EBWBgm6IN0jR0Ej+xc9C/Faxrg0'+
    'w2B7DSoAP3DhrYJmjjSsMelsIX0KBa10bTcACvwg/QwFrVRtNQgpXwDTSolrXRNJRg4XBhURtNwwlPqwOeSaxqo2k4gDVwUK1qo2kowQY4qBa1wZqG'+
    'M5CB+3Tx1yb/iv1t4ff+dyDqo2kwhG7gdjG00TQYRj9wu5jaaBoMYhi4XSxtNA1GMQrcLoY2rjQYnt3GJ7YdR57ljmmjaTAIrSk4tZCl59sjaKNpMA'+
    'itJZhU7DPx/VC00TQYghatVK2WGvh+CNogv+NSFNFYgBas3LrqVVIKHdAHt92Zm0obTYMhTN22Oiqr2T/z/aeJtbW2ENrazFalFK8Mus45CzjT1dXW'+
    '2kJodINQt9j42Ot17rlMoI2F0GAIdZzCMWjBi9Yg6LbwVSRtNA2JEfrAmDrQGgTdFr7wibd231uM/uOgncafnoSM3LUHrT49iQmXPvloGphw7Us2zn'+
    'BMNpoGJlxzk00vXwIMAERrvuh7OTAxAAAAAElFTkSuQmCC';

  //                        Guru, Master, Enlightened, Burned
  window.wkdpp.srs_radical_colors = '#00aaff,#b69acd,#9aa5cf,#a3c3d3,#999999,#00aaff';
  window.wkdpp.srs_kanji_colors = '#ff00aa,#b69acd,#9aa5cf,#a3c3d3,#999999,#ff00aa';

  window.wkdpp.progress_css =
    '.wkdpp-progress {background-position:39px 0px;background-repeat:no-repeat;background-image: url("##PROGRESS_IMG##");}'+

    // Radical colors
    '.radicals-progress .wkdpp-progress[data-srs-lvl="1"] {background-color:##RAD_APPR_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="2"] {background-color:##RAD_APPR_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="3"] {background-color:##RAD_APPR_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="4"] {background-color:##RAD_APPR_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="5"] {background-color:##RAD_GURU_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="6"] {background-color:##RAD_GURU_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="7"] {background-color:##RAD_MAST_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="8"] {background-color:##RAD_ENLI_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="9"] {background-color:##RAD_BURN_COLOR## !important;}'+
    '.radicals-progress .wkdpp-progress[data-srs-lvl="10"] {background-color:##RAD_LOCK_COLOR## !important;}'+

    // Kanji colors
    '.kanji-progress .wkdpp-progress[data-srs-lvl="1"] {background-color:##KAN_APPR_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="2"] {background-color:##KAN_APPR_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="3"] {background-color:##KAN_APPR_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="4"] {background-color:##KAN_APPR_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="5"] {background-color:##KAN_GURU_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="6"] {background-color:##KAN_GURU_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="7"] {background-color:##KAN_MAST_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="8"] {background-color:##KAN_ENLI_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="9"] {background-color:##KAN_BURN_COLOR## !important;}'+
    '.kanji-progress .wkdpp-progress[data-srs-lvl="10"] {background-color:##KAN_LOCK_COLOR## !important;}'+

    '.wkdpp-progress[data-srs-lvl="1"] {background-position:39px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="2"] {background-position:0px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="3"] {background-position:-39px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="4"] {background-position:-78px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="5"] {background-position:39px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="6"] {background-position:##GURU_PROGRESS##39px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="7"] {background-position:39px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="8"] {background-position:39px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="9"] {background-position:39px 0px !important;}'+
    '.wkdpp-progress[data-srs-lvl="10"] {background-position:-117px 0px !important;}';

  //-------------------------------------------------------------------
  // Add a <style> section to the document.
  //-------------------------------------------------------------------
  function addStyle(aCss) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (head) {
        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = aCss;
        head.appendChild(style);
        return style;
    }
    return null;
  }

  //-------------------------------------------------------------------
  // Populate level info from API.
  //-------------------------------------------------------------------
  function populate_level_info() {
    // Grab the user's current level.
    var api_key = localStorage.getItem('apiKey');
    var user_level = parseInt($('.dropdown.levels>a>span').text());
    var refetching_apikey = 0;

    // Request kanji information.
    $.getJSON('/api/user/'+api_key+'/kanji/'+user_level)
    .done(function(data){
      // Check if we got an API error.
      if (data.hasOwnProperty('error')) {
        if (data.error.code=='user_not_found') {
            if (!refetching_apikey) {
              refetching_apikey = 1;
              delete localStorage.apiKey;
              $.Deferred()
              .resolve()
              .then(get_api_key)
              .then(populate_level_info);
            }
          } else {
            dlog(1,'wkdpp: API Error - '+data.error.message);
          }
          return;
        }

        $.each(data.requested_information, function(i, e) {
          window.wkdpp.kanji_data.push(e);
        });

        update_progress('kanji');
      });

      // Request radicals information.
      $.getJSON('/api/user/'+api_key+'/radicals/'+user_level)
      .done(function(data){
        // Check if we got an API error.
        if (data.hasOwnProperty('error')) {
          if (data.error.code=='user_not_found') {
            if (!refetching_apikey) {
              refetching_apikey = 1;
              delete localStorage.apiKey;
              $.Deferred()
              .resolve()
              .then(get_api_key)
              .then(populate_level_info);
              }
            } else {
              dlog(1,'wkdpp: API Error - '+data.error.message);
            }
            return;
          }

        $.each(data.requested_information, function(i, e) {
          window.wkdpp.radical_data.push(e);
        });

        update_progress('radicals');
    });
  }

  //-------------------------------------------------------------------
  // Print date in pretty format.
  //-------------------------------------------------------------------
  function formatDate(d){
    var s = '';
    var now = new Date();
    var YY = d.getFullYear(),
        MM = d.getMonth(),
        DD = d.getDate(),
        hh = d.getHours(),
        mm = d.getMinutes(),
        one_day = 24*60*60*1000;

    if (d < now) return "Available Now";
    var same_day = ((YY == now.getFullYear()) && (MM == now.getMonth()) && (DD == now.getDate()) ? 1 : 0);

    //    If today:  "Today 8:15pm"
    //    otherwise: "Wed, Apr 15, 8:15pm"
    if (same_day) {
      s += 'Today ';
    } else {
      s += ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]+', '+
           ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][MM]+' '+DD+', ';
    }
    s += (((hh+11)%12)+1)+':'+('0'+mm).slice(-2)+['am','pm'][Math.floor(d.getHours()/12)];

    // Append "(X days)".
    if (!same_day) {
      var days = (Math.floor((d.getTime()-d.getTimezoneOffset()*60*1000)/one_day)-Math.floor((now.getTime()-d.getTimezoneOffset()*60*1000)/one_day));
      if (days) s += ' ('+days+' day'+(days>1?'s':'')+')';
    }

    return s;
  }

  //-------------------------------------------------------------------
  // Capitalize all words in a string.
  //-------------------------------------------------------------------
  function capitalize_words(string) {
    return string.replace(/\b\w+\b/g,function(w){return w.charAt(0).toUpperCase()+w.slice(1);});
  }

  //-------------------------------------------------------------------
  // Update the dashboard info.
  //-------------------------------------------------------------------
  function update_progress(type) {
    var ul;
    var arr;

    // Fetch container element, remove existing elements, and select data source.
    if (type==='radicals') {
      ul = $('.radicals-progress .lattice-single-character>ul');
      arr = window.wkdpp.radical_data;
    } else {
      ul = $('.kanji-progress .lattice-single-character>ul');
      arr = window.wkdpp.kanji_data;
    }
    var li_proto = ul.children().first().clone();
    ul.children().remove();

    // Sort items by srs level, then review date, then meaning.
    arr.sort(function(a,b){
      var a_srs = (a.user_specific ? a.user_specific.srs_numeric : 10);
      var b_srs = (b.user_specific ? b.user_specific.srs_numeric : 10);
      if (a_srs < b_srs) return -1;
      if (a_srs > b_srs) return 1;
      var a_avail = (a.user_specific && a.user_specific.available_date ?
          a.user_specific.available_date : Number.MAX_VALUE);
      var b_avail = (b.user_specific && b.user_specific.available_date ?
          b.user_specific.available_date : Number.MAX_VALUE);
      if (a_avail < b_avail) return -1;
      if (a_avail > b_avail) return 1;
      if (a.meaning < b.meaning) return -1;
      if (a.meaning > b.meaning) return 1;
      return 0;
    });

    // Populate item data.
    var renum = 0;
    $.each(arr, function(idx, data){
      var li;
      var a;
      var span;

      // Populate id, class, href, and text.
      li = li_proto.clone();
      li.removeAttr('style'); // WK sometimes puts "display:none" here.
      a = li.find('>a');
      a.addClass('wkdpp-progress');
      if (type==='radicals') {
        li.attr('id', 'radical-x'+(renum++));
        a.attr('href','/radicals/'+data.meaning);
        if (data.character) {
            a.text(data.character);
        } else {
            a.html('<i class="radical-'+data.meaning.replace(' ','-')+'"></i>');
        }
      } else {
        li.attr('id', 'kanji-x'+(renum++));
        a.attr('href','/kanji/'+encodeURIComponent(data.character));
        a.text(data.character);
      }

      // Populate 'data-srs-lvl', which is a styling selector.
      var srs = (data.user_specific ? data.user_specific.srs_numeric : 10);
      a.attr('data-srs-lvl', srs);

      // Populate the next review date.
      var next = (window.wkdpp.popup_date_only==1?'':'<br>');
      if (data.user_specific && data.user_specific.available_date) {
        var date = formatDate(new Date(data.user_specific.available_date*1000));
        next += '<span style="font-size:75%;font-weight:bold;">Next: '+date+'</span>';
      }

      // Populate remaining data for popup window.
      var percent = 0;
      var correct;
      var total;
      if (type==='radicals') {
        if (window.wkdpp.popup_date_only==1)
            a.attr('data-original-title', next);
        else
            a.attr('data-original-title', capitalize_words(data.meaning)+next);
        if (data.user_specific) {
            correct = data.user_specific.meaning_correct;
            total = correct+data.user_specific.meaning_incorrect;
            if (total > 0) percent = Math.floor(100.0*correct/total);
          }
      } else {
        if (window.wkdpp.popup_date_only==1)
            a.attr('data-original-title', next);
        else
            a.attr('data-original-title', capitalize_words(data.meaning)+'<br><span lang=&quot;ja&quot;>'+data[data.important_reading]+'</span>'+next);
        if (data.user_specific) {
            correct = data.user_specific.meaning_correct+data.user_specific.reading_correct;
            total = correct+data.user_specific.meaning_incorrect+data.user_specific.reading_incorrect;
            if (total > 0) percent = Math.floor(100.0*correct/total);
        }
      }
      a.attr('data-content', '<div class="progress"><div class="bar full" style="width: '+Math.max(percent,15)+'%;">'+percent+'%</div></div>');

      ul.append(li);
    });

    // Add marker at 90%, indicating when level will be complete.
    ul.children().eq(Math.floor(arr.length * 0.1)).css({'border-left':'2px solid black','border-radius':'7px'});
    ul.children().last().css({'border-right':'2px solid black','border-radius':'7px'});

    // WaniKani function to add popover.
    // InfoTip.popoverLattice();
    if (type==='radicals') {
      arr = $(".radicals-progress [rel=auto-popover]");
    } else {
      arr = $(".kanji-progress [rel=auto-popover]");
    }
    arr.popover({
      html:!0,
      animation:!1,
      trigger:"hover",
      placement:function(e,t){var n,r;return r=window.innerWidth,n=$(t).offset().left,r<500?"bottom":r-n>400?"right":"left"},
      template:'<div class="popover lattice"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    });
  }


  //-------------------------------------------------------------------
  // Process stored configuration settings.
  //-------------------------------------------------------------------
  function process_settings() {
    function value_or_default(value, dflt) {
      return (value===undefined ? dflt : value);
    }

    // Hide WK's standard popup info for apprentice items in the review
    // queue, so user doesn't won't accidentally see it before review.
    window.wkdpp.popup_date_only = value_or_default(
      localStorage.wkdpp_popup_date_only,
      0
    );

    // Alternate progress ring image (URL or Base64).
    window.wkdpp.progress_img = value_or_default(
      localStorage.wkdpp_progress_img,
      window.wkdpp.progress_img
    );

    // Upgrade colors from previous script versions.
    if (localStorage.wkdpp_srs_colors !== undefined) {
      var colors = localStorage.wkdpp_srs_colors;
      localStorage.wkdpp_srs_kanji_colors = colors;
      colors = colors.split(',');
      colors[0] = '#00aaff';
      colors[5] = '#00aaff';
      colors = colors.join();
      localStorage.wkdpp_srs_radical_colors = colors;
      delete localStorage.wkdpp_srs_colors;
    }

    // Alternate color scheme for SRS levels.  One color each for
    // apprentice, guru, master, enlightened, burned, and locked.
    window.wkdpp.srs_radical_colors = value_or_default(
      localStorage.wkdpp_srs_radical_colors,
      window.wkdpp.srs_radical_colors
    );
    window.wkdpp.srs_kanji_colors = value_or_default(
      localStorage.wkdpp_srs_kanji_colors,
      window.wkdpp.srs_kanji_colors
    );

    // Hide the progress ring for everything above Apprentice.
    window.wkdpp.apprentice_progress_only = value_or_default(
      localStorage.wkdpp_apprentice_progress_only,
      0
    );
  }

  function setup_styles() {
    var css = window.wkdpp.progress_css;
    var rad_colors = window.wkdpp.srs_radical_colors.split(',');
    var kan_colors = window.wkdpp.srs_kanji_colors.split(',');

    css = css.replace(/##PROGRESS_IMG##/g  , window.wkdpp.progress_img);
    css = css.replace(/##GURU_PROGRESS##/g    , (window.wkdpp.apprentice_progress_only=='1' ? '' : '-'));

    css = css.replace(/##RAD_APPR_COLOR##/g, rad_colors[0]);
    css = css.replace(/##RAD_GURU_COLOR##/g, rad_colors[1]);
    css = css.replace(/##RAD_MAST_COLOR##/g, rad_colors[2]);
    css = css.replace(/##RAD_ENLI_COLOR##/g, rad_colors[3]);
    css = css.replace(/##RAD_BURN_COLOR##/g, rad_colors[4]);
    css = css.replace(/##RAD_LOCK_COLOR##/g, rad_colors[5]);

    css = css.replace(/##KAN_APPR_COLOR##/g, kan_colors[0]);
    css = css.replace(/##KAN_GURU_COLOR##/g, kan_colors[1]);
    css = css.replace(/##KAN_MAST_COLOR##/g, kan_colors[2]);
    css = css.replace(/##KAN_ENLI_COLOR##/g, kan_colors[3]);
    css = css.replace(/##KAN_BURN_COLOR##/g, kan_colors[4]);
    css = css.replace(/##KAN_LOCK_COLOR##/g, kan_colors[5]);

    addStyle(css);
  }

  //-------------------------------------------------------------------
  // main() - Runs after page is done loading.
  //-------------------------------------------------------------------
  function main() {
    process_settings();
    setup_styles();

    // Set up a sequence of deferred actions, so we can
    // control asynchronous flow in a more readable manner.
    $.Deferred()
    .resolve()
    .then(get_api_key)
    .then(populate_level_info);
  }

  //-------------------------------------------------------------------
  // Run main() upon load.
  //-------------------------------------------------------------------
  if (document.readyState === 'complete') {
    main();
  } else {
    window.addEventListener("load", main, false)
  }
}
