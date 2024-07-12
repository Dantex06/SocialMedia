import cls from "../../../app/providers/router/ui/AppRouter.module.scss";
import { ReactNode} from "react";

interface Props {
    children: ReactNode;
}

const WrapperRouter = ({children}: Props) => {
    return (
        <div>
            <div>
                <p className={cls.title}>Page</p>
                <div className={cls.page}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default WrapperRouter;