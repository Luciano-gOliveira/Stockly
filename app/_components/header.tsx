import { ReactNode } from "react"
import { cn } from "../_lib/utils"

// interface HeaderProps {
//     subtitle: string
//     title: string
//     rigthContent?: React.ReactNode
// }

export const HeaderTitle = ({children}: {children: ReactNode}) => {
    return  <h2 className="text-xl font-bold">{children}</h2>
}

export const HeaderSubtitle = ({children}: {children: ReactNode}) => {
    return  <span className="text-gray-500">{children}</span>

}

export const HeaderLeft = ({children}: {children: ReactNode}) => {
    return  <div className="space-y-1">{children}</div>

}

export const HeaderRight = ({children}: {children: ReactNode}) => {
    return  <div>{children}</div>

}


const Header = ({ children, className }: {children: ReactNode, className?: string}/* HeaderProps*/) => {
  return (
    <div className={cn("flex items-center justify-between py-4 pt-6", className)}>
      {children}
    </div>
  );
};

export default Header;
