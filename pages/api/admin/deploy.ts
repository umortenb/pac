import { NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../../lib/withAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = process.env.ADMIN_REDEPLOY_URL;

  if (!url) {
    return res.status(400).send("NoUrl");
  } else {
    try {
      const hookRes = await fetch(url);
      const body = await hookRes.json();

      return res.status(hookRes.status).send(body);
    } catch (err) {
      return res.status(err.status).send(err.errorCode);
    }
  }
};

export default withAuth(handler, "admin");
