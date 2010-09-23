<?php defined("SYSPATH") or die("No direct script access.") ?>
<style>
#g-header                    { margin-bottom: 10px; }
#g-admin-thumbnav            { position: relative; font-size: 0.9em; }
#g-admin-thumbnav legend     { width: 99.5%; padding: 0.4em 0.8em; margin-left: -11px; background: url(/themes/greydragon/images/blue-grad.png) #d5e6f2 repeat-x left top; border: #dfdfdf 1px solid;}

#g_admin_thumbnavcfg input.g-error   { padding-left: 30px; border: none; }
#g_admin_thumbnavcfg input.g-success { background-color: transparent; }
#g_admin_thumbnavcfg input.g-warning { background-color: transparent; border: none; }
#g_admin_thumbnavcfg p.g-error       { padding-left: 30px; border: none; margin-bottom: 0; background-image: none; }

.g-admin-thumbnav-left       { float: left; width: 53%; }
.g-admin-thumbnav-right      { float: left; width: 46%; margin-left: 1%; margin-top: 1em; }
.g-admin-thumbnav-right h3   { border-bottom: #a2bdbf 1px solid; margin-top: 0.3em; margin-bottom: 0.3em; }

#g-admin-thumbnav-head       { position: relative; height: auto; clear: both; display: block; overflow: auto; font-size: 11px; padding: 0.4em 0.8em; background-color: #b7c9d6; border: #a2bdbf 1px solid; }
#g-admin-thumbnav-title      { float: left; color: #333v42; font-weight: bold; font-size: 1.6em; text-shadow: #deeefa 0 1px 0; }
#g-admin-thumbnav-hlinks ul  { float: right; margin-top: 0.4em; font-size: 11px; }
#g-admin-thumbnav-hlinks li  { list-style-type: none; float: left; color: #618299; display: inline; }
#g-admin-thumbnav-hlinks a   { font-weight: bold; font-size: 13px; }

#g-content                   { padding: 0 1em; width: 97%; font-size: 1em; }
#g-content form ul li input  { display: inline; float: left; margin-right: 0.8em; } 
#g-content form ul li select { display: inline; float: left; margin-right: 0.8em; width: 10em; padding: 0 0 0 .2em; }
#g-content form ul li input[type='text'] { width: 50%; }
#g-content form input[type="submit"] { border: #5b86ab 2px solid; padding: 0.3em; color: #fff; background: url(/themes/greydragon/images/button-grad-vs.png) #5580a6 repeat-x left top; }
#g-content form input[type="submit"]:hover,
input.ui-state-hover { background-image: url(/themes/greydragon/images/button-grad-active-vs.png); border-color: #2e5475; color: #eaf2fa !important; }
#g-content form #vercheck, #g-content form #shadowbox, #g-content form #organizecheck { display: none; }
</style>

<script>
  $(document).ready( function() { 
    $('form').submit( function() {
      $('input[type=submit]', this).attr('disabled', 'disabled');
    });
  });
</script>

<div id="g-admin-thumbnav" class="g-block">
  <div id="g-admin-thumbnav-head">
    <div id="g-admin-thumbnav-title"><?= t("Thumb Navigator Module") ?></div>
    <div id="g-admin-thumbnav-hlinks">
      <ul><li><a href="http://gallery.menalto.com/node/95116" target="_blank"><?= t("Support") ?></a>&nbsp;|&nbsp;</li>
        <li><a href="http://codex.gallery2.org/Gallery3:Modules:thumbnav" target="_blank"><?= t("Download") ?></a>&nbsp;|&nbsp;</li>
        <li><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="9MWBSVJMWMJEU">
          <input type="image" src="/themes/greydragon/images/donate.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
          <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></li>
      </ul>
    </div>
  </div>
  <div class="g-block-content g-admin-thumbnav-left">
  <?= $form ?>
  </div>
  <div class="g-admin-thumbnav-right">
  <?= $help ?>
  </div>
</div>
