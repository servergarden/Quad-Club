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

jimport('joomla.application.component.view');

class GalleryComponentViewDefault extends JViewLegacy
{

	protected $params;

	public function display($tpl = null)
	{
		$app	= JFactory::getApplication();
		$params = $app->getParams();
		$menus	= $app->getMenu();
		$menu	= $menus->getActive();

		if ($menu)
		{
			$params->set('page_heading', $params->get('page_title', $menu->title));
		}
		else
		{
			$params->set('page_title',	JText::_('Blank Component'));
		}

		$title = $params->get('page_title');
		if ($app->getCfg('sitename_pagetitles', 0)) {
			$title = JText::sprintf('JPAGETITLE', $app->getCfg('sitename'), $title);
		}
		$this->document->setTitle($title);

		if ($params->get('menu-meta_description'))
		{
			$this->document->setDescription($params->get('menu-meta_description'));
		}

		if ($params->get('menu-meta_keywords')) 
		{
			$this->document->setMetadata('keywords', $params->get('menu-meta_keywords'));
		}

		if ($params->get('robots')) 
		{
			$this->document->setMetadata('robots', $params->get('robots'));
		}

		$this->assignRef('params',		$params);

		parent::display($tpl);
	}
}
