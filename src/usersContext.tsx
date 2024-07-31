"use client";

import {createContext, useState} from "react";

export interface User {
  id: string;
  name: string;
  score: number;
}

interface Context {
  users: User[];
  sumarPuntos: (user: User, score: number) => void;
}

export const UsersContext = createContext({} as Context);

export function UserProviderClient({children}: {children: React.ReactNode}) {
  const initialUsers: User[] = [
    {
      id: "us0001",
      name: "Guille",
      score: 30,
    },
    {
      id: "us0002",
      name: "Ezequiel",
      score: 50,
    },
    {
      id: "us0003",
      name: "Marcos",
      score: 90,
    },
    {
      id: "us0004",
      name: "Guadalupe",
      score: 20,
    },
    {
      id: "us0005",
      name: "Lucas",
      score: 40,
    },
    {
      id: "us0006",
      name: "Thomas",
      score: 75,
    },
    {
      id: "us007",
      name: "Astrid",
      score: 85,
    },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);

  const sumarPuntos = (user: User, score: number) => {
    const myUser = users.find((x) => x === user);

    setUsers((users) => {
      users.splice(users.indexOf(user), 1, {
        ...myUser,
        score: myUser!.score + score,
      } as User);

      return users;
    });
  };

  return (
    <UsersContext.Provider value={{users: users, sumarPuntos: sumarPuntos}}>
      {children}
    </UsersContext.Provider>
  );
}
