import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { differenceInDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { es } from "date-fns/locale";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const moreThanOneYearFormSchema = z.object({
  monthlySalary: z
    .number({
      required_error: "Campo requerido",
    })
    .positive({
      message: "Debe ser mayor a 0.",
    }),
  days: z
    .number({
      required_error: "Campo requerido",
    })
    .positive({
      message: "Debe ser mayor a 0.",
    }),
});

const MoreThanOneYearForm = () => {
  const [result, setResult] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const form = useForm<z.infer<typeof moreThanOneYearFormSchema>>({
    resolver: zodResolver(moreThanOneYearFormSchema),
    defaultValues: {
      monthlySalary: 0,
      days: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof moreThanOneYearFormSchema>) => {
    const { monthlySalary, days } = values;
    const result = Number(((monthlySalary / 30) * days).toFixed(2));
    setResult(result);
    setShowConfetti(true);
    form.reset();
  };

  return (
    <section className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="monthlySalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salario mensual bruto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Salario mensual bruto"
                    {...field}
                    onChange={(event) =>
                      event.target.value &&
                      field.onChange(parseFloat(event.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Este es el salario mensual bruto que recibes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dias de aguinaldo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Dias de aguinaldo"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Estos son los días que tu empresa pagará de aguinaldo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Calcular
          </Button>
        </form>
      </Form>
      {result && (
        <div className="w-full flex flex-col gap-4 items-center justify-center text-center relative">
          <p className="font-semibold text-xl">Debes recibir</p>
          {showConfetti && (
            <ConfettiExplosion
              onComplete={() => setShowConfetti(false)}
              className="absolute mx-auto"
            />
          )}
          <p className="font-bold text-6xl text-emerald-500">
            {formatCurrency(result)}
          </p>
          <p className="font-semibold text-xl">de aguinaldo</p>
        </div>
      )}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Recuerda que el monto de aguinaldo para trabajadores con más de un año
          trabajando en la empresa, será equivalente a 15 días como minimo de
          trabajo y debe ser otorgado antes del <span className="font-bold">20 de diciembre.</span>
        </AlertDescription>
      </Alert>
    </section>
  );
};

const lessThanOneYearFormSchema = z.object({
  monthlySalary: z
    .number({
      required_error: "Campo requerido",
    })
    .positive({
      message: "Debe ser mayor a 0.",
    }),
  startDate: z.date({
    required_error: "Campo requerido",
  }),
  endDate: z.date({
    required_error: "Debes seleccionar la fecha de paga del aguinaldo.",
  }),
});

const LessThanOneYearForm = () => {
  const [result, setResult] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const form = useForm<z.infer<typeof lessThanOneYearFormSchema>>({
    resolver: zodResolver(lessThanOneYearFormSchema),
    defaultValues: {
      monthlySalary: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof lessThanOneYearFormSchema>) => {
    const { monthlySalary, startDate, endDate } = values;
    const days = differenceInDays(endDate, startDate);
    const result = Number(
      ((((monthlySalary / 30) * 15) / 365) * days).toFixed(2)
    );
    setResult(result);
    setShowConfetti(true);
    form.reset();
  };

  return (
    <section className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="monthlySalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salario mensual bruto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Salario mensual bruto"
                    {...field}
                    onChange={(event) =>
                      event.target.value &&
                      field.onChange(parseFloat(event.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Este es el salario mensual bruto que recibes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Inicie a trabajar el</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: es,
                          })
                        ) : (
                          <span>Elije un día</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  La fecha en la que iniciaste a trabajar en tu empresa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Recibo mi aguinaldo el</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: es,
                          })
                        ) : (
                          <span>Elije un día</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  La fecha en la que recibes tu aguinaldo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Calcular
          </Button>
        </form>
      </Form>
      {result && (
        <div className="w-full flex flex-col gap-4 items-center justify-center text-center relative">
          <p className="font-semibold text-xl">Debes recibir</p>
          {showConfetti && (
            <ConfettiExplosion
              onComplete={() => setShowConfetti(false)}
              className="absolute mx-auto"
            />
          )}
          <p className="font-bold text-6xl text-emerald-500">
            {formatCurrency(result)}
          </p>
          <p className="font-semibold text-xl">de aguinaldo</p>
        </div>
      )}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Recuerda que el monto de aguinaldo para trabajadores con menos de un
          año trabajando en la empresa, será equivalente a los días trabajados,
          y debe ser otorgado antes del{" "}
          <span className="font-bold">20 de diciembre.</span>
        </AlertDescription>
      </Alert>
    </section>
  );
};

type Props = {
  formType: "MORE_THAN_ONE_YEAR" | "LESS_THAN_ONE_YEAR";
};

export default function CalculatorForm({ formType }: Props) {
  return (
    <>
      {formType === "MORE_THAN_ONE_YEAR" && <MoreThanOneYearForm />}
      {formType === "LESS_THAN_ONE_YEAR" && <LessThanOneYearForm />}
    </>
  );
}
