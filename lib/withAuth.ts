import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "../models/User";
import { adminDb, adminAuth } from "./firebaseAdmin";

const withAuth = (
  callback: (req: NextApiRequest, res: NextApiResponse) => void,
  role?: UserRole
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const idToken = req.headers.token;

    if (!idToken) {
      return res.status(401).send("No Token specified.");
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const uid = decodedToken.uid;
      try {
        const userDoc = await adminDb.collection("users").doc(uid).get();
        const user = userDoc?.data();

        if (!role || user?.roles?.includes(role)) {
          return callback(req, res);
        } else {
          return res.status(401).send("Not authenticated");
        }
      } catch (err) {
        return res.status(err.status).send(err.errorCode);
      }
    } catch (err) {
      return res.status(err.status).send(err.errorCode);
    }
  };
};

export default withAuth;
