<?php
/**
* Author:	Davin Luginbühl, Kevin Manz
* Component:    Gallery Component
* Version:	1.0.0
* Date:		07.08.2017
* copyright	Copyright (C) 2017 servergarden.ch. All Rights Reserved.
* @license	http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
**/

defined( '_JEXEC' ) or die( 'Restricted access' );


jimport('joomla.application.component.controller');

// Create the controller
$controller = JControllerLegacy::getInstance('GalleryComponent');

// Perform the Request task
$controller->execute(JRequest::getCmd('task'));

// Redirect if set by the controller
$controller->redirect();

 ?>