"use client";
import {useContext} from "react";

import {UsersContext, UserProviderClient} from "@/usersContext";
import {Button} from "@/components/ui/button";
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

function HomePageClient() {
  const {users, sumarPuntos} = useContext(UsersContext);

  return (
    <section className="flex flex-row space-x-96">
      <div className="w-4/12">
        {/* <TableDemo usuarios={usuarios} /> */}
        <Table>
          <TableCaption>Ranking</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">name</TableHead>
              <TableHead className="text-right">points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .sort((a, b) => b.score - a.score)
              .map(({id, name, score}) => (
                <TableRow key={id}>
                  <TableCell className="text-left font-medium">{name}</TableCell>
                  <TableCell className="text-right">{score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="m-auto w-6/12 space-x-16 text-center">
        <Button className="bg-blue-400 p-10" onClick={() => sumarPuntos(users.at(0)!, 50)}>
          Sumar
        </Button>
        <Button className="bg-zinc-200 p-10">Random</Button>
        <Button className="bg-green-400 p-10">Restar</Button>
      </div>
    </section>
  );
}

// function TableDemo({usuarios}: {usuarios: User[]}) {
//   return (
//     <Table>
//       <TableCaption>Ranking</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="text-left">name</TableHead>
//           <TableHead className="text-right">points</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {usuarios
//           .sort((a, b) => b.points - a.points)
//           .map(({id, name, points}) => (
//             <TableRow key={id}>
//               <TableCell className="text-left font-medium">{name}</TableCell>
//               <TableCell className="text-right">{points}</TableCell>
//             </TableRow>
//           ))}
//       </TableBody>
//     </Table>
//   );
// }
