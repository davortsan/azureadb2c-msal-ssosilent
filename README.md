# Single Sign-On between multiple applications - Azure Active Directory B2C

It is frequent the necesity of Single Sign-On between multiple Azure AD B2C applications so, if the user types his/her credentials and they are validated in the first app,  automatic login will be executed in other applications that are registered in the same Azure AD B2C tenant. This could be possible with SSOSilent function that is available in MSAL (https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview)

<h2>Requirements</h2>

If you would like to test it, you need:
<ul>
  <li><b>Azure Subscription</b> - It is necessary to create a B2C tenant. You can get a free trial from here: https://azure.microsoft.com/en-us/free
  <li><b>Azure Active Directory B2C tenant</b> - https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant
  <li><b>Visual Studio Code</b> - https://code.visualstudio.com If you are familiar with another different code editor, please fell free to use it.
  <li><b>Node.js runtime</b> - https://nodejs.org/en/download
</ul>

<h2>Create App registrations</h2>
You are going to need at least two apps to check that this demo works successfully. Both apps must be created in the same B2C tenant. 

<ol>
  <li>Sign in to the Azure portal</li>
  <li>Make sure you are using the directory that contains your Azure AD B2C tenant</li>
  <li>Search and select <b>Azure AD B2C</b></li>
  <li>Select <b>App registrations</b> and then select <b>New registration</b></li>
  <li>Enter a <b>Name</b>. For example <em>SSOApp1</em></li>
  <li>Under <b>Supported account types</b>, select <b>Accounts in any identity provider or organizational directory (for authenticating users with user flows)</b></li>
  <li>Under <b>Redirect URI</b>, select <b>Single-Page Application (SPA)</b>, and then enter <code>http://localhost:3000</code> in the URL text box</li>
  <li>Under <b>Permissions</b>, select <em>Grant admin consent to openid and offline_access permissions</em> check box.
  <li>Select <b>Register</b></li>
  <li>Copy the client ID because it will be necessary later</li>
</ol>

Now, you need to create the second App registration (<em>SSOApp2</em>) using the same steps but with the only difference that you should enter <code>http://localhost:7000</code> in URL text box under <b>Redirect URI</b>

<h2>Create User flow</h2>
For this example, you can use User flow or Custom policy. For simplicity, we are going to use User flow during this example, but fell free to use IEF if you are more confortable.

<ol>
  <li>Sign in to the Azure portal</li>
  <li>Make sure you are using the directory that contains your Azure AD B2C tenant</li>
  <li>Search and select <b>Azure AD B2C</b></li>
  <li>Under <b>Policies</b>, select <b>User flows</b>, and then select <b>New user flow</b></li>
  <li>On the <b>Create a user flow</b> page, select the <b>Sign up and sign in</b> user flow</li>
  <li>User <b>Select a version</b>, select <b>Recommended</b>, and then select <b>Create</b>.</li>
  <li>Enter a <b>Name</b> for the user flow. For example, <em>susi</em></li>
  <li>For <b>Identity providers</b>, select <b>Email signup</b>.</li>
  <li>For <b>User attributes and token claims</b>, choose the claims that will be persistent in Azure AD B2C and claims that will be returned in the token.</li>
  <li>Select <b>Create</b> to add the user flow.</li>
</ol>

<h3>Configure Session behavior</h3>
We need to configure the session behavior to tenant level.

<ol>
  <li>Click on the User flow that has been created (<em>B2C_1_susi</em>)</li>
  <li>Select <b>Properties</b></li>
  <li>Scroll down to <b>Session behavior</b></li>
  <li>Search <b>Single sign-on configuration</b></li>
  <li>Select <b>Tenant</b></li>
  <li>Click on <b>Save</b></li>
</ol>

<p><b>Note</b></p>
Tenant is the default value for Single sign-on configuration.

<h2>Configure <em>authConfig.js</em></h2>
When you download the code of this repository, you will see two folders: <em>SSOApp1</em>, and <em>SSOApp2</em>. From Visual Studio Code, you can open both folders and navigate to <b>authConfig.js</b> in <b>app</b> subfolder.

<ol>
  <li>Access to <em>SSOApp1</em></li>
  <li>Navigate to <b>app</b> subfolder</li>
  <li>Double-click on <b>authConfig.js</b></li>
  <li>Search:</li>
</ol>

```javascript  
  auth: {
        clientId: "clientID_SSOApp1", //sso-silent app id
        authority: "https://your_b2c_tenant_name.b2clogin.com/your_b2c_tenant_name.onmicrosoft.com/your_signup_signin_policy_name",
        knownAuthorities: ["your_b2c_tenant_name.b2clogin.com"]
    },
```

<ol start="5">
  <li>Replace <code>clientID_SSOApp1</code> with the client ID of SSOApp1 that was copied previously when the App registration was created</li>
  <li>Replace <code>your_b2c_tenant_name</code> with the name of your Azure Active Directory B2C tenant</li>
  <li>Replace <code>your_signup_signin_policy_name</code> using the name of your Sign up and sign in user flow</li>
</ol>
