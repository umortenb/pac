import { GetStaticPropsContext } from "next";
import { dbServer } from "../lib/firebaseAdmin";

export interface HomeProps {
  title: string;
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className="container flex flex-col items-center mx-auto p-4">
      <h1 className="mx-auto text-3xl my-8 font-semibold text-pink-500">
        {props.title}
      </h1>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/pach-59e77.appspot.com/o/pages%2Fhome%2Fbisasam.png?alt=media&token=4b3f79a4-d4a5-410e-b361-304bf1679c10"
        width="100"
      />
    </div>
  );
};

export default Home;

export async function getStaticProps(context: GetStaticPropsContext) {
  const homeDoc = await dbServer.collection("pages").doc("home").get();
  const homeData = homeDoc.data();

  return {
    props: {
      ...homeData,
    },
  };
}
