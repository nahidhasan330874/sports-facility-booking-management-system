 import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("sportNest");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
    emailAndPassword: { 
    enabled: true, 
  },
  socialProviders:{
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }
  },
//   session : {
//       cookieCache: {
//         enabled: true,
//         strategy: "jwt",
//         //max 30 day
//         maxAge: 30 * 24 * 60 * 60
//   }
// },
// plugins: [jwt()]
});
