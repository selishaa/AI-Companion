import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs/server";

interface CompanionIdPageProps {
    params: {
        companionId: string;    
    };
};

const CompanionIdPage = async({
    params
}: CompanionIdPageProps) => {
    const { userId } = auth ();
//To do check subscription

if (!userId) {
    return redirectToSignIn ();
}

const companion = await prismadb.companion.findUnique({
    where: {
        id: params.companionId,
        userId
    },
});

const categories = await prismadb.category.findMany();
    return (
        <CompanionForm
        initialData={companion}
        categories={categories}
        />

    );
}

export default CompanionIdPage;