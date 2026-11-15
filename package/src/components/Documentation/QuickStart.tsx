export const QuickStart = () => {
    return (
        <div className="pb-10 md:scroll-m-[180px] scroll-m-28" id="start" >
          <h3 className=" text-black text-2xl font-semibold mt-8 dark:text-white" >দ্রুত শুরু</h3>
          <div className="p-6 rounded-md border mt-6 border-border dark:border-dark_border">
             <h6 className="dark:text-white text-lg font-medium">১. প্রয়োজনীয়তা</h6>
             <p className="text-base font-medium text-midnight_text dark:text-white/50">শুরু করার আগে সর্বশেষ স্থিতিশীল সংস্করণের <a href="https://nodejs.org/" className="text-primary" >Node.js</a> </p>
              <h6 className="mt-4 mb-2 dark:text-white text-dark font-medium text-base">প্রস্তাবিত পরিবেশ:</h6>
              <ul className="list-disc ps-6" >
                <li>Node.js ২০ বা পরবর্তী সংস্করণ</li>
                <li>npm ১০ বা পরবর্তী সংস্করণ</li>
              </ul>
          </div>
          <div className="p-6 rounded-md border mt-6 border-border dark:border-dark_border">
             <h6 className="dark:text-white text-lg font-medium">২. ইনস্টল করুন</h6>
             <p className="text-base font-medium text-midnight_text dark:text-white/50">package ফোল্ডারে গিয়ে প্রয়োজনীয় প্যাকেজ ইনস্টল করুন। npm ব্যবহার করা যেতে পারে। </p>
              <h6 className="mt-4 mb-2 dark:text-white text-dark font-medium text-base">১) npm দিয়ে ইনস্টল করুন:</h6>
              <div className="py-4 px-3 rounded-md bg-black">
                <p className="text-sm text-gray-400"><span className="text-yellow-500">cd</span> প্রকল্পের-ফোল্ডার</p>
                <p className="text-sm text-gray-400 mt-2">npm install</p>
              </div>
              <h6 className="mt-4 mb-2 dark:text-white text-dark font-medium text-base">২) yarn দিয়ে ইনস্টল করুন:</h6>
              <div className="py-4 px-3 rounded-md bg-black">
                <p className="text-sm text-gray-400"><span className="text-yellow-500">cd</span> প্রকল্পের-ফোল্ডার</p>
                <p className="text-sm text-gray-400 mt-2">yarn install</p>
              </div>
          </div>
          <div className="p-6 rounded-md border mt-6 border-border dark:border-dark_border">
             <h6 className="dark:text-white text-lg font-medium">৩. চালু করুন</h6>
             <p className="text-base font-medium text-midnight_text dark:text-white/50 mb-4">প্যাকেজ ইনস্টল শেষ হলে অ্যাপটি চালু করুন।</p>

              <div className="py-4 px-3 rounded-md bg-black">
                <p className="text-sm text-gray-400">npm run dev</p>
              </div>
              <p className="text-base font-medium text-midnight_text dark:text-white/50 my-4">এই কমান্ড স্থানীয় ওয়েবসার্ভার চালু করবে <span className="dark:text-white" >http://localhost:3000:</span></p>
              <div className="py-4 px-3 rounded-md bg-black">
                <p className="text-sm text-gray-400">{"> al-ahsan-foundation-bangladesh@1.0.1 dev"}</p>
                <p className="text-sm text-gray-400 mt-1">{"> next dev"}</p>
                <p className="text-sm text-gray-400 mt-6">{"-Next.js 15.1.1"}</p>
                <p className="text-sm text-gray-400 mt-1">{"-Local: http://localhost:3000"}</p>
              </div>
          </div>
          <div className="p-6 rounded-md border mt-6 border-border dark:border-dark_border">
             <h6 className="dark:text-white text-lg font-medium">৪. বিল্ড ও প্রকাশ</h6>
             <p className="text-base font-medium text-midnight_text dark:text-white/50 mb-4">অ্যাপ তৈরি করতে নিচের কমান্ড চালান।</p>

              <div className="py-4 px-3 rounded-md bg-black">
                <p className="text-sm text-gray-400">npm run build or yarn build</p>
              </div>
              <p className="text-base font-medium text-midnight_text dark:text-white/50 mt-6">এখন ওয়েবসাইটটি প্রকাশের জন্য প্রস্তুত।</p>
          </div>
        </div>
    )
}