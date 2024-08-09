"use client";
import {useContext} from "react";
import {Users} from "lucide-react";

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
    name: "TIPAZO",
    points: 50,
    style:
      "bg-green-900 shadow-md shadow-lime-300/50 p-8 transition-transform ease-in-out hover:scale-110 hover:bg-green-950 font-mono text-xl text-white",
  },
  {
    name: "HAY ALGO",
    points: null,
    style:
      "bg-emerald-800 hover:bg-emerald-900 shadow-md shadow-lime-300/50 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-xl text-white",
  },
  {
    name: "POR FALOPA",
    points: -50,
    style:
      "bg-red-700 hover:bg-rose-950 shadow-md shadow-red-400/50 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-xl text-white",
  },
  {
    name: "BUEN INTENTO",
    points: 10,
    style:
      "bg-green-800 hover:bg-green-900 shadow-md shadow-lime-300/50 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-lg text-white",
  },
  {
    name: "POR BUENA GENTE",
    points: null,
    style:
      "bg-rose-900 hover:bg-rose-950 shadow-md shadow-red-400/50  p-8 transition-transform ease-in-out hover:scale-110 font-mono text-sm text-white",
  },
  {
    name: "POR HIPPIE",
    points: -10,
    style:
      "bg-red-800 hover:bg-red-900 shadow-md shadow-red-400/50 p-8 transition-transform ease-in-out hover:scale-110 font-mono text-xl text-white",
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
        return "text-" + align + " font-medium text-white";
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
    <section className="flex flex-row">
      <div className="w-6/12">
        <ScrollArea className="dm h-[550px] w-[600px] rounded-lg border p-4 shadow-2xl ">
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
                        className="border-white hover:scale-110"
                        onCheckedChange={() => handleCheckbox(id)}
                      />
                    </TableCell>
                    <TableCell className={setPositionStyle(id, "center")}>
                      {setMedal(id, name)}
                    </TableCell>
                    <TableCell className={setPositionStyle(id, "right")}>{score}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
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
