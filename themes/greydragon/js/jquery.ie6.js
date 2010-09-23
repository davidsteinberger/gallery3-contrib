(function($){
   $(function(){
      var message = "This site does not support Internet Explorer 6. Please consider downloading a <a href='http://firefox.com'>newer browser</a>.",
          div = $('<div id="ie-warning"></div>').html(message).css({
                   'height': '50px',
                   'line-height': '50px',
                   'background-color':'#f9db17',
                   'text-align':'center',
                   'font-family':'Arial, Helvetica, sans-serif',
                   'font-size':'12pt',
                   'font-weight':'bold',
                   'color':'black'
                }).hide().find('a').css({color:'#333'}).end();
      div.prependTo(document.body).slideDown(500);
    });
})(jQuery);