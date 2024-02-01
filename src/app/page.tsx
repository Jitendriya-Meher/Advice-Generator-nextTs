'use client';

import moblieDivider from "@/assets/images/pattern-divider-mobile.svg";
import desktopDivider from "@/assets/images/pattern-divider-desktop.svg";
import Image from "next/image";
import diceImage from "@/assets/images/icon-dice.svg";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

type slipData = {
  slip:{
    id:number,
    advice:string
  }
};

export default function Home() {

  const api = `https://api.adviceslip.com/advice/${genRandomNumber()}`;

  const [isFetched, setIsFatched] = useState(true);
  

  // const { isLoading, data, refetch } = useQuery<slipData>('adviceData', async () =>{
  //   const res = await fetch(api);
  //   const data = await res.json();
  //   return data;
  // },{
  //   enabled:isFetched
  // }
  // );

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ adviceNumber, setAdviceNumber] = useState<number>(0);
  const [ advice, setAdvice] = useState<string>('');

  async function getAdvice(){
    setLoading(true);

    const response = await fetch(api);
    const d = await response.json();

    // console.log(" async getAdvice ",d.slip);
    setAdviceNumber(d?.slip?.id);
    setAdvice(d?.slip?.advice);

    setLoading(false);
  }

  useEffect(() => {
    setIsFatched(false);
    getAdvice();
  },[]);

  function handleRefetch(){
    // refetch();
    getAdvice();
  }

  return (
   <div className=" font-manrope p-8 min-h-screen bg-dark-blue flex sm:items-center pt-40 sm:pt-8 justify-center w-full text-white">
    
    <div className=" h-fit relative p-8 pb-4 flex items-center flex-col bg-dark-grayish-blue rounded-xl w-[350px] sm:w-[470px]">

      <p className=" text-neon-green mb-6 font-semibold tracking-[3px] text-sm">
        {/* ADVICE {data?.slip.id} */}
        {
          loading ? "ADVICE" : `ADVICE ${adviceNumber}`
        }
      </p>

      <div className=" text-[28px] font-semibold text-center mb-5 text-light-cyan min-[100px]">

        {
          // isLoading ? "Loading..." : `"${data?.slip.advice}"`
          loading ? "Loading..." : `" ${advice} "`
        }
        
      </div>

      <div className=" mb-16">
        <Image className=" sm:hidden" src={moblieDivider} alt="Manrope"></Image>
        <Image className="hidden sm:flex" src={desktopDivider} alt="Manrope"></Image>
      </div>

      <button className=" absolute -bottom-[30px] bg-neon-green h-16 w-16 flex justify-center items-center rounded-full cursor-pointer hover:shadow-custom-shadow"
      onClick={handleRefetch}>
        <Image src={diceImage} alt="dice"></Image>
      </button>

    </div>
    
   </div>
  );
}

function genRandomNumber():number{
  return Math.floor(Math.random()*224);
}