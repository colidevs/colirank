"use client";

import {createContext, useState} from "react";
import {type User as UserDTO} from "@prisma/client";

import {AddScore} from "@/actions";

export interface User extends UserDTO {
  isChecked: boolean;
}

interface Context {
  users: User[];
  changeScore: (usersChecked: User[], score: number) => void;
  changeIsChecked: (newUsers: User[]) => void;
}

export const UsersContext = createContext({} as Context);

export function UserProviderClient({
  children,
  usersFromDb,
}: {
  children: React.ReactNode;
  usersFromDb: UserDTO[];
}) {
  const [users, setUsers] = useState<User[]>(usersFromDb as User[]);

  const changeScore = (usersChecked: User[], score: number) => {
    setUsers((users) => {
      usersChecked.map((x) => {
        users = users.with(users.indexOf(x), {
          ...x,
          score: x!.score + score,
          isChecked: x!.isChecked,
        });

        AddScore(x.id, x.score + score);
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
