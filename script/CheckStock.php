<?php
define('SITE_URL', dirname(dirname(__FILE__)));
require_once SITE_URL . '/Core/bootstrap.php';
include_once SITE_URL . '/config/config.php';
include_once SITE_URL . '/config/router.php';

$editpage = array('ad.html', 'app.html', 'social.html');
$page = 'test-sellout.html';
$stock = new Stock($editpage, $page);
$stock->editpage();


class Stock
{
	private $editpage;
	private $page;

	public function __construct($editpage, $page)
	{
		$this->editpage = $editpage;
		$this->page = $page;
	}

	// 判断是否有库存
	public function checkStock()
	{
		$api_url = 'https://wechatshop.valentinoworld.com/getProductAvailability/1';
		$data = file_get_contents($api_url);
        $data = json_decode($data);
        $count = $data->qty - $data->orderedqty;
        if($count <= 0) {
        	return false;
        } 
        return true;
	}

	// 修改页面为售罄页面
	public function editPage()
	{
		if($this->checkStock()){
			foreach ($this->editpage as $k => $v) {
				$contents = file_get_contents(SITE_URL . '/' . $this->page);
				var_dump(SITE_URL . '/' . $v);
				file_put_contents(SITE_URL . '/' . $v, $contents);
			}
		}	
	}

}