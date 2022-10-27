# Capstone CS50W by Antoine Sauvage: Categories

## Main comments

This project is mainly written in Javascript, as I wanted to build a Web App that pretty much runs on a single page. Just run the server, open the index page, and start playing.  
This folder follows a classical Django project structure, but just to be clear, here are the details:  
- urls.py include the API routes I decided to create for this project: /update, /retrieve, /delete and /botgame  
- views.py include my main Python code and backend logic  
- models.py incldue all the additional Models I creaed on top of the pre-built AbstractUser: Category, Letter, Answer, Possible_result, and Botgame  
- The biggest part of the work can be foudn in the file categories.js (in Static / categories)  
- I added a few visual enhancements at styles.css and with a favicon in the same fodler (Static / categories)  
- The few html pages are located in Templates / Categories (this App msotly work through oen apge: index.html)  

Runnign my App is straight forward, there is nothing addtional to install, and all the Python pakages I used at in views.py, but also saved for calrity on the file requirements.txt (main folder).  

## Distinctiveness

The projects of this course are simplified versions of very popular Web Apps that we use nowadays: (Front-end) for a **search engine**, **Wiki**, **ecommerce** platform, **email** Web App, and **social network**, which is great, but I wanted to do something totally different, so i tried to use what I learnt in this course, but to adpat it to other needs.  
**The idea:**  
I liked to play **categories** game as a kid, and I wanted to see if I was able to implement it as a Web Application using Django and Javascript after this course, and here´s the result!
In case you are not familiar with this game, the rules are explained in my proyect.  

**Main features** of my project, from the simplest to the most complex:  
- Register / log in / log out  
- Check the game's rules, by clicking on "How to play" in the navigation menu.  
- Play offline.  
This feature is actually what made me think I should do this project.  
Why?  
One day at home, I wanted to play **categories** with friends but we needed a tool with 2 main features: a timer and a random letter generator.  
We were not able to find a such a tool, so I decided to create it.  
Users can choose the time to play (in seconds) and decide if they want to exlude any letter form the random selection (for example, it may be hard to play with letters like "W", "X", "Y", or "Z").  

- Train online.  
This feature is based on the last one (Timer + letter) but I added **categories** to play with.   
When clicking on "Start online training!", a form is generated dynamically with the features they chose.  
At the end of the timer (or when the user submit all answers), the user's points are counted and the App diplays a customized summary.  

- Play against a bot.  
I decided to build on top of the training mode and generate bot answers to the variables chosen by the user.  
At the end of the timer, the users receives a summary of the game, that can end as a "victory", "Defeat", or "Draw".  

**In conclusion**, I believe that my project is totally different from the course's mandatory projects.

Even if I chose to build on top of "Mail" project's logic (mainly javascript, fetch requests, ...), but my App is totally different and the final resutls gives a different user experience.

## Complexity

First of all, I think that **building the whole Web App form scratch** is much harder that completing a Project that has been prepared by the staff during the course.  
When a project is prepared, the whole logic and App structure are already there, we just need to add the missing bits.  
When working on our own, we have to carefully make choices that will have direct impact on our project difficulty, feasability, ...  
For example, my way of starting and stopping the timer led to potential issues of having a second timer running at the same time if the user decided to switch game mode from offline to training while playing, for instance.  
My way to solve this issue was to block the menu elements while a timer is running, but was it in general the best design choice?  

Other elements that I think make my project more complex:  
- I implemented an **algorithm** to create bot answers. Before a bot potentially retrieves an answer form the database, there is a filter. My app checks the current player's "level", depending on the rate of victories on total games played byt this user. The better the player is, the better the bot will be. The worse the user plays, the worse the bot will play. **The objective here is to keep the game fun for all, no matter your level.** But, there is still a part of random becasue the cauclaiton included a radom number, the game is jsut more *likely* to be more or less easy. If the user is not logged in, I decided to give by default the average player score: 5.  
- I realized that i didn´t implement correctly my API routes at the beginning, and that users could potentially delete entries or add fake game results with the right URL, so I implemented **CSRF tokens and POST methods** to the critical fetch requests.  
- The main issue I had when starting this APP was "how to generate a databse of entries"? Querying a huge dictionary, making requests to other sites, ...? My conclusion is that the best approac is to have a **user-generated database**. In a few words, everytime a user plays against a bot o use training mode, their answers is saved into the database and can be reused by a bot later (or even in the same round, depending on JSON response).  
- In orderd to make the **timer** work, I had to understand how to implement **async functions**
- **Time is up warning** is visual, with trnasition form white to black background (and ivnerted color for text), becasue I wanted users to see somehting was happening evne if playing Offline ot looking directly at the screen. Here I first implemented a sound warning, but I finally did not use it because it feels more annoying than the visual warning (ig you listen to music at the same time, for example).  
- I used a function to **Scroll up** automatically to the summary of the game when the time is up, in order to give a better user experience.  
- Letters, timers and categories... are independent from one mode to another, becasue users may want to practice their speed (30 seconds) but play a game during a minute. Or practice hard categories and play on easier ones for them.  
- By default, 5 radom categoires are proposed to the player, in order to make things more interesting when visiting agian the Web App.  
- **Play again** button was added in order to have quicker option to start again, with same variables.  
- More an informative note: **Submit butotn** is activated hwhen all fields are filled,
- I give the users a **possibilty to correct their answers** and therefore modify the database. The reasons are that (1.) the timer is a hard stop, so a user may be in the middle of typping a word when it stops, (2.) user can also delete wrong answers from bots after a game. **Important comment**: I decided to implemtn this posiiblty AFTER the game resutl is coutned, becasue if not, users coudl potentially delete all bot answers and guraantee theselves all the time if the correction happened BEFORE the game result.  
- I implemented a logic to **avoid duplicate entries** in the database, because this would make information redundant for no justified reason. To go forward with this logics, all entries are capitalized in order to avoid having for example "Harry" and "harry" and "haRRy" all saved in database.  
- I implemented foreign keys in roder to save space and gian efficiency. FOr example, I save the result "1" instead of "Victory" in the Botgame Model, same with user "3", not its name.  
- I created 5 models, in addition to the User model, I do not feel I needed more.  
- The App is responsive (menu, index page with 4 options, and rules content).

With all these examples, I beleive that my project satisfies the complexity requirements.

There are other things I could keep working on in future updates (play against a friend - or in general against a human player -, keep optimizing the bot algorithm, save user's preferences in the letters tehy want to avoid, creating touraments, general UX, ...) but in general, I am very happy with my project, and with all that I learned after this course and CS50x, becasue I didn´t have any prior programming knowledge.

Thanks!
Antoine