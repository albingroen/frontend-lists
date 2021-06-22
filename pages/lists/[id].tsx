import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import * as ListPrimitive from "../../components/List";
import { apiUrl, appUrl } from "../../lib/config";
import { CheckCircleIcon, PencilAltIcon } from "@heroicons/react/outline";
import {
  ArrowNarrowLeftIcon as ArrowLeftIcon,
  CheckIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import copy from "copy-to-clipboard";
import Empty from "../../components/Empty";

const getList = async (listId: string) => {
  return axios.get(`${apiUrl}/lists/${listId}`).then((res) => res.data);
};

const createListItem = async (listId: string, data: { title: string }) => {
  return axios
    .post(`${apiUrl}/lists/${listId}/list-items`, data)
    .then((res) => res.data);
};

const deleteList = async (listId: string) => {
  return axios.delete(`${apiUrl}/lists/${listId}`).then((res) => res.data);
};

const updateListItem = async (
  listId: string,
  id: string,
  data: { title: string }
) => {
  return axios
    .put(`${apiUrl}/lists/${listId}/list-items/${id}`, data)
    .then((res) => res.data);
};

const authenticateList = async (id: string, passphrase: string) => {
  return axios.post(`${apiUrl}/lists/${id}/auth`, {
    passphrase,
  });
};

interface IListProps {
  list: { title: string; id: string; items: { title: string; id: string }[] };
}

function List(props: IListProps) {
  const { query, push } = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>();

  const { data, error, mutate, isValidating } = useSWR(
    query.id ? `lists/${query.id}` : null,
    () => getList(query.id as string),
    { initialData: props.list }
  );

  const onCreateListItem = () => {
    const title = prompt("Item name:");

    if (!title) {
      return toast.error("No title provided");
    }

    toast.promise(
      createListItem(query.id as string, { title }).then(() => {
        mutate();
      }),
      {
        loading: "Creating item...",
        success: "Item created!",
        error: "Failed to create item",
      }
    );
  };

  const onUpdateListItem = (id: string, data: { title: string }) => {
    toast.promise(
      updateListItem(query.id as string, id, data).then(() => {
        mutate();
      }),
      {
        loading: "Updating item...",
        success: "Item updated!",
        error: "Failed to update item",
      }
    );
  };

  const onAuthenticate = async () => {
    const inputPassphrase = prompt("Passphrase:");

    toast.promise(
      authenticateList(query.id as string, inputPassphrase).then(() => {
        localStorage.setItem(`${data.id}_passphrase`, inputPassphrase);
        setPassphrase(inputPassphrase);
        setIsEditing(true);
      }),
      {
        loading: "Authenticating...",
        success: "Passphrase correct!",
        error: "Incorrect passphrase",
      }
    );
  };

  const onDelete = () => {
    if (confirm(`Do you want to delete the list: ${data.title}?`)) {
      toast.promise(
        deleteList(query.id as string).then(() => {
          try {
            const lcLists = JSON.parse(localStorage.getItem("lists"));
            localStorage.setItem(
              "lists",
              JSON.stringify(lcLists.filter((list) => list.id !== query.id))
            );
            localStorage.removeItem(`${query.id}_passphrase`);
            push("/");
          } catch {
            push("/");
          }
        }),
        {
          loading: "Deleting List...",
          success: "List deleted!",
          error: "Failed to delete List",
        }
      );
    }
  };

  useEffect(() => {
    if (data?.id) {
      const lcPassphrase = localStorage.getItem(`${data.id}_passphrase`);

      if (lcPassphrase) {
        setPassphrase(lcPassphrase);
      }
    }
  }, [data?.id]);

  return (
    <>
      <Seo
        description="Create text lists and share them with anyone"
        url={data ? `${appUrl}/lists/${data.title}` : appUrl}
        title={`${data?.title || "Loading..."} | Lists`}
      />

      <Layout>
        {data ? (
          <div>
            <header>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link passHref href="/">
                    <a className="inline-flex items-center link space-x-2">
                      <ArrowLeftIcon className="w-4" /> <span>Back</span>
                    </a>
                  </Link>

                  <div className="flex items-center space-x-6">
                    {isEditing && (
                      <button
                        className="inline-flex items-center link space-x-2"
                        onClick={async () => onDelete()}
                      >
                        <TrashIcon className="w-4" /> <span>Delete List</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (passphrase) {
                          setIsEditing(!isEditing);
                        } else {
                          onAuthenticate();
                        }
                      }}
                      className="inline-flex items-center link space-x-2"
                    >
                      {isEditing ? (
                        <>
                          <CheckIcon className="w-4" /> <span>Done</span>
                        </>
                      ) : (
                        <>
                          <PencilIcon className="w-4" /> <span>Edit List</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          await window.navigator.share();
                          toast.success("Shared successfully!");
                        } catch (err) {
                          try {
                            copy(location.href);
                            toast.success("Link copied to clipboard!");
                          } catch {
                            toast.error(`Failed to share List`);
                          }
                        }
                      }}
                      className="inline-flex items-center link space-x-2"
                    >
                      <ShareIcon className="w-4" /> <span>Share List</span>
                    </button>
                  </div>
                </div>

                <h1 className="mt-6 font-mono text-2xl">{data.title}</h1>
              </div>
            </header>

            <hr className="my-6 dark:border-gray-700" />

            <section>
              {data?.items?.length ? (
                <ListPrimitive.Wrapper>
                  {data.items.map((item) => (
                    <ListPrimitive.Item key={item.id}>
                      <ListItem
                        onUpdate={onUpdateListItem}
                        passphrase={passphrase}
                        listItem={item}
                      />
                    </ListPrimitive.Item>
                  ))}
                </ListPrimitive.Wrapper>
              ) : (
                <Empty>You have not added any items yet...</Empty>
              )}

              {isEditing && (
                <Button
                  onClick={() => onCreateListItem()}
                  className={`float-right mt-6 ${
                    !data?.items?.length && "w-full"
                  }`}
                >
                  New List Item
                </Button>
              )}
            </section>
          </div>
        ) : isValidating ? (
          <p>Retrieving list...</p>
        ) : error ? (
          <p>Failed to retrieve list (${error.message})</p>
        ) : (
          <Empty>This list does not exist anymore...</Empty>
        )}
      </Layout>
    </>
  );
}

