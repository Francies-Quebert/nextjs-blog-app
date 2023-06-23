import { connectToDB } from "@/utils/databse";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        // async session({ session }) {
        //     return {
        //         user: {
        //             name: '',
        //             email: '',
        //             image: ''
        //         },
        //         expires: ''
        //     }
        // },
        async signIn({ profile }) {
            try {
                await connectToDB();
                
                //  check if the user already exist
                //  if not create a user
                //serverless -> lamda function

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})
// export async function GET(request: Request) {
//     return ''
// }