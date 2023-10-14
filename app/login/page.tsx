import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LoginMessage from "./message";

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2">
      <form action="/auth/login" method="POST">
        <Card>
          <CardHeader>
            <CardTitle>Login With Magic Link</CardTitle>
            <CardDescription>
              Please enter your valid email address to log in using a magic
              link.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <input
              name="email"
              type="email"
              className="px-4 py-2 bg-inherit border rounded-md"
              placeholder="yourmail@email.com"
              required
            />
            <Button type="submit">Continue</Button>
            <LoginMessage />
          </CardContent>
          <CardFooter>
            <p className="text-sm">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
