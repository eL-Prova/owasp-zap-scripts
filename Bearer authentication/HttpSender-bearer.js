function sendingRequest(msg, initiator, helper) {
	if(!msg.isInScope()) {
		return;
	}

	var access_token = org.zaproxy.zap.extension.script.ScriptVars.getGlobalVar("access_token");
	var resource = org.zaproxy.zap.extension.script.ScriptVars.getGlobalVar("resource");
	
	//set http header
	var httpRequestHeader = msg.getRequestHeader();
	httpRequestHeader.setHeader("Authorization","Bearer "+access_token);
	httpRequestHeader.setHeader("X-Resource",resource);
	msg.setRequestHeader(httpRequestHeader);
}

function responseReceived(msg, initiator, helper) {
}