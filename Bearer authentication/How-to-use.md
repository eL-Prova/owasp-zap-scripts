# How to use with username / password authentication
The source files within this folder are needed to provide the option within OWASP ZAP to authenticate an user in ADFS.
The following steps need to be done to make this work:

## Setup the scripts in OWASP ZAP
- Within the OWASP ZAP application you need to go to the scripts tab.
- Select the name Authentication within the tree
- Left top select Load script (or create a new one)
- Import the file "Authentication-by-context-user.js" or copy the script and paste it in your new script
- Select the name HTPP Sender
- Left top select Load script (or create a new one)
- Import the file "HttpSender-bearer.js" or copy the script and paste it in your new script
- Save both files

Ps. keep in mind, to enable the HTTP Sender

## Configure context
- Go to tab Sites and select under Context the context for your scan. Eg. Default Context
- Select in popup in the tree under the context the label Authentication
- Set context on value Script-based Authentication
- Select script "Authentication-by-context-user" and select Load
  - Fill value adfs_endpoint
  - Fill value client_id
  - Fill value resource
  - Fill value username
  - Fill value password
- Set Logged In regex pattern
  - Value: access_token
- Set Logged out regex pattern
  - Value: Unauthorized|invalid_token
- Select in the tree the label Users
- Add user with username and password
- Select in the tree the label Forced Users
- Select the new user
- Select in the tree the label Session Management
- Select the option HTTP Authentication Session Management
- Select OK

## Run spider / attack
Now you can select an url and run a spider or attack.

# How to use with client secret authentication
The source files within this folder are needed to provide the option within OWASP ZAP to authenticate a client secret in ADFS.
The following steps need to be done to make this work:

## Setup the scripts in OWASP ZAP
- Within the OWASP ZAP application you need to go to the scripts tab.
- Select the name Authentication within the tree
- Left top select Load script (or create a new one)
- Import the file "Authentication-by-client-secret.js" or copy the script and paste it in your new script
- Select the name HTPP Sender
- Left top select Load script (or create a new one)
- Import the file "HttpSender-bearer.js" or copy the script and paste it in your new script
- Save both files

Ps. keep in mind, to enable the HTTP Sender

## Configure context
- Go to tab Sites and select under Context the context for your scan. Eg. Default Context
- Select in popup in the tree under the context the label Authentication
- Set context on value Script-based Authentication
- Select script "Authentication-by-client-secret" and select Load
  - Fill value adfs_endpoint
  - Fill value client_id
  - Fill value client_secret
  - Fill value resource
- Set Logged In regex pattern
  - Value: access_token
- Set Logged out regex pattern
  - Value: Unauthorized|invalid_token
- Select in the tree the label Users
- Add user with username and password
- Select in the tree the label Forced Users
- Select the new user (this is only needed so the authentication is triggered)
- Select in the tree the label Session Management
- Select the option HTTP Authentication Session Management
- Select OK

## Run spider / attack
Now you can select an url and run a spider or attack.
