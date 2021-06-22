import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Seo from "../components/Seo";
import * as List from "../components/List";
import { apiUrl, appUrl, siteInfo } from "../lib/config";
import { useEffect, useState } from "react";
import Empty from "../components/Empty";

const createList = (data: { title: string; passphrase: string }) => {
  return axios.post(apiUrl + "/lists", data);
};

export default function Home() {
  const router = useRouter();
  const [lists, setLists] = useState<{ title: string; id: string }[]>([]);

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
        localStorage.setItem("lists", JSON.stringify([...lists, res.data]));
        localStorage.setItem(`${res.data.id}_passphrase`, passphrase);
        router.push(`/lists/${res.data.id}`);
      }),
      {
        loading: "Creating list...",
        success: "List created!",
        error: "Failed to create list",
      }
    );
  };

  useEffect(() => {
    try {
      const lcLists = JSON.parse(localStorage.getItem("lists"));
      setLists(lcLists || []);
    } catch {
      setLists([]);
    }
  }, []);

  return (
    <>
      <Seo
        description={siteInfo.description}
        title={siteInfo.title}
        image={siteInfo.image}
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
          {lists?.length ? (
            <List.Wrapper>
              {lists.map((list) => (
                <Link passHref href={`/lists/${list.id}`} key={list.id}>
                  <a>
                    <List.Item className="cursor-pointer">
                      <h3>{list.title}</h3>
                    </List.Item>
                  </a>
                </Link>
              ))}
            </List.Wrapper>
          ) : (
            <Empty>You have not created any lists yet...</Empty>
          )}

          <Button
            className={`float-right mt-6 space-x-2 ${
              !lists?.length && "w-full"
            }`}
            onClick={() => onCreateList()}
          >
            <span>Create new List</span>
            <span>&rarr;</span>
          </Button>
        </section>
      </Layout>
    </>
  );
}
