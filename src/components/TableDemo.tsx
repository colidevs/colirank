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

const usuarios = [
  {
    Nombre: "Guille",
    ID: "us0001",
    Puntos: "100",
  },
  {
    Nombre: "Ezequiel",
    ID: "us0002",
    Puntos: "50",
  },
  {
    Nombre: "Marcos",
    ID: "us0003",
    Puntos: "90",
  },
  {
    Nombre: "Guadalupe",
    ID: "us0004",
    Puntos: "40",
  },
  {
    Nombre: "Lucas",
    ID: "us0005",
    Puntos: "20",
  },
  {
    Nombre: "Thomas",
    ID: "us0006",
    Puntos: "10",
  },
  {
    Nombre: "Astrid",
    ID: "us007",
    Puntos: "85",
  },
];

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Ranking</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Nombre</TableHead>
          <TableHead className="text-right">Puntos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usuarios.map((usuario) => (
          <TableRow key={usuario.ID}>
            <TableCell className="text-left font-medium">{usuario.Nombre}</TableCell>
            <TableCell className="text-right">{usuario.Puntos}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}