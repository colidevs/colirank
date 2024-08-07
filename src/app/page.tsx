"use client";
<<<<<<< Updated upstream
import {useContext, useState} from "react";
=======

import {useContext} from "react";
>>>>>>> Stashed changes

import {ScrollArea} from "@/components/ui/scroll-area";
import {UsersContext, UserProviderClient} from "@/usersContext";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HomePage() {
  return (
    <UserProviderClient>
      <HomePageClient />
    </UserProviderClient>
  );
}

interface ScoreBtn {
  name: string;
  points: number | null;
  style: string;
}

const buttons: ScoreBtn[] = [
  {
    name: "+50",
    points: 50,
    style: "bg-blue-400 p-8 transition-transform ease-in-out hover:scale-110",
  },
  {
    name: "+Random",
    points: null,
    style: "bg-purple-400 p-8 transition-transform ease-in-out hover:scale-110",
  },
  {
    name: "-50",
    points: -50,
    style: "bg-green-400 p-8 transition-transform ease-in-out hover:scale-110",
  },
  {
    name: "+10",
    points: 10,
    style: "bg-orange-400 p-8 transition-transform ease-in-out hover:scale-110",
  },
  {
    name: "-Random",
    points: null,
    style: "bg-teal-600 p-8 transition-transform ease-in-out hover:scale-110",
  },
  {
    name: "-10",
    points: -10,
    style: "bg-pink-500 p-8 transition-transform ease-in-out hover:scale-110",
  },
];

function HomePageClient() {
  const {users, changeScore, changeIsChecked} = useContext(UsersContext);

  const handleCheckbox = (id: string) => {
    const updatedUsers = [...users];
    const index = updatedUsers.findIndex((x) => x.id === id);

    if (index !== -1) {
      updatedUsers[index].isChecked = !updatedUsers[index].isChecked;
      changeIsChecked(updatedUsers);
    }
  };

  function handleChangeScore(button: ScoreBtn) {
    const usersChecked = users.filter((user) => user.isChecked === true);

    if (button.points === null) {
      let random = getRandomNumber();

      if (button.name === "-Random") {
        random = -random;
      }
      changeScore(usersChecked, random);
    } else {
      changeScore(usersChecked, button.points);
    }
  }

  return (
<<<<<<< Updated upstream
    <section className="flex flex-row">
      <div className="w-6/12">
        <ScrollArea className="h-[550px] w-[600px] rounded-lg border p-4 shadow-2xl ">
          <Table>
            <TableCaption>Ranking</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left text-sky-400">Select</TableHead>
                <TableHead className="text-center text-sky-400">Name</TableHead>
                <TableHead className="text-right text-sky-400">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="rounded-xl">
              {users
                .sort((a, b) => b.score - a.score)
                .map(({id, name, score}) => (
                  <TableRow key={id} className="bg-gradient-to-br from-slate-800 to-slate-900">
                    <TableCell>
                      <Checkbox
                        className="hover:scale-110"
                        onCheckedChange={() => handleChexbox(id)}
                      />
                    </TableCell>
                    <TableCell className="text-center font-medium">{name}</TableCell>
                    <TableCell className="text-right">{score}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
=======
    <section className="flex flex-row space-x-96">
      <div className="w-5/12">
        <Table>
          <TableCaption>Ranking</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Select</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .sort((a, b) => b.score - a.score)
              .map(({id, name, score}) => (
                <TableRow key={id}>
                  <TableCell>
                    <Checkbox onCheckedChange={() => handleCheckbox(id)} />
                  </TableCell>
                  <TableCell className="text-left font-medium">{name}</TableCell>
                  <TableCell className="text-right">{score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
>>>>>>> Stashed changes
      </div>
      <div className="m-auto grid w-4/12 grid-cols-3 gap-5 text-center">
        {buttons.map((btn) => (
          <Button key={btn.name} className={btn.style} onClick={() => handleChangeScore(btn)}>
            {btn.name}
          </Button>
        ))}
      </div>
    </section>
  );
}

function getRandomNumber() {
  let randomNumber = Math.random();

  randomNumber = randomNumber * 10;

  randomNumber = Math.floor(randomNumber);

  randomNumber = randomNumber + 1;

  return randomNumber;
}
