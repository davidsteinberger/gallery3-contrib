<?php defined("SYSPATH") or die("No direct script access.") ?>
/**
 * Gallery 3 <?= $display_name ?> Screen Styles
 *
 * @requires YUI reset, font, grids CSS
 *
 * Sheet organization:
 *  1)  Font sizes, base HTML elements
 *  2)  Reusable content blocks
 *  3)  Page layout containers
 *  4)  Content blocks in specific layout containers
 *  5)  Navigation and menus
 *  6)  jQuery and jQuery UI
 *  7)  Forms
 *  8)  States and interactions
 *  9)  Organize module style
 * 10)  Tag module styles
 * 11)  Right-to-left language styles
 */

/** *******************************************************************
 * 1) Font sizes, base HTML elements
 **********************************************************************/
html {
  color: #<?= $fcDefault ?>;
}

body, html {
  background-color: #<?= $bgColorDefault ?>;
  font-family: <?= urldecode($ffDefault) ?>;
  font-size: 13px/1.231;   /*  gallery_line_height */
}

p {
  margin-bottom: 1em;
}

em {
  font-style: oblique;
}

h1, h2, h3, h4, h5, strong, th {
  font-weight: bold;
}

h1 {
  font-size: 1.7em;
}

#g-dialog h1 {
  font-size: 1.1em;
}

h2 {
  font-size: 1.4em;
}

#g-sidebar .g-block h2 {
  font-size: 1.2em;
}

#g-sidebar .g-block li {
  margin-bottom: .6em;
}

#g-content,
#g-site-menu,
h3 {
  font-size: 1.2em;
}

#g-sidebar,
.g-breadcrumbs {
  font-size: .9em;
}

#g-banner,
#g-footer,
.g-message {
  font-size: .8em;
}

#g-album-grid .g-item,
#g-item #g-photo,
#g-item #g-movie {
  font-size: .7em;
}

/* Links ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

a,
.g-menu a,
#g-dialog a,
.g-button,
.g-button:active {
  color: #<?= $fcDefault ?> !important; /* fcDefault; */
  cursor: pointer !important;
  text-decoration: none;
  -moz-outline-style: none;
}

a:hover,
.g-button:hover,
a.ui-state-hover,
input.ui-state-hover,
button.ui-state-hover {
  color: #<?= $fcHover ?> !important; /* fcHover */
  text-decoration: none;
  -moz-outline-style: none;
}

a:hover,
#g-dialog a:hover {
  text-decoration: underline;
}

.g-menu a:hover {
  text-decoration: none;
}

#g-dialog #g-action-status li {
  width: 400px;
  white-space: normal;
  padding-left: 32px;
}

/* Tables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

table {
  width: 100%;
}

#g-content table {
  margin: 1em 0;
}

caption,
th {
  text-align: left;
}

th,
td {
  border: none;
  border-bottom: 1px solid #<?= $borderColorContent ?>;
  padding: .5em;
}

td {
  vertical-align: top;
}

.g-even {
  background-color: #<?= $bgColorContent ?>;
}

.g-odd {
  background-color: #<?= $bgColorDefault ?>;
}

/** *******************************************************************
 * 2) Reusable content blocks
 *********************************************************************/

.g-block h2 {
  background-color: #<?= $bgColorDefault ?>;
  padding: .3em .8em;
}

.g-block-content {
  margin-top: 1em;
}

/*** ******************************************************************
 * 3) Page layout containers
 *********************************************************************/

/* View container ~~~~~~~~~~~~~~~~~~~~~~~~ */

.g-view {
  background-color: #<?= $bgColorContent ?>;
  border: 1px solid #<?= $borderColorContent ?>;
  border-bottom: none;
}

/* Layout containers ~~~~~~~~~~~~~~~~~~~~~ */

#g-header {
  margin-bottom: 1em;
}

#g-banner {
  background-color: #<?= $bgColorHeader ?>;
  border-bottom: 1px solid #<?= $borderColorHeader ?>;
  color: #<?= $fcHeader?>;
  min-height: 5em;
  padding: 1em 20px;
  position: relative;
}

