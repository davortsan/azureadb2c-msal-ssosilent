# Single Sign-On between multiple applications - Azure Active Directory B2C

It is frequent the necesity of Single Sign-On between multiple Azure AD B2C applications so, if the user types his/her credentials and they are validated in the first app,  automatic login will be executed in other applications that are registered in the same Azure AD B2C tenant. This could be possible with SSOSilent function that is in MSAL.

<h2>Requirements</h2>

If you would like to test it, you need:
<ul>
  <li><b>Azure Subscription</b> - It is necessary to create a B2C tenant. You can get a free trial from here: https://azure.microsoft.com/en-us/free
  <li><b>Azure Active Directory B2C tenant</b> - https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant
  <li><b>Visual Studio Code</b> - https://code.visualstudio.com If you are familiar with another different code editor, please fell free to use it.
  <li><b>Node.js runtime</b> - https://nodejs.org/en/download
</ul>

<h2>Create App registrations and <b>Sign up and Sign in</b> policy</h2>

```powershell
$cred = Get-Credential
```
