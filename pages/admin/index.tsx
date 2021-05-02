import { GetStaticPropsContext } from "next";
import { FormEvent, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import Button from "../../components/Button";
import DeployNotification from "../../components/DeployNotification";
import FormInput from "../../components/FormInput";
import FullScreenLoader from "../../components/FullScreenLoader";
import LoginForm from "../../components/LoginForm";
import { db } from "../../lib/firebase";
import { adminDb } from "../../lib/firebaseAdmin";

let previewWindow: Window | null = null;

export interface AdminPanelProps {
  title: string;
  imageURL: string;
}

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const { user, loading } = useAuth();

  const [deployLoading, setDeployLoading] = useState(false);
  const [deployState, setDeployState] = useState<"pending" | "finished" | null>(
    null
  );

  const [previewLoading, setPreviewLoading] = useState(false);

  const [title, setTitle] = useState(props.title);
  const [imageURL, setImageURL] = useState(props.imageURL);

  const setPreviewData = async (e: FormEvent) => {
    e.preventDefault();
    setPreviewLoading(true);

    await db
      .collection("config")
      .doc("draft")
      .collection("pages")
      .doc("home")
      .set({
        title: title,
        imageURL: imageURL,
      });

    if (previewWindow && !previewWindow.closed) {
      previewWindow.location.reload();
    } else {
      previewWindow = window.open(
        "/api/admin/preview",
        "Page Preview",
        "toolbar=0,location=0,menubar=0"
      );
    }
    setPreviewLoading(false);
  };

  const deploy = async () => {
    setDeployLoading(true);
    await db.collection("pages").doc("home").set({
      title: title,
      imageURL: imageURL,
    });

    const token = await user?.getIdToken(true);

    if (!token) {
      return;
    }

    const res = await fetch("/api/admin/deploy", {
      headers: {
        token: token,
      },
    });
    const data = await res.json();
    console.log(data);

    setDeployLoading(false);
    setDeployState("pending");
  };

  if (loading) return <FullScreenLoader />;
  if (!user) return <LoginForm />;
  return (
    <div className="flex flex-col items-center justify-items-center p-4 bg-red-50 min-h-screen">
      <form onSubmit={setPreviewData} className="flex flex-col">
        <Button type="submit" loading={previewLoading}>
          Preview
        </Button>
        <label className="font-semibold text-xl text-gray-800">Title</label>
        <FormInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <label className="font-semibold text-xl text-gray-800 mt-2">
          Image URL
        </label>
        <FormInput
          type="url"
          value={imageURL}
          onChange={(e) => setImageURL(e.currentTarget.value)}
        />
        <img src={imageURL} height="200" className="my-3"></img>
      </form>
      <Button onClick={deploy} loading={deployLoading}>
        Deploy
      </Button>
      {deployState ? <DeployNotification /> : null}
    </div>
  );
};

export default AdminPanel;

export async function getStaticProps(context: GetStaticPropsContext) {
  let homeData: AdminPanelProps;

  const homeDoc = await adminDb.collection("pages").doc("home").get();
  homeData = homeDoc.data();

  return {
    props: {
      ...homeData,
    },
  };
}
