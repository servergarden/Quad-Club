<?php
/**
* Author:	Davin Luginbühl, Kevin Manz
* Component:    Gallery Component
* Version:	1.0.0
* Date:		07.08.2017
* copyright	Copyright (C) 2017 servergarden.ch. All Rights Reserved.
* @license	http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
**/

// No direct access
defined('_JEXEC') or die;

jimport('joomla.application.component.controller');

class GalleryComponentController extends JControllerLegacy
{

	public function display($cachable = false, $urlparams = false)
	{
		JRequest::setVar('view',JRequest::getCmd('view')); // force it to be the search view

		return parent::display($cachable, $urlparams);
	}

}
