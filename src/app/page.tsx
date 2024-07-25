import TableDemo from "@/components/TableDemo";
import {Button} from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="space-x-16 text-center">
      <TableDemo />
      <Button>Boton 1</Button>
      <Button>Boton 2</Button>
      <Button>Boton 3</Button>
    </section>
  );
}
