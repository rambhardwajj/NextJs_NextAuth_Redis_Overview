import { NextAuthOptions } from "next-auth"
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"
import { db } from "./db"
import GoogleProvider from "next-auth/providers/google"

function getGoogleCredentials(){
	const clientId  =  process.env.GOOGLE_CLIENT_ID
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET
	
	if( !clientId || clientId.length == 0){
		throw new Error('Missing GOOGLE_CLIENT_ID')
	}
	if( !clientSecret || clientSecret.length == 0){
		throw new Error('Missing GOOGLE_CLIENT_SECRET')
	}

	return { clientId, clientSecret}
}

export const authOptions: NextAuthOptions = {
	adapter :  UpstashRedisAdapter(db),  // everytime some cause this authentication , a certain action with out database will be taken automatically 
	session : {
		strategy: 'jwt' // we dont handle the session on database , so that we can verify the session in middleware to protect our routes way more easily 
	}, 
	pages:{
		signIn: '/login'
	},
	providers:[
		GoogleProvider({
			clientId : getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret
		})
	], 
	callbacks: {
		async jwt ({token, user}) { // verifying if the userExists or not 
			const dbUser = (await db.get(`user:${token.id}`)) as User | null 

			if(!dbUser){
				token.id = user!.id
				return token
			}

			return {
				id: dbUser.id, 
				name : dbUser.name,
				email: dbUser.email,
				picture: dbUser.image
			}
		},
		async session ( {session, token }){ // thats where we get access to all the info after we verify if the session exist or not
			if( token){
				session.user.id= token.id
				session.user.name = token.name				
				session.user.email = token.email				
				session.user.image = token.picture 				
			}
			return session 
		},
		redirect(){
			return '/dashbaord'
		},
	}, 

}