#g-content {
  padding-left: 20px;
  position: relative;
  width: 696px;
}

#g-sidebar {
  padding: 0 20px;
  width: 220px;
}

#g-footer {
  background-color: #<?= $bgColorHeader ?>;
  border-top: 1px solid #<?= $borderColorHeader ?>;
  margin-top: 20px;
  padding: 10px 20px;
  color: #<?= $fcHeader?>;
}

/* Status and validation messages ~~~~ */

.g-message-block {
  border: 1px solid #<?= $borderColorContent ?>;
}

#g-site-status li {
  border-bottom: 1px solid  #<?= $borderColorContent ?>;
}

/* Breadcrumbs ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

.g-breadcrumbs li {
  background: transparent url('../images/ico-separator.png') no-repeat scroll left center;
}

.g-breadcrumbs .g-first {
  background: none;
}

/* Pagination ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

.g-paginator {
}

.g-paginator li {
}

.g-paginator .g-info {
  background: none;
}

/* Dialogs and panels ~~~~~~~~~~~~~~~~~~ */

#g-dialog {
  text-align: left;
}

#g-dialog legend {
  display: none;
}

#g-dialog .g-cancel {
  margin: .4em 1em;
}

#g-panel {
  display: none;
  padding: 1em;
}

/* Inline layout  ~~~~~~~~~~ */

.g-inline li {
  float: left;
  margin-left: 1.8em;
  padding-left: 0 !important;
}

.g-inline li.g-first {
  margin-left: 0;
}

/** *******************************************************************
 * 4) Content blocks in specific layout containers
 *********************************************************************/

/* Header  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-banner #g-quick-search-form {
  clear: right;
  float: right;
  margin-top: 1em;
}

#g-banner #g-quick-search-form input[type='text'] {
  width: 17em;
}

#g-content .g-block h2 {
  background-color: transparent;
  padding-left: 0;
}

#g-login-menu li a {
  color: #<?= $fcHighlight ?> !important;
}

/* Sidebar  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-sidebar .g-block-content {
  padding-left: 1em;
}

#g-sidebar #g-image-block {
  overflow: hidden;
}

/* Album content ~~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-content #g-album-grid {
  margin: 1em 0;
  position: relative;
  z-index: 1;
}

#g-content #g-album-grid .g-item {
  background-color: #<?= $bgColorContent ?>;
  border: 1px solid #<?= $bgColorContent ?>;
  float: left;
  padding: .6em 8px;
  position: relative;
  text-align: center;
  width: 213px;
  z-index: 1;
}

#g-content #g-album-grid .g-item h2 {
  margin: 5px 0;
}

#g-content .g-photo h2,
#g-content .g-item .g-metadata {
  display: none;
  margin-bottom: .6em;
}

#g-content #g-album-grid .g-album {
  background-color: #<?= $bgColorDefault ?>;
}

#g-content #g-album-grid .g-album h2 span.g-album {
  background: transparent url('../images/ico-album.png') no-repeat top left;
  display: inline-block;
  height: 16px;
  margin-right: 5px;
  width: 16px;
}

#g-content #g-album-grid .g-hover-item {
  border: 1px solid #<?= $borderColorContent ?>;
  position: absolute !important;
  z-index: 1000 !important;
}

#g-content .g-hover-item h2,
#g-content .g-hover-item .g-metadata {
  display: block;
}

#g-content #g-album-grid #g-place-holder {
  position: relative;
  visibility: hidden;
  z-index: 1;
}

/* Search results ~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-content #g-search-results {
  margin-top: 1em;
  padding-top: 1em;
}

/* Individual photo content ~~~~~~~~~~~~~~ */

#g-item {
  position: relative;
  width: 100%;
}

#g-item #g-photo,
#g-item #g-movie {
  padding: 2.2em 0;
  position: relative;
}

