import Learn from "./page"


type Props = {
    children: React.ReactNode;
 }


function layout({children}:Props){
  return(
      <div className="min-h-screen flex flex-col">
          
          <main className="flex flex-1 flex-col justify-center items-center"> 
             {children}
          </main>
         
      </div>
  )
}

export default layout