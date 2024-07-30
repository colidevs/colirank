import TableDemo from "@/components/TableDemo";
import {Button} from "@/components/ui/button";

export default function HomePage() {
  return (
    <section>
      <div className="w-4/12">
        <TableDemo />
      </div>
      <div className="mx-8 space-x-16 text-center">
        <Button>Boton 1</Button>
        <Button>Boton 2</Button>
        <Button>Boton 3</Button>
      </div>
    </section>
  );
}
