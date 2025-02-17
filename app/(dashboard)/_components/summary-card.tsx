import { ReactNode } from "react";

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex text-slate-400 bg-opacity-40 h-9 w-9 items-center justify-center rounded-xl bg-slate-200">
      {children}
    </div>
  );
};

export const SummaryCardDescription = ({ children }: { children: ReactNode }) => {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
    return <h3 className="text-lg font-semibold">{children}</h3>;
}

export const SummaryCard = ({ children }: { children: ReactNode }) => {
  return <div className="bg-white space-y-1 p-3 rounded-xl">{children}</div>;
};
