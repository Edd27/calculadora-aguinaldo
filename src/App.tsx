import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CalculatorForm from "@/components/calculator-form";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Header />
      <main className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-32">
        <div className="mx-auto w-full lg:max-w-xl border overflow-hidden shadow rounded-lg flex flex-col">
          <h2 className="font-bold text-3xl p-4">
            ¿Tengo mas de un año trabajando en la empresa?
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="moreThanOneYear">
              <AccordionTrigger className="hover:no-underline hover:bg-accent duration-300 p-4">
                <p className="font-bold">Si</p>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <CalculatorForm formType="MORE_THAN_ONE_YEAR" />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="lessThanOneYear" className="border-b-0">
              <AccordionTrigger className="hover:no-underline hover:bg-accent duration-300 p-4">
                <p className="font-bold">No</p>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <CalculatorForm formType="LESS_THAN_ONE_YEAR" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
