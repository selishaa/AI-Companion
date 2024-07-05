
import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
    searchParams:{
        categoryId: string;
        name: string;
    }
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        contains: searchParams.name, //search 
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();
    return (
        <div className="h-4 p-4 space-y-2">
         <SearchInput/>
         <Categories data={categories}/>
         <Companions data={data} />
     
        </div>
    );
    }
    export default RootPage;