#g-item img.g-resize,
#g-item a.g-movie {
  display: block;
  margin: 0 auto;
}

/* Footer content ~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-footer #g-credits li {
  padding-right: 1.2em;
}

#g-footer #g-credits li a {
  color: #<?= $fcHighlight ?> !important;
}

/* In-line editing  ~~~~~~~~~~~~~~~~~~~~~~ */

#g-in-place-edit-message {
  background-color: #<?= $bgColorContent ?>;
}

/* Permissions  ~~~~~~~~~~~~~~~~~~~~~~~~~~ */
#g-edit-permissions-form td {
  background-image: none;
}

#g-edit-permissions-form fieldset {
  border: 1px solid #<?= $borderColorHighlight ?>;
}

#g-permissions .g-denied {
  background-color: transparent;
}

#g-permissions .g-allowed {
  background-color: transparent;
}

.g-allowed a {
  background-image: url("themeroller/images/ui-icons_<?= $iconColorHighlight ?>_256x240.png") !important;
  display:inline-block;
  margin: auto;
}

.g-denied a {
  background-image: url("themeroller/images/ui-icons_<?= $iconColorError ?>_256x240.png") !important;
  display:inline-block;
  margin: auto;
}

.g-denied a.g-passive,
.g-allowed a.g-passive {
  filter:Alpha(Opacity=35);
  opacity: .55;
}

#g-permissions .g-active a {
  border: 1px solid #<?= $borderColorActive ?>;
  background: #<?= $bgColorActive ?>;
}

/** *******************************************************************
 * 5) Navigation and menus
 *********************************************************************/

/* Login menu ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-banner #g-login-menu {
  color: #<?= $fcHeader ?>;
  float: right;
}

#g-banner #g-login-menu li {
  padding-left: 1.2em;
}

/* Site Menu  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-site-menu {
  bottom: 0;
  left: 140px;
  position: absolute;
}

#g-site-menu ul {
  margin-bottom: 0 !important;
}

/* Context Menu  ~~~~~~~~~~~~~~~~~~~~~~~~~ */

.g-context-menu {
  background-color: #<?= $bgColorContent ?>;
  bottom: 0;
  left: 0;
  position: absolute;
}

.g-item .g-context-menu {
  display: none;
  margin-top: 2em;
  width: 100%;
}

#g-item .g-context-menu ul {
  display: none;
}

.g-context-menu li {
  border-left: none;
  border-right: none;
  border-bottom: none;
}

.g-context-menu li a {
  display: block;
  line-height: 1.6em;
}

.g-hover-item .g-context-menu {
  display: block;
}

.g-hover-item .g-context-menu li {
  text-align: left;
}

.g-hover-item .g-context-menu a:hover {
  text-decoration: none;
}

/* View Menu  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

#g-view-menu {
  margin-bottom: 1em;
}

#g-view-menu a {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  height: 28px !important;
  width: 43px !important;
}

#g-view-menu #g-slideshow-link {
  background-image: url('../images/ico-view-slideshow.png');
}

#g-view-menu .g-fullsize-link {
  background-image: url('../images/ico-view-fullsize.png');
}

#g-view-menu #g-comments-link {
  background-image: url('../images/ico-view-comments.png');
}

#g-view-menu #g-print-digibug-link {
  background-image: url('../images/ico-print.png');
}

/** *******************************************************************
 * 6) jQuery and jQuery UI
 *********************************************************************/

/* jQuery UI Dialog ~~~~~~~~~~~~~~~~~~~~~~ */

.ui-widget-overlay {
  background: #<?= $bgColorOverlay ?>;
  opacity: .7;
}

/* Rotate icon, ThemeRoller only provides one of these */

.ui-icon-rotate-ccw {
  background-position: -192px -64px;
}

.ui-icon-rotate-cw {
  background-position: -208px -64px;
}

/* Superfish menu overrides ~~~~~~~~~~~~~~ */
.sf-menu a {
  border-left:1px solid #<?= $borderColorContent ?>;
}

