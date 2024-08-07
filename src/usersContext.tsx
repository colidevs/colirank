"use client";

import {createContext, useState} from "react";

export interface User {
  id: string;
  name: string;
  score: number;
  isChecked: boolean;
}

interface Context {
  users: User[];
  modificarPuntos: (usersChecked: User[], score: number) => void;
  modificarIsChecked: (newUsers: User[]) => void;
}

export const UsersContext = createContext({} as Context);

export function UserProviderClient({children}: {children: React.ReactNode}) {
  const initialUsers: User[] = [
    {
      id: "us001",
      name: "Guille",
      score: 30,
      isChecked: false,
    },
    {
      id: "us002",
      name: "Ezequiel",
      score: 50,
      isChecked: false,
    },
    {
      id: "us003",
      name: "Marcos",
      score: 90,
      isChecked: false,
    },
    {
      id: "us004",
      name: "Guadalupe",
      score: 20,
      isChecked: false,
    },
    {
      id: "us005",
      name: "Lucas",
      score: 40,
      isChecked: false,
    },
    {
      id: "us006",
      name: "Thomas",
      score: 75,
      isChecked: false,
    },
    {
      id: "us007",
      name: "Astrid",
      score: 85,
      isChecked: false,
    },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);

  const modificarPuntos = (usersChecked: User[], score: number) => {
    setUsers((users) => {
      usersChecked.map((x) => {
        users = users.with(users.indexOf(x), {
          id: x!.id,
          name: x!.name,
          score: x!.score + score,
          isChecked: x!.isChecked,
        });
      });
      const newUsers = users;

      console.log(newUsers);

      return newUsers;
    });
  };

  const modificarIsChecked = (newUsers: User[]) => {
    setUsers((users) => newUsers);
  };

  return (
    <UsersContext.Provider
      value={{
        users: users,
        modificarPuntos: modificarPuntos,
        modificarIsChecked: modificarIsChecked,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
