/*
* Grey Dragon Theme: JS support 
*/

jQuery.fn.extend({
  myAjaxLoginSubmit: function() {
    $('form#g-login-form').one('submit', function() {
      $(this).ajaxSubmit({
        dataType: 'json', 
        success: function(data) {
          if (data.result == 'error') {
            $('#g-login').html(data.form);
            $().myAjaxLoginSubmit();
          } else {
            // object
            alert(typeof(data));
            Shadowbox.close(); 
            window.location.reload(); 
          }
        }
      }); 
      return false;
    });
  },

  myAjaxSubmit: function() {
    $('form').one('submit', function() {
      try {
        $(this).ajaxSubmit({
          success: function(data) {
            // object
            // alert(typeof(data));
            if (data.result == 'error') {
              $('#sb-content form').html(data.form);
              $().myAjaxSubmit();
            } else {
              Shadowbox.close();
              if (data.reload) {
                window.location.reload();
              }
            }
          }
        });
      } catch (e) { 
        window.location.reload();
      }

      return false;
    });
  },

  theme_ready: function() {
    try {
      Shadowbox.setup("a.g-fullsize-link", {player: 'img'});
      Shadowbox.setup("a.g-sb-preview", {player: 'img', gallery: "preview", animate: false, continuous: true, counterType: "skip", animSequence: "wh", slideshowDelay: 5 });

      Shadowbox.setup("a#g-exifdata-link", {player: 'ajax', width: 600, height: 420, animate: false});

/*    Shadowbox.setup(".g-dialog-link",    {player: 'ajax', width: 500, height: 420, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup("a#g-login-link",    {player: 'ajax', width: 340, height: 190, enableKeys: false, animate: false, onFinish: $().myAjaxLoginSubmit});
      Shadowbox.setup("a#g-disclaimer",    {player: 'ajax', width: 600, height: 420});

      Shadowbox.setup("#g-site-menu .ui-icon-pencil",    {player: 'ajax', width: 500, height: 420, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup(".g-context-menu .ui-icon-pencil", {player: 'ajax', width: 500, height: 420, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      
      Shadowbox.setup("#g-site-menu .ui-icon-plus",      {player: 'ajax', width: 500, height: 390, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup(".g-context-menu .ui-icon-plus",   {player: 'ajax', width: 500, height: 390, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});

      Shadowbox.setup("#g-site-menu .ui-icon-note",      {player: 'ajax', width: 500, height: 370, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup(".g-context-menu .ui-icon-note",   {player: 'ajax', width: 500, height: 370, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});

      Shadowbox.setup("#g-site-menu .ui-icon-key",       {player: 'ajax', width: 700, height: 300, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup(".g-context-menu .ui-icon-key",    {player: 'ajax', width: 700, height: 300, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});

      Shadowbox.setup("#g-site-menu #g-menu-organize-link",   {player: 'ajax', width: 710, height: 460, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup(".g-context-menu #g-menu-organize-link",{player: 'ajax', width: 710, height: 460, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});

      Shadowbox.setup(".g-context-menu .ui-icon-folder-open", {player: 'ajax', width: 400, height: 380, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup("#g-site-menu .g-quick-delete",   {player: 'ajax', width: 400, height: 150, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
      Shadowbox.setup(".g-context-menu .ui-icon-trash", {player: 'ajax', width: 400, height: 150, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});

      Shadowbox.setup("#g-user-profile .g-dialog-link", {player: 'ajax', width: 500, height: 280, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});

      Shadowbox.setup("#add_to_basket .g-dialog-link",  {player: 'ajax', width: 500, height: 360, enableKeys: false, animate: false, onFinish: $().myAjaxSubmit});
*/
    } catch (e) { }

    try {
      $(".g-message-block").fadeOut(10000);
      $(".g-context-menu .g-ajax-link").gallery_ajax();
    } catch (e) { }

    $("#g-site-menu>ul>li>ul").show();
    $("#g-login-menu").show();
    $(".g-context-menu").show();

  // Initialize dialogs
  $(".g-dialog-link").gallery_dialog();

  // Initialize short forms
  // $(".g-short-form").gallery_short_form();

  },

});

$(document).ready(function() {
  $().theme_ready();
});
