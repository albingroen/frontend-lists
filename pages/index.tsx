import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Seo from "../components/Seo";
import { apiUrl, appUrl } from "../lib/config";

const createList = (data: { title: string; passphrase: string }) => {
  return axios.post(apiUrl + "/lists", data);
};

export default function Home() {
  const router = useRouter();

  const onCreateList = () => {
    const title = prompt("Name for list:");
    const passphrase = prompt("Passphrase:");

    if (!title) {
      return toast.error("No title provided");
    }

    if (!passphrase) {
      return toast.error("No passphrase provided");
    }

    toast.promise(
      createList({ title, passphrase }).then((res) => {
        router.push(`/lists/${res.data.id}`);
      }),
      {
        loading: "Creating list...",
        success: "List created!",
        error: "Failed to create list",
      }
    );
  };

  return (
    <>
      <Seo
        description="Create text lists and share them with anyone"
        title="Lists"
        url={appUrl}
      />

      <Layout>
        <header>
          <h1 className="font-mono text-3xl tracking-wide uppercase">Lists</h1>
          <p className="mt-4 text-gray-500">
            Create text lists and share them with anyone
          </p>
        </header>

        <hr className="my-6 dark:border-gray-700" />

        <section>
          <Button
            className="flex items-center justify-between w-full mt-8"
            onClick={() => onCreateList()}
          >
            <span></span>
            <span>Create new List</span>
            <span>&rarr;</span>
          </Button>
        </section>
      </Layout>
    </>
  );
}
