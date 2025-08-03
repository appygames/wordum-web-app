import UserGameCreatePage from "@/components/UserGameCreate";
import { Suspense } from "react";

export default function GridPage(){
    return (
    <Suspense>
        <UserGameCreatePage />
    </Suspense>
    )
}