.sf-menu li,
.sf-menu li li,
.sf-menu li li ul li {
  background-color: #<?= $bgColorDefault ?>;
}

.sf-menu li:hover {
  background-color: #<?= $bgColorHover ?>;
}

.sf-menu li:hover,
.sf-menu li.sfHover,
.sf-menu a:focus,
.sf-menu a:hover,
.sf-menu a:active {
  background-color: #<?= $bgColorHover ?> !important;
}

.sf-sub-indicator {
  background-image: url("themeroller/images/ui-icons_<?= $iconColorHighlight ?>_256x240.png");
  height: 16px;
  width: 16px;
}

a > .sf-sub-indicator {
  background-position: -64px -16px !important;
  top: 0.6em;
}

.sf-menu ul a > .sf-sub-indicator {
  background-position: -32px -16px !important;
}

/** *******************************************************************
 * 7) Forms
 *********************************************************************/
fieldset {
  border: 1px solid #<?= $borderColorContent ?>;
}

legend {
  font-weight: bold;
  color: #<?= $fcDefault ?>;
}

input.textbox,
input[type="text"],
input[type="password"],
textarea {
  background-color: #<?= $bgColorDefault ?>;
  border: 1px solid #<?= $borderColorActive ?>;
  border-top-color: #<?= $borderColorContent ?>;
  border-left-color: #<?= $borderColorContent ?>;
  color: #<?= $fcContent ?>;
}

input:focus,
input.textbox:focus,
input[type=text]:focus,
textarea:focus,
option:focus {
  background-color: #<?= $bgColorActive ?>;
  color: #<?= $fcContent ?>;
}

/* Forms in dialogs and panels ~~~~~~~~~ */

label,
input[readonly] {
  background-color: #<?= $bgColorContent ?>;
  color: #<?= $fcDefault ?>;
}

/* Short forms ~~~~~~~~~~~~~~~~~~~~~~~ */

.g-short-form .textbox,
.g-short-form input[type=text] {
  background-color: <?= $bgColorDefault ?>
  color: #<?= $fcContent ?>;
}

.g-short-form .textbox.g-error {
  border: 1px solid #<?= $borderColorError ?>;
  color: #<?= $fcError ?>;
}

/** *******************************************************************
 * 8) States and interactions
 *********************************************************************/

.g-active,
.g-enabled,
.g-available,
.g-selected,
.g-highlight {
  font-weight: bold;
}

.g-inactive,
.g-disabled,
.g-unavailable,
.g-uneditable,
.g-locked,
.g-deselected,
.g-understate {
  color: #<?= $borderColorContent ?>;
  font-weight: normal;
}

.g-editable:hover {
  background-color: #<?= $bgColorActive ?>;
  color: #<?= $iconColorActive ?>
}

form li.g-error,
form li.g-info,
form li.g-success,
form li.g-warning {
  background-image: none;
}


form.g-error input[type="text"],
li.g-error input[type="text"],
form.g-error input[type="password"],
li.g-error input[type="password"],
form.g-error input[type="checkbox"],
li.g-error input[type="checkbox"],
form.g-error input[type="radio"],
li.g-error input[type="radio"],
form.g-error textarea,
li.g-error textarea,
form.g-error select,
li.g-error select {
  border: 2px solid #<?= $fcError ?>;
}

.g-error,
tr.g-error td.g-error,
#g-add-photos-status .g-error {
  background: #<?= $borderColorError ?> url('../images/ico-error.png') no-repeat .4em 50%;
  color: #<?= $fcError ?>;
}

.g-info {
  background: #<?= $bgColorContent ?> url('../images/ico-info.png') no-repeat .4em 50%;
}

.g-success,
#g-add-photos-status .g-success {
  background: #<?= $bgColorContent ?> url('../images/ico-success.png') no-repeat .4em 50%;
}

tr.g-success {
  background-image: none;
}

tr.g-success td.g-success {
  background-image: url('../images/ico-success.png');
}

