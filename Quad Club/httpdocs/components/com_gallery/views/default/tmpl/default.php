<?php
/**
* Author:	Davin Luginbühl, Kevin Manz
* Component:    Gallery Component
* Version:	1.0.0
* Date:		07.08.2017
* copyright	Copyright (C) 2017 servergarden.ch. All Rights Reserved.
* @license	http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
**/
// no direct access
defined('_JEXEC') or die;

$folders = scandir(JURI::base(true).'images/years');

foreach($folders as $folder){

  if($folder!="."&&$folder!=".."){

    $files = glob(JURI::base(true).'images/years/' . $folder . '/*.jpg');

    if ( $files !== false ){

      $filecount = count($files);

    }else{

      $filecount = -1;

    }

    $fay = [
      "name" => $folder,
      "count" => $filecount,
    ];
    
    $folder_array[] = $fay;

  }

}

rsort($folder_array);

 $app       = JFactory::getApplication(); // Access the Application Object

 $menu      = $app->getMenu(); // Load the JMenuSite Object

 $active    = $menu->getActive(); // Load the Active Menu Item as an stdClass Object




?>
<script type="text/javascript">
    var folders = JSON.parse('<?php echo json_encode($folder_array); ?>');
    var joomla_page = '<?php echo $active->alias; ?>';
</script>
<?php
// load js and css file
$document = JFactory::getDocument();
$document->addStyleSheet(JURI::base().'components/com_gallery/assets/css/font-awesome.css');
$document->addScript(JURI::base().'components/com_gallery/assets/js/quad_main.js');
?>

<div id="botsi_content"></div>
<div id="dis_big" class="display_big">
<div id="clicker"></div>
<img /><div id="txt_display"></div></div>
<div id="botsi_header"></div>
<div id="quad_galery_text_2016_11_05" class="display_big_ini" >12. Münsinger Oldies-Night Schlossgutsaal, Münsingen
photo001 Eintreten ...
photo002 ... Bändeli fassen ...
photo003 ... und ab auf die Tanzfläche.
photo004 Die Kühlschränke sind prallvoll ...
photo008 DJ at Work ...</div>
<div id="quad_galery_text_2015_11_07" class="display_big_ini" >11. Münsinger Oldies-Night Schlossgutsaal, Münsingen
photo001 Bühne ist bereit ...
photo002 ... der Saal auch ...
photo004 ... die Tanzfläche füllt sich.
photo043 Das OK Team ...
photo044 ... mehr Team ...</div>
<div id="quad_galery_text_2015_05_30" class="display_big_ini" >Let’s dance Disco Oldies-Night Zentrum Paul Klee, Bern
photo002 Alles bereit ...
photo006 ... die Oldies trudeln ein ...
photo021 Disco time !</div>
<div id="quad_galery_text_2014_11_01" class="display_big_ini" >photo020 The Hardy's Bubbles legen los ...</div>
<div id="quad_galery_text_2009_11_07" class="display_big_ini" >photo010 ... unser DJ vor gelbgrünem Lichtwasserfall ...
photo011 endlich richtige Disco Atmosphäre ...
4. Münsinger Oldies-Night Schlossgutsaal, Münsingen</div>
<div id="quad_galery_text_2009_11_06" class="display_big_ini" >1. Tabu-Club Revival-Night Schlossgutsaal, Münsingen</div>
