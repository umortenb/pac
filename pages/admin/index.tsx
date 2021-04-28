import { GetStaticPropsContext } from "next";
import { FormEvent, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import FormInput from "../../components/FormInput";
import FullScreenLoader from "../../components/FullScreenLoader";
import LoginForm from "../../components/LoginForm";
import { db } from "../../lib/firebase";
import { dbServer } from "../../lib/firebaseAdmin";

let previewWindow: Window | null = null;

export interface AdminPanelProps {
  title: string;
  imageURL: string;
}

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const { user, loading } = useAuth();

  const [title, setTitle] = useState(props.title);
  const [imageURL, setImageURL] = useState(props.imageURL);

  const setPreviewData = async (e: FormEvent) => {
    e.preventDefault();

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
    }
    previewWindow = window.open(
      "/api/preview",
      "Page Preview",
      "toolbar=0,location=0,menubar=0"
    );
  };

  const deploy = async () => {
    await db.collection("pages").doc("home").set({
      title: title,
      imageURL: imageURL,
    });
  };

  if (loading) return <FullScreenLoader />;
  if (!user) return <LoginForm />;
  return (
    <div className="flex flex-col items-center justify-items-center p-4 bg-red-50 min-h-screen">
      <form onSubmit={setPreviewData} className="flex flex-col">
        <input type="submit" value="Preview" />
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
        <img src={imageURL} height="200" className="mt-2"></img>
      </form>
      <button onClick={deploy}>Deploy</button>
    </div>
  );
};

export default AdminPanel;

export async function getStaticProps(context: GetStaticPropsContext) {
  let homeData: AdminPanelProps;

  const homeDoc = await dbServer.collection("pages").doc("home").get();
  homeData = homeDoc.data();

  return {
    props: {
      ...homeData,
    },
  };
}
