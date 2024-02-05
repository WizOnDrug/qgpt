"use client";
import Image from "next/image";
import Header from "@/components/layout/Header";
import HomePage from "@/components/template/HomePage";
import { useEffect,useState } from "react";
export default function Home() {
  const [isClient,setIsClient] = useState(false)
  useEffect(()=>{
    setIsClient(true);
  },[]);
  return (
    <>
    {isClient &&  <HomePage />}
      
    </>
  );
}
