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
		$param['hmsr'] = $this->query->get('hmsr');
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
		$openid = $this->query->get('openid');
		$param = array(); 
		if($this->userFollow($openid)) {
			$src = "https://wechatshop.valentinoworld.com/static/flow.html";
			$param['src'] = $this->query->get('hmsr');
			$param['t'] = time();
			$param['openid'] = $openid;
			$redirect_url = $this->generateRedirectUrl($src, $param);
			$this->redirect($redirect_url);
		} else {
			$this->$redirect('/follow.html');
		}
	}
	
	# 验证用户是否关注
	public function userFollow($openid)
	{
		$api_url = 'http://valentinowechat.samesamechina.com/api/v1/follow?openid='.$openid;
		$data = file_get_contents($api_url);
        $data = json_decode($data);
        if($data->errcode == 0) {
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
	private function checkStock(){
		return false;
	}
}