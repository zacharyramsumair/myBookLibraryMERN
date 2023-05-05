[] go in e-commerce folder and get the login and register to work to display some user info
[] set up auth to access token and refresh token version with forget password and verify email using ethereal
[] convert from ethereal to send grid
[] construct frontend for what we have so far, landing page, login, register, page to say you are verified, forgot password form,       dashboard to display some user info based on the user
[] create articles model, and way for all users to create, read, edit and delete articles. Allow admin to be able to edit and delete any article; articles would be of 3 types: free, standard, or premium, each user would have to be updated to include one of these plans, default as free, give tags to articles,use enum [romance, fiction, non-fiction, business, self-help, history, bibliography, finance, fantasy, kids,], allow user to upload a cover image with article, and make it a small size, request for it to be smaller than 1mb and then compress it
[] allow for users to rate, like articles, and save articles to your bookshelf
[] allow users to search for articles based on tags, name, author, likes
[] make the last article visited appear at the top of the bookshelf 
[] create dashboard that recommends 10 articles for the user, based on the authors they read and the tags that they have liked, if they don't like anything just show the articles with the most likes
[] create frontend to complete app
 


 things to add: stripe and let them only read the first 100 characters of standard or premium articles. at the top of the dashboard, show them paid articles with the most likes. Have a call to action at the top that says buy a plan. Page with the differnet plans. went you click you go to a subsciption/buy page from stripe, this updates the user from Free to Standard/Premium. Allow the user the ability to cancel subscription, and change their status back to Free tier