import { GetStaticPropsContext } from "next";
import { adminDb } from "../lib/firebaseAdmin";

export interface HomeProps {
  title: string;
  imageURL: string;
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className="container flex flex-col items-center mx-auto p-4">
      <h1 className="mx-auto text-3xl my-8 font-semibold text-pink-500">
        {props.title}
      </h1>
      <img src={props.imageURL} width="100" />
    </div>
  );
};

export default Home;

export async function getStaticProps(context: GetStaticPropsContext) {
  let homeData: HomeProps;

  const homeDoc = await (context.preview
    ? adminDb.collection("config").doc("draft")
    : adminDb
  )
    .collection("pages")
    .doc("home")
    .get();
  homeData = homeDoc.data();

  return {
    props: {
      ...homeData,
    },
  };
}
