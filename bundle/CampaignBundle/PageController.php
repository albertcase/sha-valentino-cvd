<?php
namespace CampaignBundle;

use Core\Controller;

class PageController extends Controller {
	
	private function generateRedirectUrl($url, $param) {
	    $parse_url = parse_url(urldecode($url));
	    $base = $parse_url['scheme'] . '://' . $parse_url['host'] . $parse_url['path'];
	    if(isset($parse_url['query'])) {
	      parse_str($parse_url['query'], $query);
	      $param = array_merge($query, $param);
	    }
	    return $base . '?' . http_build_query($param);
  	}

	# 授权
	public function oauthAction()
	{
		$param = array();
		$request = $this->Request();
		$param['hmsr'] = $request->query->get('hmsr');
		$callback_url = BASE_URL.'api/callback'; 
		$redirect_url = urlencode($this->generateRedirectUrl($callback_url, $param));
		$api_url = 'http://valentinowechat.samesamechina.com/v1/wx/web/oauth2/authorize';
		$redirect = $this->generateRedirectUrl($api_url, array(
				'redirect_uri' => $redirect_url,
				'scope' => 'snsapi_base',
			));
		$this->redirect($redirect);
	}

	# 授权回调
	public function callbackAction()
	{
		$request = $this->Request();
		$openid = $request->query->get('openid');
		$param = array(); 
		$hmsr = $request->query->get('hmsr');
		if($this->userFollow($openid)) {
			$src = "https://wechatshop.valentinoworld.com/static/flow.html";
			$param['t'] = time();
			$param['src'] = $hmsr;
			$param['openid'] = $openid;
			$redirect_url = $this->generateRedirectUrl($src, $param);
			$this->redirect($redirect_url);
		} else {
			$url = $this->generateRedirectUrl(BASE_URL.'follow.html', array('hmsr' => $hmsr));
			$this->redirect($url);
		}
	}
	
	# 验证用户是否关注
	public function userFollow($openid)
	{
		$api_url = 'http://valentinowechat.samesamechina.com/api/v1/follow?openid='.$openid;
		$data = file_get_contents($api_url);
        $data = json_decode($data);
        if($data->code == 200) {
        	return true;
        } else {
        	return false;
        }
	}

	# 判断库存
	public function stockAction()
	{
		if($this->checkStock()) {
			$this->statusPrint('1', '有库存');
		} else {
			$this->statusPrint('0', '无库存');
		}	
	}

	# api 验证是否有库存
	private function checkStock() 
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
}