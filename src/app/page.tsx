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
  content: string;
  points: number;
  style: string;
}

const commonStyle: string =
  "bg-zinc-50 drop-shadow-md text-zinc-950 rounded-2xl p-8 transition-transform ease-in-out hover:scale-110 font-mono text-3xl";

const greenBtn: string = `${commonStyle} hover:bg-emerald-500 hover:rotate-2`;
const redBtn: string = `${commonStyle} hover:bg-rose-500 hover:-rotate-2`;

const buttons: ScoreBtn[] = [
  {
    content: "🤠",
    points: 50,
    style: greenBtn,
  },
  {
    content: "🕵️",
    points: 0,
    style: greenBtn,
  },
  {
    content: "👍",
    points: 10,
    style: greenBtn,
  },
  {
    content: "🌚",
    points: -50,
    style: redBtn,
  },
  {
    content: "👻",
    points: 0,
    style: redBtn,
  },
  {
    content: "🦄",
    points: -10,
    style: redBtn,
  },
];

function HomePageClient() {
  const toastDuration: number = 550;
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
      toast({title: "No se seleccionó ningún usuario 👊", duration: toastDuration});

      return;
    }
    if (button.content === "HAY ALGO") {
      button.points = getRandomNumber();
    } else if (button.content === "POR BUENA GENTE") {
      button.points = -getRandomNumber();
    }
    changeScore(usersChecked, button.points);

    if (button.points > 0) {
      toast({title: "Se sumaron " + button.points + " 🎉", duration: toastDuration});
    } else {
      toast({
        variant: "destructive",
        title: "Se restaron " + button.points + " ☠",
        duration: toastDuration,
      });
    }
  }

  function setPositionStyle(id: string, align: string) {
    const index = users.findIndex((x) => x.id === id);

    switch (index) {
      case 0:
        return "text-" + align + " font-medium text-xl text-yellow-550";
        break;
      case 1:
        return "text-" + align + " font-medium text-lg  text-slate-400";
        break;
      case 2:
        return "text-" + align + " font-medium  text-orange-550";
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
      <ScrollArea className="m-auto flex-1 rounded-lg border border-zinc-300/20 bg-zinc-50 p-4 drop-shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-rose-900 hover:bg-transparent">
              <TableHead className="text-left text-xl text-rose-700">Select</TableHead>
              <TableHead className="text-xl text-rose-700">Name</TableHead>
              <TableHead className="text-right text-xl text-rose-700">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .sort((a, b) => b.score - a.score)
              .map(({id, name, score}) => (
                <TableRow key={id} className="border-b border-rose-900 hover:bg-rose-100/50">
                  <TableCell>
                    <Checkbox
                      className="border-rose-900 hover:scale-110 dark:border-white"
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
          <Button key={btn.content} className={btn.style} onClick={() => handleChangeScore(btn)}>
            {btn.content}
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
