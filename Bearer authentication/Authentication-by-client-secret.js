var HttpRequestHeader = Java.type("org.parosproxy.paros.network.HttpRequestHeader");
var HttpHeader = Java.type("org.parosproxy.paros.network.HttpHeader");
var URI = Java.type("org.apache.commons.httpclient.URI");

function authenticate(helper, paramsValues, credentials) {
	print("Authenticating via JavaScript script as client secret…");
 	var authHelper = new OAuthAuthenticator(helper, paramsValues, credentials);
	return authHelper.login();
}

function getRequiredParamsNames(){
	return ["adfs_endpoint","client_id","client_secret","resource"];
}

function getOptionalParamsNames(){
	return [];
}

function getCredentialsParamsNames(){
	return ["username", "password"];
}

function OAuthAuthenticator(helper, paramsValues, credentials) {
	this.helper = helper;
	this.adfs_endpoint = paramsValues.get('adfs_endpoint');
	this.client_id = paramsValues.get('client_id');
	this.client_secret = paramsValues.get('client_secret');
	this.resource = paramsValues.get('resource');
	return this;
}

OAuthAuthenticator.prototype = {
	login: function () {
		print("Starting with authenticat..");
 		var loginToken,
		requestBody = 'grant_type=' + encodeURIComponent('client_credentials') +
                '&client_id=' + encodeURIComponent(this.client_id) +
                '&client_secret=' + encodeURIComponent(this.client_secret) +
			 '&resource=' + encodeURIComponent(this.resource),
 		response = this.doRequest("https://" + this.adfs_endpoint + "/adfs/oauth2/token", HttpRequestHeader.POST, requestBody);

		if(response.getResponseHeader().isJson()) {
			var parsedResponse = JSON.parse(response.getResponseBody().toString());
		
			if (parsedResponse.error != null) {
				print('Authentication failure:');
				print(parsedResponse.error_description);
			} else {
				print("Token found, save as variable.");
				print("Token:" + parsedResponse.access_token);
				org.zaproxy.zap.extension.script.ScriptVars.setGlobalVar("access_token",parsedResponse.access_token);
				org.zaproxy.zap.extension.script.ScriptVars.setGlobalVar("resource",this.resource);
			}
		} else {
			print('Wrong setup of request because no JSON is returned!');
		}
		return response;
 	},
	doRequest: function (url, requestMethod, requestBody) {
		var msg,
			requestUri = new URI(url, false);
		
		requestHeader = new HttpRequestHeader(requestMethod, requestUri, HttpHeader.HTTP10);

		msg = this.helper.prepareMessage();
		msg.setRequestHeader(requestHeader);
		msg.setRequestBody(requestBody);
		
		requestHeader.setContentLength(requestBody.length);

		this.helper.sendAndReceive(msg);

		return msg;
	}
};