import {type User} from "@prisma/client";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

import HomePageClient from "./page.client";

import prisma from "@/db";
import {UserProviderClient} from "@/usersContext";

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const users: User[] = await prisma.user.findMany();

  // Pass data to the page via props
  return {props: {users}};
}) satisfies GetServerSideProps<{users: User[]}>;

export default function HomePage({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <UserProviderClient usersFromDb={users}>
      <HomePageClient />
    </UserProviderClient>
  );
}