.g-warning,
tr.g-warning td.g-warning {
  background: #<?= $bgColorWarning ?> url('../images/ico-warning.png') no-repeat .4em 50%;
  color: #<?= $fcWarning ?>;
}

form .g-error {
  background-color: #<?= $bgColorError ?>;
}

.g-default {
  background-color: #<?= $bgColorDefault ?>;
  font-weight: bold;
}

.g-draggable:hover {
  border: 1px dashed #<?= $bgColorHighlight ?>;
}

.ui-sortable .g-target,
.ui-state-highlight {
  background-color: #<?= $bgColorHighlight ?>;
  border: 2px dotted #<?= $borderColorHighlight ?>;
}

/* Ajax loading indicator ~~~~~~~~~~~~~~~~ */

.g-loading-large,
.g-dialog-loading-large {
  background: #<?= $bgColorContent ?> url('../images/loading-large.gif') no-repeat center center !important;
}

.g-loading-small {
  background: #<?= $bgColorContent ?> url('../images/loading-small.gif') no-repeat center center !important;
}

/** *******************************************************************
 * 9) Organize module style
 *********************************************************************/
#g-organize {
  background-color: #<?= $bgColorContent ?>;
  border: 0px solid #<?= $borderColorContent ?>;
  color: #<?= $fcContent ?>;
}

#g-organize-hover {
  background-color: #<?= $bgColorHover ?>;
  display: none;
}

#g-organize-active {
  background-color: #<?= $bgColorHighlight ?>;
  display: none;
}

/** *******************************************************************
 * 10) Tag module styles
 *********************************************************************/
/* Tag cloud ~~~~~~~~~~~~~~~~~~~~~~~ */
#g-tag-cloud ul li a {
  text-decoration: none;
}

#g-tag-cloud ul li.size0 a {
  color: #<?= $fcContent ?>;
  font-size: 70%;
  font-weight: 100;
}

#g-tag-cloud ul li.size1 a {
  color: #<?= $fcContent ?>;
  font-size: 80%;
  font-weight: 100;
}

#g-tag-cloud ul li.size2 a {
  color: #<?= $fcContent ?>;
  font-size: 90%;
  font-weight: 300;
}

#g-tag-cloud ul li.size3 a {
  color: #<?= $fcContent ?>;
  font-size: 100%;
  font-weight: 500;
}

#g-tag-cloud ul li.size4 a {
  color: #<?= $fcContent ?>;
  font-size: 110%;
  font-weight: 700;
}

#g-tag-cloud ul li.size5 a {
  color: #<?= $fcContent ?>;
  font-size: 120%;
  font-weight: 900;
}

#g-tag-cloud ul li.size6 a {
  color: #<?= $fcContent ?>;
  font-size: 130%;
  font-weight: 900;
}

#g-tag-cloud ul li.size7 a {
  color: #<?= $fcContent ?>;
  font-size: 140%;
  font-weight: 900;
}

#g-tag-cloud ul li a:hover {
  color: #f30;
  text-decoration: underline;
}

/** *******************************************************************
 * 11) Right to left language styles
 *********************************************************************/

.rtl #g-header #g-login-menu,
.rtl #g-header #g-quick-search-form {
  clear: left;
  float: left;
}

.rtl #g-header #g-login-menu li {
  margin-left: 0;
  padding-left: 0;
  padding-right: 1.2em;
}

.rtl #g-site-menu {
  left: auto;
  right: 150px;
}

.rtl #g-view-menu #g-slideshow-link {
  background-image: url('../images/ico-view-slideshow-rtl.png');
}

.rtl #g-sidebar .g-block-content {
  padding-right: 1em;
  padding-left: 0;
}

.rtl #g-footer #g-credits li {
  padding-left: 1.2em !important;
  padding-right: 0;
}

.rtl .g-breadcrumbs li {
  background: transparent url('../images/ico-separator-rtl.png') no-repeat scroll right center;
}

.rtl .g-breadcrumbs .g-first {
  background: none;
}

