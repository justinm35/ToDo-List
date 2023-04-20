import { authOptions } from "@/app/lib/auth"
import { addFriendValidator } from "@/app/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import { fetchRedis } from "@/app/helpers/redis"
import { db } from "@/app/lib/db"
import { z } from "zod"

export const POST = async(req: Request) => {
    try {
        const body = await req.json()
        const {email: emailToAdd} = addFriendValidator.parse(body.email)//zod email validation
    
        const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`) as string
        //Checks if thre is a user under that email if return is blank.
        if(!idToAdd) {
            return new Response('This person does not exist.', {status: 400})
        }
        //Checks for auth session
        const session = await getServerSession(authOptions)
        if(!session) { 
            return new Response('Unauthorized', { status: 401 })
        }
        //Checks if logged in session id is the same as idToAdd returned from redis db
        if(idToAdd === session.user.id) {
            return new Response('You cannot add yourself as a friend', {status: 400})
        }

        //Check if user is already added by seeing if friend request exists in Redis
        const isAlreadyAdded = (await fetchRedis('sismember', `user: ${idToAdd}:incoming_friend_requests`, session.user.id)) as 0 | 1
        if(isAlreadyAdded) {
            return new Response('Already added this user', {status: 400})
        }

        //Checks if already friends is true
        const isAlreadyFriends = (await fetchRedis('sismember', `user: ${session.user.id}:friends`, idToAdd)) as 0 | 1
        if(isAlreadyFriends) {
            return new Response('Already friends with this user', {status: 400})
        }

        //If valid request, send friend request
        db.sadd(`user:${idToAdd}:incomoing_friend_requests`, session.user.id)
        return new Response('OK')

    } catch (error) {
        if(error instanceof z.ZodError) { //Checks for zod error fetchRedis
            return new Response('Invalid request payload', {status: 422})
        }
        console.log(error)
        return new Response('Invalid request', {status: 400})
    }
}