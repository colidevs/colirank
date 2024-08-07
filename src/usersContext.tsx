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
  changeScore: (usersChecked: User[], score: number) => void;
  changeIsChecked: (newUsers: User[]) => void;
}

export const UsersContext = createContext({} as Context);

export function UserProviderClient({children}: {children: React.ReactNode}) {
  const initialUsers: User[] = [
    {
      id: "us001",
      name: "Guille",
      score: 0,
      isChecked: false,
    },
    {
      id: "us002",
      name: "Ezequiel",
      score: 0,
      isChecked: false,
    },
    {
      id: "us003",
      name: "Marco",
      score: 0,
      isChecked: false,
    },
    {
      id: "us004",
      name: "Guada",
      score: 0,
      isChecked: false,
    },
    {
      id: "us005",
      name: "Lucas",
      score: 0,
      isChecked: false,
    },
    {
      id: "us006",
      name: "Thomas",
      score: 0,
      isChecked: false,
    },
    {
      id: "us007",
      name: "Astrid",
      score: 0,
      isChecked: false,
    },
    {
      id: "us008",
      name: "Lato",
      score: 0,
      isChecked: false,
    },
    {
      id: "us009",
      name: "Fede",
      score: 0,
      isChecked: false,
    },
    {
      id: "us010",
      name: "Nico",
      score: 0,
      isChecked: false,
    },
    {
      id: "us011",
      name: "Joel",
      score: 0,
      isChecked: false,
    },
    {
      id: "us012",
      name: "Fran",
      score: 0,
      isChecked: false,
    },
    {
      id: "us013",
      name: "Facu",
      score: 0,
      isChecked: false,
    },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);

  const changeScore = (usersChecked: User[], score: number) => {
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

      return newUsers;
    });
  };

  const changeIsChecked = (newUsers: User[]) => {
    setUsers(() => newUsers);
  };

  return (
    <UsersContext.Provider
      value={{
        users: users,
        changeScore: changeScore,
        changeIsChecked: changeIsChecked,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
