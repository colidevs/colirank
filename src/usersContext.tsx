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
}

export const UsersContext = createContext({} as Context);

export function UserProviderClient({children}: {children: React.ReactNode}) {
  const initialUsers: User[] = [
    {
      id: "us0001",
      name: "Guille",
      score: 30,
      isChecked: true,
    },
    {
      id: "us0002",
      name: "Ezequiel",
      score: 50,
      isChecked: true,
    },
    {
      id: "us0003",
      name: "Marcos",
      score: 90,
      isChecked: false,
    },
    {
      id: "us0004",
      name: "Guadalupe",
      score: 20,
      isChecked: false,
    },
    {
      id: "us0005",
      name: "Lucas",
      score: 40,
      isChecked: false,
    },
    {
      id: "us0006",
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
      /*  const myUser = users.find((x) => x === user);

    setUsers((users) => {
      const newUsers = users.with(users.indexOf(user), {
        id: myUser!.id,
        name: myUser!.name,
        score: myUser!.score + score,
      });

      return newUsers;
    });*/
    });
  };

  return (
    <UsersContext.Provider value={{users: users, modificarPuntos: modificarPuntos}}>
      {children}
    </UsersContext.Provider>
  );
}
