import { createContext, ReactNode, FC } from "react";

type OpenInfo = {
    open: boolean;
};

type Props = {
    OpenInfo: OpenInfo;
    children: ReactNode;
};

export const OpenContext = createContext<OpenInfo>({ open: false });

const OpenProvider: FC<Props> = ({ OpenInfo, children }) => {
    return <OpenContext.Provider value={OpenInfo}>{children}</OpenContext.Provider>;
};

export default OpenProvider;