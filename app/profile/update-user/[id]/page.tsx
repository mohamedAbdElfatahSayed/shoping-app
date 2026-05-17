
import UpdateUserClient from "./UpdateUser";

const page = async({params}:{params:Promise<{id:string}>}) => {
  const {id}=await params

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <UpdateUserClient id={id}/>
    </div>
  );
};

export default page;