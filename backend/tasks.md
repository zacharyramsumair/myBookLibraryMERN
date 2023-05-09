vid 13
pass csrf-token in headers : learnt from https://www.youtube.com/watch?v=VrFNbqSUVP0


[] go in e-commerce folder and get the login and register to work to display some user info
[] set up auth to access token and refresh token version with forget password and verify email using ethereal
[] convert from ethereal to send grid
[] create login and register with access and refresh token without the verification email. just for fun
[] construct frontend for what we have so far, landing page, login, register, page to say you are verified, forgot password form,       dashboard to display some user info based on the user
[] create articles model, and way for all users to create, read, edit and delete articles. Allow admin to be able to edit and delete any article; articles would be of 3 types: free, standard, or premium, each user would have to be updated to include one of these plans, default as free, give tags to articles,use enum [romance, fiction, non-fiction, business, self-help, history, bibliography, finance, fantasy, kids,], allow user to upload a cover image with article, and make it a small size, request for it to be smaller than 1mb and then compress it
[] allow for users to rate, like articles, and save articles to your bookshelf
[] allow users to search for articles based on tags, name, author, likes
[] make the last article visited appear at the top of the bookshelf 
[] create dashboard that recommends 10 articles for the user, based on the authors they read and the tags that they have liked, if they don't like anything just show the articles with the most likes
[] create frontend to complete app
[] make sure xss-clean works
 


 things to add: stripe and let them only read the first 100 characters of standard or premium articles. at the top of the dashboard, show them paid articles with the most likes. Have a call to action at the top that says buy a plan. Page with the differnet plans. went you click you go to a subsciption/buy page from stripe, this updates the user from Free to Standard/Premium. Allow the user the ability to cancel subscription, and change their status back to Free tier


 make it so unloggined users can assess free features but not be able to like, comment or save things to the bookshelf.
comments on articles, and comments on comments like youtube replied to @john but unlike youtube but the first 10 characters of what you are replying to e.g. replied to @ John [this is really ....] Yh i agree

mark article as containing explisit language, have a check box for users to check it as explicit and as a safety have list of words that you loop throught and if >5 found mark it as explict
ablity to ban curse words in comments, and also the abiltiy to block users from saying certain words and phrases in the comments,
ability to turn off comments on a post


things to include

- [ ]  auth (login, register, email to verify register, forgot password, access token, refresh token)
- [ ]  saved section like pedro tech recipe mern app (****MERN Recipe App with Authentication - Build & Deploy A React Intermediate Project****)
- image of how to do this in the controller
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d304a7e3-6ed1-4c03-b455-23ccbc23fffd/Untitled.png)
    
- [ ]  stripe to pay, and have something change once you pay
- [ ]  404 page, if not found
- [ ]  use typescript for react and node
- [ ]  express validator
- [ ]  express async errors
- [ ]  dont validate password or username or whatever when logging since we might change the validadation to register and we shouldn’t apply that to old users since their login info might not meet the new validations
- [ ]  protected routes in frontend (source ****Learn MERN by Building a Subscription App - Part 2 1 hour 20 mins****) also in net ninja JWT auth playlist (actually the net ninja way won't work since most likely server and client are on different ports but we could try it and find out)