import Header from "./Header";
import Sidebar from "../module/Sidebar";

import { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-[1440px]  p-5 gap-5">
      <Sidebar />
      <div className="w-[692px] rounded-md border border-slate-200 flex-col justify-start gap-[12px] inline-flex">
        <Header />
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