interface IListItemProps {
  onUpdate: (id: string, data: { title: string }) => void;
  listItem: { id: string; title: string };
  passphrase: string;
}

function ListItem({ listItem, onUpdate, passphrase }: IListItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(listItem.title);

  const handleChange = () => {
    if (isEditing) {
      setIsEditing(false);

      if (title === listItem.title) return;

      onUpdate(listItem.id, { title });
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      {isEditing ? (
        <input
          className="flex-1 bg-transparent rounded focus:outline-none focus:ring-2"
          onChange={(e) => setTitle(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChange();
            } else if (e.key === "Escape") {
              e.preventDefault();
              e.stopPropagation();
              setTitle(listItem.title);
              setIsEditing(false);
            }
          }}
          placeholder="Name"
          value={title}
          type="text"
          autoFocus
        />
      ) : (
        <h3>{title}</h3>
      )}

      {passphrase && (
        <button
          className="text-blue-500 rounded transition hover:text-blue-400 active:text-blue-700 focus:ring-2 focus:outline-none"
          aria-label={isEditing ? "Save" : "Edit title"}
          title={isEditing ? "Save" : "Edit title"}
          onClick={handleChange}
        >
          {isEditing ? (
            <CheckCircleIcon className="w-5" />
          ) : (
            <PencilAltIcon className="w-5" />
          )}
        </button>
      )}
    </div>
  );
}

List.getInitialProps = async ({ query }) => {
  if (query.id) {
    const list = await getList(query.id);

    console.log(list);

    return {
      list,
    };
  }

  return {};
};

export default List;
