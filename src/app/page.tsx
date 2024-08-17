import {type User} from "@prisma/client";

import HomePageClient from "./page.client";

import {api} from "@/api";
import {UserProviderClient} from "@/usersContext";

export default async function HomePage() {
  const users: User[] = await api.list();

  return (
    <UserProviderClient usersFromDb={users}>
      <HomePageClient />
    </UserProviderClient>
  );
}
