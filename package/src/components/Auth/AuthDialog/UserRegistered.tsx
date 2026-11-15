
import { Icon } from "@iconify/react/dist/iconify.js"


export const UserRegistered = () => {
    return (
        <>
        <div className="mb-10 text-center mx-auto inline-block bg-green-500 p-3 rounded-md text-white">
          <div className="flex item-center gap-4">
            <Icon icon="ep:success-filled" className="text-xl bg-green-500" />
            <p className="text-sm font-medium">সফল হয়েছে! আপনার নিবন্ধন সম্পন্ন হয়েছে।</p>
          </div>
        </div>
      </>
    )
}