import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Sahayak Studio — Give your idea a voice',description:'Build thoughtful multilingual voice agents. Write, refine, test, deploy and learn from every conversation.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
