import { About } from '@/components/About';
import { Articles } from '@/components/Articles';
import { Contacts } from '@/components/Contacts';
import { Featured } from '@/components/Featured';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
// import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default function Home() {

  return (
    <main className="bg-primary text-white">

      <Navbar/>
      <Hero/>
      <About/>
      <Featured/>
      <Projects/>
      <Articles/>
      <Contacts/>
      <Footer/>
    </main>
  );
}

