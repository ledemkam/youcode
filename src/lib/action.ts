import { createSafeActionClient, DEFAULT_SERVER_ERROR } from "next-safe-action";
import { getAuthSession } from "./auth";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

// This function will be called when our actions throw an error.
const handleServerError = (error: unknown) => {
  if (error instanceof ActionError) {
    return {
      serverError: error.message,
    };
  }

  return DEFAULT_SERVER_ERROR;
};

export const authenticatedAction = createSafeActionClient({
  middleware: async () => {
    const session = await getAuthSession();

    const user = session?.user;
    const userId = user?.id;

    if (!userId) {
      throw new Error("You must be logged in to perform this action");
    }

    return {
      userId,
      user,
    };
    handleReturnedServerError: handleServerError;
  },
});
