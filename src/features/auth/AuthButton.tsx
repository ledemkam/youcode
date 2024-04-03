import { getAuthSession } from "@/lib/auth"
import LoginnButton from "./LoginnButton";
import { LoggedInButton } from "./LoggedInButton";

export type AuthButtonProps = {

}

export const AuthButton = async (props: AuthButtonProps) => {
    const session = await getAuthSession();
  
    const user = session?.user ;

    if(!user){
        return<LoginnButton/>
    }
  return <LoggedInButton user={user}/>
  
}
