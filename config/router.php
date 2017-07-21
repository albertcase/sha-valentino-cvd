<?php

$routers = array();
$routers['/api/oauth'] = array('CampaignBundle\Page', 'oauth');
$routers['/api/callback'] = array('CampaignBundle\Page', 'callback');
$routers['/api/stock'] = array('CampaignBundle\Page', 'stock');