/* RTL Corner radius ~~~~~~~~~~~~~~~~~~~~~~ */
.rtl .g-buttonset .ui-corner-tl {
        -moz-border-radius-topleft: 0;
        -webkit-border-top-left-radius: 0;
        border-top-left-radius: 0;
        -moz-border-radius-topright: 5px !important;
        -webkit-border-top-right-radius: 5px !important;
        border-top-right-radius: 5px !important;
}

.rtl .g-buttonset .ui-corner-tr {
        -moz-border-radius-topright: 0;
        -webkit-border-top-right-radius: 0;
        border-top-right-radius: 0;
        -moz-border-radius-topleft: 5px !important;
        -webkit-border-top-left-radius: 5px !important;
        border-top-left-radius: 5px !important;
}

.rtl .g-buttonset .ui-corner-bl {
        -moz-border-radius-bottomleft: 0;
        -webkit-border-bottom-left-radius: 0;
        border-bottom-left-radius: 0;
        -moz-border-radius-bottomright: 5px !important;
        -webkit-border-bottom-right-radius: 5px !important;
        border-bottom-right-radius: 5px !important;
}

.rtl .g-buttonset .ui-corner-br {
        -moz-border-radius-bottomright: 0;
        -webkit-border-bottom-right-radius: 0;
        border-bottom-right-radius: 0;
        -moz-border-radius-bottomleft: 5px !important;
        -webkit-border-bottom-left-radius: 5px !important;
        border-bottom-left-radius: 5px !important;
}

.rtl .g-buttonset .ui-corner-right,
.rtl .ui-progressbar .ui-corner-right {
        -moz-border-radius-topright: 0;
        -webkit-border-top-right-radius: 0;
        border-top-right-radius: 0;
        -moz-border-radius-topleft: 5px !important;
        -webkit-border-top-left-radius: 5px !important;
        border-top-left-radius: 5px !important;
        -moz-border-radius-bottomright: 0;
        -webkit-border-bottom-right-radius: 0;
        border-bottom-right-radius: 0;
        -moz-border-radius-bottomleft: 5px !important;
        -webkit-border-bottom-left-radius: 5px !important;
        border-bottom-left-radius: 5px !important;
}

.rtl .g-buttonset .ui-corner-left,
.rtl .ui-progressbar .ui-corner-left {
        -moz-border-radius-topleft: 0;
        -webkit-border-top-left-radius: 0;
        border-top-left-radius: 0;
        -moz-border-radius-topright: 5px !important;
        -webkit-border-top-right-radius: 5px !important;
        border-top-right-radius: 5px !important;
        -moz-border-radius-bottomleft: 0;
        -webkit-border-bottom-left-radius: 0;
        border-bottom-left-radius: 0;
        -moz-border-radius-bottomright: 5px !important;
        -webkit-border-bottom-right-radius: 5px !important;
        border-bottom-right-radius: 5px !important;
}

/* RTL Superfish ~~~~~~~~~~~~~~~~~~~~~~~~~ */

.rtl .sf-menu a {
  border-right:1px solid #<?= $borderColorHighlight ?>;
}

.rtl .sf-sub-indicator {
  background: url("themeroller/images/ui-icons_2e83ff_256x240.png") no-repeat -96px -16px; /* 8-bit indexed alpha png. IE6 gets solid image only */
}

/*** shadows for all but IE6 ***/
.rtl .sf-shadow ul {
  background: url('../images/superfish-shadow.png') no-repeat bottom left;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  -moz-border-radius-topright: 0;
  -moz-border-radius-bottomleft: 0;
  -webkit-border-top-right-radius: 0;
  -webkit-border-bottom-left-radius: 0;
  -moz-border-radius-topleft: 17px;
  -moz-border-radius-bottomright: 17px;
  -webkit-border-top-left-radius: 17px;
  -webkit-border-bottom-right-radius: 17px;
  border-top-left-radius: 17px;
  border-bottom-right-radius: 17px;
}
