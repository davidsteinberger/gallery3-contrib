<?php defined("SYSPATH") or die("No direct script access.");

class ThumbNav_block_Core {

  static function get_site_list() {
    return array("thumbnav_block" => t("Navigator"));
  }

  static function get($block_id, $theme) {
    $block = "";
    switch ($block_id) {
      case "thumbnav_block":
        $item = $theme->item;
        if ((!$item) or (!$item->is_photo())): // Only should be used in photo pages
          break;
        endif;

        //

        $siblings = $item->parent()->children();
        $current = -1;
        $total = count($siblings);

        $thumb_count = module::get_var("thumbnav", "thumb_count", 9);
        $thumb_count = min($thumb_count, $total);
        $shift_right = floor($thumb_count / 2);
        $shift_left = $thumb_count - $shift_right - 1;

        $content = '<!-- ' . $shift_left . ':' . $shift_right . ' -->';

        for ($i = 1; $i <= $total; $i++):
          if ($siblings[$i-1]->rand_key == $item->rand_key):
            $current = $i;
            break;
          endif;
        endfor;


        if ($current >= 1):
          $first = $current - $shift_left;
          $last = $current + $shift_right;
          if ($first <= 0):
            $last = min($last - $first + 1, $total);
            $first = 1;
          elseif ($last > $total):
            $first = max($first - ($last - $total), 1);
            $last = $total;
          endif;

		  $content .= "<div id=\"thumbs\" style=\"margin-left:-30px;\">"
						. "<ul class=\"thumbs noscript\">";
          for ($i = $first; $i <= $last; $i++):
          
          	if ($i == $current):
          		$content .= '<li><a id="id' . $siblings[$i - 1]->id . '" num="' . ($i - 1) . '" name="' . urlencode($siblings[$i - 1]->id) . '" class="thumb" href="' . $siblings[$i - 1]->resize_url() .'">';
	            $content .= $siblings[$i - 1]->thumb_img(array("class" => "g-navthumb g-current"), 60);
    	        $content .='</a></li>';     	
          	else:
          		$content .= '<li><a id="id' . $siblings[$i - 1]->id . '" name="' . urlencode(html::purify($siblings[$i - 1]->id)) . '" class="thumb" href="' . $siblings[$i - 1]->resize_url() .'">';
	            $content .= $siblings[$i - 1]->thumb_img(array("class" => "g-navthumb"), 60);
    	        $content .='</a></li>';    
          	endif;
          
                                                 
          endfor; 
        endif;
        
        $content .= "</ul></div>";
        
        $content .= "<div style=\"clear: both;\"></div>";
        
        //$content = "";

        $block = new Block();
        $block->css_id = "g-thumbnav-block";
        $block->title = t("Navigator");
        $block->content = new View("thumbnav_block.html");
        $block->content->player = $content;
        break;
    }

    return $block;
  }
}

?>