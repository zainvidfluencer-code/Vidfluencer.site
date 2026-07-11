import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJoinWaitlist } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const waitlistSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [conflictError, setConflictError] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const joinWaitlist = useJoinWaitlist();

  const onSubmit = async (data: WaitlistFormValues) => {
    setConflictError(false);
    
    joinWaitlist.mutate(
      { data },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          if (error?.status === 409) {
            setConflictError(true);
          } else {
            const errorMsg = error?.data?.error || "Something went wrong. Please try again.";
            form.setError("root", { type: "manual", message: errorMsg });
          }
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto relative min-h-[140px]">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center space-y-4 p-6 bg-primary text-primary-foreground rounded-2xl shadow-xl border border-primary/20 text-center"
          >
            <div className="bg-white/20 p-3 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-1">You're on the list!</h3>
              <p className="text-primary-foreground/80 text-sm">
                Keep an eye on your inbox. We'll be in touch soon.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {conflictError && (
                  <Alert className="bg-primary/5 text-primary border-primary/20">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                      Good news — you're already on the waitlist!
                    </AlertDescription>
                  </Alert>
                )}
                
                {form.formState.errors.root && (
                  <Alert variant="destructive">
                    <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Full Name" 
                            className="h-12 px-4 bg-white/80 backdrop-blur-sm border-gray-200 focus-visible:ring-primary shadow-sm text-base placeholder:text-gray-400"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Email Address" 
                            type="email"
                            className="h-12 px-4 bg-white/80 backdrop-blur-sm border-gray-200 focus-visible:ring-primary shadow-sm text-base placeholder:text-gray-400"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 group"
                  disabled={joinWaitlist.isPending}
                >
                  {joinWaitlist.isPending ? (
                    <Spinner className="w-5 h-5 mr-2 text-white" />
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground font-medium mt-4">
                  By joining, you agree to early access communications. No spam, ever.
                </p>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
