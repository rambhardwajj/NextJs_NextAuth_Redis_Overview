# NextJs Overview + NextAuth + Redis + Google O-Auth 
Steps 
	I. Setting up PROJECT and INSTALLING dependencies ----------------------------

		1. make a REPO on Github 
		2. now in your project on git Bash write COMMAND 
			npx create-next-app@latest
		now in your project go to run COMMAND 
			npm run dev
		3. Go to the tailwild with nextJs domumentation and copy the command given run in the bash 
		and then copy the tailwind.config.js module from the docs and paste in your tailwind.config.js
		4. Replace your global.css to the documentation one
		5. now make folder dashboard inside src/app and make another folder components inside src/app inside components make another folder ui for putting all the ui material
		6. for makeing ui for global use install class-variance-authority 
		7. npm i lucide-react
		8. npm i clsx tailwind-merge
	
   II. Setting up DataBase -> "REDIS" -------------------------------------------------------

		1. Login to Upstash 
		2. create database , choose your -> name, nearest region ,TSL then create the db. 
		3. now in your folder make a new file in root dir -> .env.local 
		4. on upstash website go down a little bit you will find 2 values paste the two values in env.local naming the name on the website .
		5. then create a lib folder in scr dir ..
		6. create file db.ts -> make an new object of Redis ( see the file) pass the two values (url & token ) 
		7. your db is comnected

  III. Setting up AUTHENTICATION using "nextAuth" ----------------------------------

		1. npm install next-auth
		2. in src dir initialise a folder called pages\api\auth and make a file [...nextauth].ts
			meaning any request that is sent off to pages\api\auth is gonna be handeled by [...nextauth].ts file
		3. create authOption in lib folder inside file auth.ts and import in [...nextauth].ts -> ( see the files).
		4. npm install @next-auth/upstash-redis-adapter
		5. make a new file next-auth.d.ts in types folder 
		6. set up authOptions 
		7. go to this  https://www.balbooa.com/gridbox-documentation/how-to-get-google-client-id-and-client-secret 
			for guidance and
			https://console.cloud.google.com/apis/dashboard 
			to create your GOOGLE_CLIENT-ID & GOOGLE_CLIENT-SECRET 
		8. paste the GOOGLE_CLIENT-ID & GOOGLE_CLIENT-SECRET  in the .env.local folder and then restart npm run dev
		9. while following the steps Of the url on the 9th step the Athorised Redirect Url should be 
			set to http://localhost:3000/login
	   10. Also in your env.local file initialise a new key NEXTAUTH_SECRET= anyGibrish as a key for encryption 
	   		also if you want to make a secret key more secure than download open ssl on cmd and type command -> genrsa 2048 
			and that will generate you a supersecret key .
	   11. After npm run dev click on the google button to signup with google if every thing is fine then you should be 	
			redirected to dashboard page other wise there should be a dikkat with the url you put on the google OAuth 2.0
	   
  IIV. Adding a USER :--------------------------------------------------------------

		1. 1st Handle the INPUT ( INPUT VALIDATION ) -> for that install libraries
			react-hook-form @hookform/resolvers zod axios
				( zod for Validation UserInput )
				( axios for Fetch Request )
		2. How to implement Form Valdiation ?
			make a new folder inside lib -> validation => inside validations folder make a new file -> add-friend.ts(write email validation parameters using z from zod in the file add-friend.ts) and export it .
			import in the AddFriendButton.tsx and use it while taking input email and then 
				if the email is valid then : 
					use axios and send a post request to the backend route api/friend/add 
				else throw Error accordingly 
		3. Implement backend and handle the backend req 
			create a folder in api folder naming friends\add and in the add folder make a new file route.ts
			this name is mandatory enforced by nextjs
		4. handle the pulse req made by client in route.ts 
			Implement POST req & passing Authorisation HEADERS to the backend + Checking user(friend) validity  
		5. ./helper => redis.ts ( I did not understand the use of this file like why we need to
			make this file for calling our database because we already have a file db.ts where we are calling database ,
			just from what i understand is that there is some weird cache behaviour in redis and to prevent it we need to call the database like this )
   
