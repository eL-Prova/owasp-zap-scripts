function sendingRequest(msg, initiator, helper) {
	//Part of the path for the scope, so not each call will contain the bearer
	scope_url = "some-part-of-the-url";
	request_url = msg.getRequestHeader().getURI().toString();
	if(request_url.indexOf(scope_url) === -1) {
		return;
	}

	var access_token=org.zaproxy.zap.extension.script.ScriptVars.getGlobalVar("access_token");
	var resource=org.zaproxy.zap.extension.script.ScriptVars.getGlobalVar("resource");
	
	//set http header
	var httpRequestHeader = msg.getRequestHeader();
	httpRequestHeader.setHeader("Authorization","Bearer "+access_token);
	httpRequestHeader.setHeader("X-Resource",resource);
	msg.setRequestHeader(httpRequestHeader);
}

function responseReceived(msg, initiator, helper) {
}