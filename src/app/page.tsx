import TableDemo from "@/components/TableDemo";
import {Button} from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="flex flex-row space-x-96">
      <div className="w-4/12">
        <TableDemo />
      </div>
      <div className="m-auto w-6/12 space-x-16 text-center">
        <Button className="bg-blue-400 p-10">Boton 1</Button>
        <Button className="bg-zinc-200 p-10">Boton 2</Button>
        <Button className="bg-green-400 p-10">Boton 3</Button>
      </div>
    </section>
  );
}
