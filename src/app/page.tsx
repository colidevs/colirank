"use client";
import {useContext} from "react";

import {ScrollArea} from "@/components/ui/scroll-area";
import {UsersContext, UserProviderClient} from "@/usersContext";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {useToast} from "@/components/ui/use-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function HomePage() {
  return (
    <UserProviderClient>
      <HomePageClient />
    </UserProviderClient>
  );
}

interface ScoreBtn {
  name: string;
  points: number;
  style: string;
}

const buttons: ScoreBtn[] = [
  {
    name: "🤠",
    points: 50,
    style:
      "bg-zinc-50 drop-shadow-md  text-zinc-950 rounded-2xl hover:bg-emerald-500 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-3xl",
  },
  {
    name: "🕵️",
    points: 0,
    style:
      "bg-zinc-50 drop-shadow-md  text-zinc-950 rounded-2xl hover:bg-emerald-500 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-3xl",
  },
  {
    name: "🌚",
    points: -50,
    style:
      "bg-zinc-50 drop-shadow-md  text-zinc-950 rounded-2xl hover:bg-rose-500 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-3xl",
  },
  {
    name: "👍",
    points: 10,
    style:
      "bg-zinc-50 drop-shadow-md  text-zinc-950 rounded-2xl hover:bg-green-500 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-3xl",
  },
  {
    name: "👻",
    points: 0,
    style:
      "bg-zinc-50 drop-shadow-md  text-zinc-950 rounded-2xl hover:bg-rose-500 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-3xl",
  },
  {
    name: "🦄",
    points: -10,
    style:
      "bg-zinc-50 drop-shadow-md  text-zinc-950 rounded-2xl hover:bg-rose-500 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-3xl",
  },
];

function HomePageClient() {
  const {users, changeScore, changeIsChecked} = useContext(UsersContext);
  const {toast} = useToast();

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

    if (usersChecked.length === 0) {
      toast({title: "No se seleccionó ningún usuario 👊"});

      return;
    }
    if (button.name === "HAY ALGO") {
      button.points = getRandomNumber();
    } else if (button.name === "POR BUENA GENTE") {
      button.points = -getRandomNumber();
    }
    changeScore(usersChecked, button.points);

    if (button.points > 0) {
      toast({title: "Se sumaron " + button.points + " 🎉"});
    } else {
      toast({variant: "destructive", title: "Se restaron " + button.points + " ☠"});
    }
  }

  function setPositionStyle(id: string, align: string) {
    const index = users.findIndex((x) => x.id === id);

    switch (index) {
      case 0:
        return "text-" + align + " font-medium text-xl text-yellow-500";
        break;
      case 1:
        return "text-" + align + " font-medium text-lg  text-slate-400";
        break;
      case 2:
        return "text-" + align + " font-medium  text-orange-600";
        break;
      default:
        return "text-" + align + " font-medium text-zinc-950";
        break;
    }
  }

  function setMedal(id: string, name: string) {
    const index = users.findIndex((x) => x.id === id);

    switch (index) {
      case 0:
        return name + " 🥇";
        break;
      case 1:
        return name + " 🥈";
        break;
      case 2:
        return name + " 🥉";
        break;
      default:
        return name;
        break;
    }
  }

  return (
    <section className="m-auto flex max-w-4xl flex-col gap-6 lg:flex-row">
      <ScrollArea className="m-auto flex-1 rounded-lg border border-zinc-300/20 p-4 bg-zinc-50 drop-shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-rose-900 hover:bg-transparent">
              <TableHead className="text-left text-rose-700 text-xl">Select</TableHead>
              <TableHead className="text-rose-700 text-xl">Name</TableHead>
              <TableHead className="text-right text-rose-700 text-xl">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .sort((a, b) => b.score - a.score)
              .map(({id, name, score}) => (
                <TableRow key={id} className="hover:bg-rose-100/50 border-b border-rose-900">
                  <TableCell>
                    <Checkbox
                      className="border-rose-900 dark:border-white hover:scale-110"
                      onCheckedChange={() => handleCheckbox(id)}
                    />
                  </TableCell>
                  <TableCell className={setPositionStyle(id, "left w-36")}>
                    {setMedal(id, name)}
                  </TableCell>
                  <TableCell className={setPositionStyle(id, "right")}>{score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="flex flex-col justify-around">
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
