"use client";
import {useContext} from "react";

import {UsersContext, UserProviderClient} from "@/usersContext";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
  const {users, modificarPuntos} = useContext(UsersContext);

  function modificar(button: ScoreBtn) {
    if (button.points === null) {
      let random = obtenerNumeroRandom();

      if (button.name === "-Random") {
        random = -random;
      }
      modificarPuntos(users[0], random);
    } else {
      modificarPuntos(users[0], button.points);
    }
  }

  return (
    <section className="flex flex-row space-x-96">
      <div className="w-5/12">
        <Table>
          <TableCaption>Ranking</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">Select</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .sort((a, b) => b.score - a.score)
              .map(({id, name, score}) => (
                <TableRow key={id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="text-left font-medium">{name}</TableCell>
                  <TableCell className="text-right">{score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="m-auto grid w-6/12 grid-cols-3 gap-5 text-center">
        {buttons.map((btn) => (
          <Button key={btn.name} className={btn.style} onClick={() => modificar(btn)}>
            {btn.name}
          </Button>
        ))}
      </div>
    </section>
  );
}

function obtenerNumeroRandom() {
  let numeroRandom = Math.random();

  numeroRandom = numeroRandom * 10;

  numeroRandom = Math.floor(numeroRandom);

  numeroRandom = numeroRandom + 1;

  return numeroRandom;
}
