import { connectToDB } from "@/utils/databse";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { SessionExtend } from "@/types/typing";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session, user }: { session: SessionExtend, user: any }) {
            const sessionUser = await User.findOne({ email: session?.user?.email });
            if (session.user) session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                //  check if the user already exist

                const userExists = await User.findOne({ email: profile?.email });

                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: (profile as any).picture,
                    });
                }
                //serverless -> lamda function

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }
// export async function GET(request: Request) {
//     return ''
// }